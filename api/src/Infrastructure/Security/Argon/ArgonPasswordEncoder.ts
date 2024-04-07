import {PasswordEncoder} from "../../../Domain/Security/PasswordEncoder";
import argon2 from 'argon2';
import {injectable} from "inversify";

@injectable()
export default class ArgonPasswordEncoder implements PasswordEncoder {
    public async hash(password: string): Promise<string> {
        return await argon2.hash(password);
    }

    public async compare(password: string, hash: string): Promise<boolean> {
        return await argon2.verify(hash, password);
    }
}