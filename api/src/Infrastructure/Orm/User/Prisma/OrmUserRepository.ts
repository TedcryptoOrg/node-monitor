import { inject, injectable } from 'inversify'
import UserRepository from '../../../../Domain/User/UserRepository'
import { PrismaClient } from '@prisma/client'
import User, { UserArray } from '../../../../Domain/User/User'
import RecordNotFound from '../../../../Domain/RecordNotFound'
import { PasswordEncoder } from '../../../../Domain/Security/PasswordEncoder'
import UserAlreadyExists from '../../../../Domain/User/UserAlreadyExists'
import { TYPES } from '../../../../Domain/DependencyInjection/types'

@injectable()
export default class OrmUserRepository implements UserRepository {
  constructor (
    @inject(TYPES.OrmClient) private readonly prismaClient: PrismaClient,
    @inject(TYPES.PasswordEncoder) private readonly passwordEncoder: PasswordEncoder
  ) {
  }

  public async get (id: number): Promise<User> {
    const user = await this.prismaClient.user.findUniqueOrThrow({
      where: {
        id
      },
      include: { company: true }
    })

    if (user === null) {
      throw new RecordNotFound(`User with "${id}" id not found`)
    }

    return User.fromObject(user)
  }

  public async findByUsername (username: string): Promise<User | null> {
    try {
      return await this.getByUsername(username)
    } catch (error: any) {
      if (error instanceof RecordNotFound) {
        return null
      }

      throw error as Error
    }
  }

  public async getByUsername (username: string): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        username
      }
    })

    if (user === null) {
      throw new RecordNotFound(`User with "${username}" username not found`)
    }

    return User.fromObject(user)
  }

  async upsert (user: User): Promise<User> {
    if (user.id === undefined && (user.raw_password === undefined || user.raw_password === '')) {
      throw new Error('Raw password is required')
    }

    const data = {
      username: user.username,
      is_active: user.is_active,
      is_admin: user.is_admin,
      is_super_admin: user.is_super_admin,
      ...(user.raw_password !== undefined ? { password: await this.passwordEncoder.hash(user.raw_password) } : {}),
      ...(user.company !== undefined ? { company: { connect: { id: user.company.id } } } : {})
    }

    if (user.id !== undefined) {
      return User.fromObject(await this.prismaClient.user.update({
        where: {
          id: user.id
        },
        data
      }))
    }

    try {
      return User.fromObject(await this.prismaClient.user.create({
        data: data as any
      }))
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new UserAlreadyExists(user.username)
      }

      throw error as Error
    }
  }

  async delete (id: number): Promise<void> {
    await this.prismaClient.user.delete({
      where: {
        id
      }
    })
  }

  async findAll (): Promise<User[]> {
    const users = await this.prismaClient.user.findMany({
      include: { company: true }
    })

    return users.map((user: UserArray) => User.fromObject(user))
  }
}
