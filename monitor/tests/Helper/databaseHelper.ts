import {database} from "../../src/database/database";
import Configuration from "../../src/database/models/configuration";
import Server from "../../src/database/models/server";
import Service from "../../src/database/models/service";
import Monitor from "../../src/database/models/monitor";
import {Sequelize} from "sequelize";

export async function createAndResetDatabaseInstance(): Promise<Sequelize> {
    const sequelize = await database.getDatabase()
    await sequelize.drop({cascade: true})
    await Configuration.sync({force: true})
    await Server.sync({force: true})
    await Service.sync({force: true})
    await Monitor.sync({force: true})

    return sequelize;
}