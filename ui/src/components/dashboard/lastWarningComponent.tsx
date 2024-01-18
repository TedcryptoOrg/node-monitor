import React, {useEffect, useState} from "react";
import {ApiMonitor} from "../../types/ApiMonitor";
import MonitorsTable from "./MonitorsTable";
import {LinearProgress} from "@mui/material";

const LastWarningsComponent: React.FC = () => {
    const [lastWarnings, setLastWarnings] = useState<ApiMonitor[]>([])
    const [isLoading, setIsLoading] = useState(true);
    const firstRender = React.useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            fetch(`${process.env.REACT_APP_API_HOST}/api/monitors/warnings`)
                .then(response => response.json())
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