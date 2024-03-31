import React, {useEffect, useState} from "react";
import {ApiMonitor} from "../../types/ApiMonitor";
import MonitorsTable from "./MonitorsTable";
import {LinearProgress} from "@mui/material";
import {useApi} from "../../context/ApiProvider";

const LastWarningsComponent: React.FC = () => {
    const api = useApi()
    const [lastWarnings, setLastWarnings] = useState<ApiMonitor[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const firstRender = React.useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            api?.get(`/monitors/warnings`)
                .then(response => {
                    if (!response.ok) {
                        throw Error('Failed to fetch')
                    }

                    return response.body
                })
                .then(data => setLastWarnings(data))
                .catch((error) => {
                    console.error('Error:', error);
                    setLastWarnings([])
                })
                .finally(() => setIsLoading(false))
            ;

            firstRender.current = false;
            return;
        }
    }, [])

    return (
        <>
            <h3>Warnings</h3>
            {isLoading ? <LinearProgress /> : <MonitorsTable monitors={lastWarnings}/>}
        </>
    )
}

export default LastWarningsComponent;