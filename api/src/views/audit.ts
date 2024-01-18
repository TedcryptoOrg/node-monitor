import Configuration from "../database/models/configuration";
import {renderMonitor} from "./monitors";
import {renderServer} from "./servers";
import {Audit, AuditOutput} from "../database/models/audit";
import {renderConfiguration} from "./configuration";
import Monitor from "../database/models/monitor";
import Server from "../database/models/server";

export async function renderAudits(audits: Audit[]|AuditOutput[]): Promise<any> {
    const result = []
    for (const audit of audits) {
        result.push(await renderAudit(audit))
    }

    return result;
}

export async function renderAudit(audit: Audit|AuditOutput): Promise<any> {
    const configuration = await Configuration.findByPk(audit.configuration_id ?? 0);
    const monitor = await Monitor.findByPk(audit.monitor_id ?? 0);
    const server = await Server.findByPk(audit.server_id ?? 0);

    return {
        id: audit.id,
        configuration: configuration ? await renderConfiguration(configuration) : undefined,
        monitor: monitor ? await renderMonitor(monitor) : undefined,
        server: server ? await renderServer(server) : undefined,
        message: audit.message,
        created_at: audit.created_at,
    }
}
