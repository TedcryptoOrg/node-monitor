import {createAndResetDatabaseInstance} from "./databaseHelper";

let sequelize;

export function setupIntegrationTest (done: jest.DoneCallback): void {
    createAndResetDatabaseInstance().then((sequelizeObject) => {
        sequelize = sequelizeObject;
        done();
    });
}

export function teardownIntegrationTest (done: jest.DoneCallback): void {
    sequelize.close().then(() => {
        done();
    });
}