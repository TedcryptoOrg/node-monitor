import { LinearProgress } from "@mui/material";
import React, {useEffect, useState} from "react";
import {ApiMonitor} from "../../types/ApiMonitor";
import MonitorsTable from "./MonitorsTable";

const LastFailedComponent: React.FC = () => {
    const [lastFailed, setLastFailed] = useState<ApiMonitor[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const firstRender = React.useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            fetch(`${process.env.REACT_APP_API_HOST}/api/monitors/failed`)
                .then(response => response.json())
                .then(data => setLastFailed(data))
                .catch((error) => {
                    console.error('Error:', error);
                    setLastFailed([])
                })
                .finally(() => setIsLoading(false));

            firstRender.current = false;
            return;
        }
    }, [])

    return (
        <>
            <h3>On going issues</h3>
            {isLoading ? <LinearProgress /> : <MonitorsTable monitors={lastFailed} />}
        </>
    )
}

export default LastFailedComponent;