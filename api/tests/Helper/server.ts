import {server} from "../../src";

export const startServer = (): string => {
    server.listen(3000);

    return 'http://localhost:3000';
}
