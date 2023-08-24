import Database from "../../src/database/database";

export async function createAndResetDatabaseInstance(): Promise<Database> {
    const database = new Database('sqlite::memory:');
    const sequelize = await database.getDatabase();
    await sequelize.sync({force: true})
    await sequelize.truncate()

    return database;
}