import CommandHandler from "../../../Domain/Command/CommandHandler";
import LoginCommand from "./LoginCommand";
import {inject, injectable} from "inversify";
import UserRepository from "../../../Domain/User/UserRepository";
import PasswordNotMatch from "./PasswordNotMatch";
import User from "../../../Domain/User/User";
import SecurityProvider from "../../../Domain/Security/SecurityProvider";
import Token from "../../../Domain/Security/Token";
import {PasswordEncoder} from "../../../Domain/Security/PasswordEncoder";
import {TYPES} from "../../../Domain/DependencyInjection/types";

@injectable()
export default class LoginCommandHandler implements CommandHandler {
    constructor(
        @inject(TYPES.UserRepository) private readonly userRepository: UserRepository,
        @inject(TYPES.SecurityProvider) private readonly securityProvider: SecurityProvider,
        @inject(TYPES.PasswordEncoder) private readonly passwordEncoder: PasswordEncoder,
    ) {
    }

    public async handle(command: LoginCommand): Promise<{ user: User, accessToken: Token, refreshToken: Token }> {
        const user = await this.userRepository.getByUsername(command.username);
        if (user.password === undefined) {
            throw new PasswordNotMatch('User is not allowed to login with password');
        }
        if (!await this.passwordEncoder.compare(command.password, user.password)) {
            throw new PasswordNotMatch('Password not match');
        }

        return {
            user: user,
            ...this.securityProvider.generateTokens(user)
        };
    }
}