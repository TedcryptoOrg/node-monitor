import Configuration from "../../src/database/models/configuration";
import Server from "../../src/database/models/server";
import Service from "../../src/database/models/service";
import Monitor from "../../src/database/models/monitor";
import {Sequelize} from "sequelize";
import db from "../../src/database/config";

let sequelize;

export function setupDatabaseTest(done: jest.DoneCallback): void {
    createAndResetDatabaseInstance().then((sequelizeObject) => {
        sequelize = sequelizeObject;
        done();
    });
}

export function teardownDatabaseTest(done: jest.DoneCallback): void {
    sequelize.close().then(() => {
        done();
    });
}

export async function createAndResetDatabaseInstance(): Promise<Sequelize> {
    const sequelize = db.sequelize;
    await sequelize.drop({cascade: true, logging: false})
    await Configuration.sync({force: true, logging: false})
    await Server.sync({force: true, logging: false})
    await Service.sync({force: true, logging: false})
    await Monitor.sync({force: true, logging: false})

    return sequelize;
}