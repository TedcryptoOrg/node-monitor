import {ApiMonitor} from "../../types/ApiMonitor";
import On from "@mui/icons-material/CheckCircle";
import Off from "@mui/icons-material/HighlightOff";
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import React, {useEffect} from "react";
import {Badge} from "@mui/material";

interface MonitorsStatusProp {
    monitors: ApiMonitor[];
}

enum MonitorStatus {
    OK = "ok",
    ERROR = "error",
    WARNING = "warning",
}

const MonitorsStatus: React.FC<MonitorsStatusProp> = ({ monitors }) => {
    const [value, setValue] = React.useState(MonitorStatus.OK);
    const [countError, setCountError] = React.useState(0);
    const [countWarning, setCountWarning] = React.useState(0);

    useEffect(() => {
        let warning: number = 0
        let error: number = 0

        monitors.forEach(monitor => {
            if (monitor.status === false) {
                error += 1;
                return
            }
            if (monitor.status === true && monitor.last_error) {
                warning += 1;
                return
            }
        })

        setCountError(error);
        setCountWarning(warning);

        setValue(error > 0 ? MonitorStatus.ERROR : (warning > 0 ? MonitorStatus.WARNING : MonitorStatus.OK));
    }, [monitors]);

    return value.toString() === MonitorStatus.ERROR.toString()
        ? <Badge badgeContent={countError} color="error">
            <Off fontSize={"small"} htmlColor="red" />
          </Badge>
        : (value.toString() === MonitorStatus.WARNING.toString()
            ? <Badge badgeContent={countWarning} color="warning">
                <HourglassBottomIcon fontSize={"small"} htmlColor="orange" />
              </Badge>
            : <On fontSize={"small"} htmlColor="green" />);
}

export default MonitorsStatus;
