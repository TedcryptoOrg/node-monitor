import React from 'react';
import LastFailedComponent from "./dashboard/lastFailedComponent";
import LastWarningsComponent from "./dashboard/lastWarningComponent";

const DashboardComponent: React.FC = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <LastFailedComponent />
            <LastWarningsComponent />
        </div>
    );
}

export default DashboardComponent;