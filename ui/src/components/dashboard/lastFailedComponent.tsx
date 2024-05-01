import { LinearProgress } from "@mui/material";
import React, {useEffect, useState} from "react";
import {ApiMonitor} from "../../types/ApiMonitor";
import MonitorsTable from "./MonitorsTable";
import {useApi} from "../../context/ApiProvider";

const LastFailedComponent: React.FC = () => {
    const api = useApi()
    const [lastFailed, setLastFailed] = useState<ApiMonitor[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const firstRender = React.useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            api?.get(`/monitors/failed`)
                .then(response => {
                    if (!response.ok) {
                        throw Error('Failed to fetch')
                    }

                    return response.body
                })
                .then(data => setLastFailed(data))
                .catch((error) => {
                    console.error('Error:', error);
                    setLastFailed([])
                })
                .finally(() => setIsLoading(false));

            firstRender.current = false;
            return;
        }
    }, [api])

    return (
        <>
            <h3>On going issues</h3>
            {isLoading ? <LinearProgress /> : <MonitorsTable monitors={lastFailed} />}
        </>
    )
}

export default LastFailedComponent;