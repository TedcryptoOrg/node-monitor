import Database from "../../src/database/database";
import Configuration from "../../src/database/models/configuration";
import Server from "../../src/database/models/server";
import Service from "../../src/database/models/service";
import Monitor from "../../src/database/models/monitor";

export async function createAndResetDatabaseInstance(): Promise<Database> {
    const database = new Database('sqlite::memory:');
    const sequelize = await database.getDatabase();
    await Configuration.sync({force: true})
    await Server.sync({force: true})
    await Service.sync({force: true})
    await Monitor.sync({force: true})
    await sequelize.truncate()

    return database;
}