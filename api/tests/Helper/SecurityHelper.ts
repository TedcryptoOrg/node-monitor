import User from "../../src/Domain/User/User";
import {myContainer} from "../../src/Infrastructure/DependencyInjection/inversify.config";
import SecurityProvider from "../../src/Domain/Security/SecurityProvider";
import Token from "../../src/Domain/Security/Token";
import {TYPES} from "../../src/Domain/DependencyInjection/types";

export function createUserToken(user: User): { accessToken: Token, refreshToken: Token} {
    const securityProvider = myContainer.get<SecurityProvider>(TYPES.SecurityProvider);

    return securityProvider.generateTokens(user);
}