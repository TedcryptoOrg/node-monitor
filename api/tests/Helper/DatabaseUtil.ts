import {PrismaClient} from "@prisma/client";

export default class DatabaseUtil {
    public static async truncateAllTables(prismaClient: PrismaClient) {
        await prismaClient.$executeRaw`SET FOREIGN_KEY_CHECKS=0`;

        await prismaClient.$executeRaw`TRUNCATE TABLE audit`;
        await prismaClient.$executeRaw`TRUNCATE TABLE configuration_notification_channels`;
        await prismaClient.$executeRaw`TRUNCATE TABLE configurations`;
        await prismaClient.$executeRaw`TRUNCATE TABLE monitors`;
        await prismaClient.$executeRaw`TRUNCATE TABLE notification_channels`;
        await prismaClient.$executeRaw`TRUNCATE TABLE servers`;
        await prismaClient.$executeRaw`TRUNCATE TABLE services`;
        await prismaClient.$executeRaw`TRUNCATE TABLE user`;
        await prismaClient.$executeRaw`TRUNCATE TABLE company`;

        await prismaClient.$executeRaw`SET FOREIGN_KEY_CHECKS=1`;
    }
}