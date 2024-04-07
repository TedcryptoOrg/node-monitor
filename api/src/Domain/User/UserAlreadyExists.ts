export default class UserAlreadyExists extends Error {
    constructor(username: string) {
        super(`User with username ${username} already exists`);
    }
}
