import { exec } from 'child_process';
import DatabaseUtil from "../../../Helper/DatabaseUtil";
import {myContainer} from "../../../../src/Infrastructure/DependencyInjection/inversify.config";
import {PrismaClient} from "@prisma/client";
import {TYPES} from "../../../../src/Domain/DependencyInjection/types";

jest.setTimeout(30000)

describe('CreateUser', () => {
    let prismaClient: PrismaClient;

    beforeAll(async () => {
        prismaClient = await myContainer.get<PrismaClient>(TYPES.OrmClient);
        await DatabaseUtil.truncateAllTables(prismaClient);
    })

    it('should create a user', (done) => {
        // Arrange
        const username = 'test';
        const isActive = true;
        const isAdmin = false;
        const isSuperAdmin = false;
        const password = 'test';
        const command = `ts-node bin/console create-user ${username} ${isActive} ${isAdmin} ${isSuperAdmin}  ${password}`;

        // Act
        exec(command, async (error, stdout, stderr) => {
            // If the command execution failed, fail the test
            if (error) {
                done(error);
                return;
            }

            // If the command execution succeeded, check if the user was created
            const result = await prismaClient.user.findMany();

            // Assert
            expect(result.length).toBe(1);
            expect(result[0]!.username).toBe(username);
            expect(result[0]!.password).not.toBe(password); // The password should be hashed

            // Check the command output
            expect(stdout).toContain('Done!'); // Replace with the actual output of your command
            expect(stderr).toBe('');

            done();
        });
    });
});