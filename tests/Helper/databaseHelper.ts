import Database from "../../src/database/database";
import Configuration from "../../src/database/models/configuration";
import Server from "../../src/database/models/server";

export async function createAndResetDatabaseInstance(): Promise<Database> {
    const database = new Database('sqlite::memory:');
    const sequelize = await database.getDatabase();
    await Configuration.sync({force: true})
    await Server.sync({force: true})
    await sequelize.truncate()

    return database;
}