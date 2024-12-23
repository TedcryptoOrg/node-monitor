import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import DashboardComponent from '../DashboardComponent';
import LogWatcher from '../logWatcher/LogWatcher';
import ConfigurationsComponent from '../configurations/ConfigurationsComponent';
import ConfigurationOverview from '../configurations/ConfigurationOverview';
import NetworkStatus from '../NetworkStatus/NetworkStatus';
import ServersComponent from '../servers/ServersComponent';
import ServerOverview from '../servers/ServerOverview';
import AuditComponent from '../AuditComponent';
import NotificationChannelsComponent from '../notificationChannels/NotificationChannelsComponent';
import CompanyComponent from '../Company/CompanyComponent';
import { CompanyOverview } from '../Company/CompanyOverview';
import { UpsertCompany } from '../Company/UpsertCompany';
import UserComponent from '../User/UserComponent';
import UserOverview from '../User/UserOverview';
import UpsertUser from '../User/UpsertUser';
import { LogoutComponent } from '../Security/LogoutComponent';

const AuthenticatedApp: React.FC = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardComponent />} />
        <Route path="/logger" element={<LogWatcher />} />
        <Route path="/configurations" element={<ConfigurationsComponent />} />
        <Route path="/configurations/:id" element={<ConfigurationOverview />} />
        <Route path="/network-status" element={<NetworkStatus />} />
        <Route path="/servers" element={<ServersComponent />} />
        <Route path="/servers/:id" element={<ServerOverview />} />
        <Route path="/audit" element={<AuditComponent />} />
        <Route path="/notification-channels" element={<NotificationChannelsComponent />} />
        <Route path="/companies" element={<CompanyComponent />} />
        <Route path="/companies/:id" element={<CompanyOverview />} />
        <Route path="/companies/:id/edit" element={<UpsertCompany />} />
        <Route path="/companies/add" element={<UpsertCompany />} />
        <Route path="/users" element={<UserComponent />} />
        <Route path="/users/:id" element={<UserOverview />} />
        <Route path="/users/:id/edit" element={<UpsertUser />} />
        <Route path="/users/add" element={<UpsertUser />} />
        <Route path="/logout" element={<LogoutComponent />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AuthenticatedApp;