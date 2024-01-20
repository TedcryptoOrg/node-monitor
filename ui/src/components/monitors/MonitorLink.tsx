import {ApiMonitor} from "../../types/ApiMonitor";
import React from "react";
import {Link} from "react-router-dom";

interface MonitorLinkProps {
    monitor: ApiMonitor;
}

const MonitorLink: React.FC<MonitorLinkProps> = ({ monitor }) => {
    return (
        <Link to={`/monitors/${monitor.id}`}>
            {monitor.name}
        </Link>
    )
}

export default MonitorLink;
