import { inject, injectable } from "inversify";
import UserRepository from "../../../../Domain/User/UserRepository";
import { PrismaClient } from "@prisma/client";
import User from "../../../../Domain/User/User";
import RecordNotFound from "../../../../Domain/RecordNotFound";
import {PasswordEncoder} from "../../../../Domain/Security/PasswordEncoder";
import UserAlreadyExists from "../../../../Domain/User/UserAlreadyExists";
import {TYPES} from "../../../../Domain/DependencyInjection/types";

@injectable()
export default class OrmUserRepository implements UserRepository {
    constructor(
        @inject(TYPES.OrmClient) private prismaClient: PrismaClient,
        @inject(TYPES.PasswordEncoder) private passwordEncoder: PasswordEncoder,
    ){
    }

    public async get(id: number): Promise<User> {
        const user: any = await this.prismaClient.user.findUniqueOrThrow({
            where: {
                id: id
            },
            include: {company: true}
        })

        if (!user) {
            throw new RecordNotFound(`User with "${id}" id not found`)
        }

        return User.fromObject(user as any)
    }

    public async findByUsername(username: string): Promise<User|null> {
        try {
            return await this.getByUsername(username)
        } catch (error: any) {
            if (error instanceof RecordNotFound) {
                return null
            }

            throw error
        }
    }

    public async getByUsername(username: string): Promise<User> {
        const user = await this.prismaClient.user.findUnique({
            where: {
                username: username
            }
        })

        if (!user) {
            throw new RecordNotFound(`User with "${username}" username not found`)
        }

        return User.fromObject(user as any)
    }

    async upsert(user: User): Promise<User> {
        if (!user.id && !user.raw_password) {
            throw new Error('Raw password is required')
        }

        const data = {
            username: user.username,
            is_active: user.is_active,
            is_admin: user.is_admin,
            is_super_admin: user.is_super_admin,
            ...(user.raw_password ? {password: await this.passwordEncoder.hash(user.raw_password)} : {}),
            ...(user.company ? {company: {connect: {id: user.company.id}}} : {}),
        }

        if (user.id) {
            // @ts-ignore
            return User.fromObject(await this.prismaClient.user.update({
                where: {
                    id: user.id
                },
                data: data
            }))
        }

        try {
            // @ts-ignore
            return User.fromObject(await this.prismaClient.user.create({
                data: data as any
            }))
        } catch (error: any) {
            if (error.code === 'P2002') {
                throw new UserAlreadyExists(user.username)
            }

            throw error
        }
    }

    async delete(id: number): Promise<void> {
        await this.prismaClient.user.delete({
            where: {
                id: id
            }
        })
    }

    async findAll(): Promise<User[]> {
        const users = await this.prismaClient.user.findMany({
            include: {company: true}
        })

        return users.map((user: any) => User.fromObject(user))
    }
}