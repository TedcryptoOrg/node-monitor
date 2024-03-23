import {handleCommand} from "../handleCommandUtil";
import UpsertServerCommand from "../../../Application/Write/Server/UpsertServer/UpsertServerCommand";
import Server from "../../../Domain/Server/Server";

export const upsert = async (req: any, resp: any) => {
    const requiredFields = ["name", "address", "configuration_id", "is_enabled"];
    const missingFields = requiredFields.filter((field) => req.body[field] === undefined)
    if (missingFields.length > 0) {
        resp.status(400).send(`Missing fields: ${missingFields.join(', ')}`)
        throw new Error(`Missing fields: ${missingFields.join(', ')}`)
    }

    await handleCommand(
        new UpsertServerCommand(
            req.body.name,
            req.body.address,
            req.body.is_enabled,
            req.body.configuration_id,
            req.params.id ? Number(req.params.id) : undefined
        ),
        resp,
        (server: Server) => resp.status(req.params.id ? 200 : 202).send(server.toArray())
    )
}
