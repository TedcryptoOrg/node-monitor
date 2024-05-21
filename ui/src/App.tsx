import React, {useCallback, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Drawer, List } from '@mui/material';
import { Box } from '@mui/system';
import { navbarItems } from './Navbar';
import ConfigurationsComponent from './components/configurations/ConfigurationsComponent';
import NetworkStatus from './components/NetworkStatus/NetworkStatus';
import ServersComponent from './components/servers/ServersComponent';
import DashboardComponent from './components/DashboardComponent';
import ConfigurationOverview from './components/configurations/ConfigurationOverview';
import ServerOverview from "./components/servers/ServerOverview";
import AuditComponent from "./components/AuditComponent";
import NotificationChannelsComponent from "./components/notificationChannels/NotificationChannelsComponent";
import {useApi} from "./context/ApiProvider";
import {useUserStore} from "./stores/useUserStore";
import LoginComponent from "./components/Security/LoginComponent";
import CompaniesComponent from "./components/Company/CompaniesComponent";
import CompanyOverview from "./components/Company/CompanyOverview";
import UpsertCompany from "./components/Company/UpsertCompany";
import UserComponent from "./components/User/UserComponent";
import UserOverview from "./components/User/UserOverview";
import UpsertUser from "./components/User/UpsertUser";
import {LogoutComponent} from "./components/Security/LogoutComponent";
import LogWatcher from "./components/logWatcher/LogWatcher";

function App() {
    const api = useApi();
    const { user, setUser, securityTokens, setApiSecurityTokens } = useUserStore();

    const fetchMe = useCallback(() => {
        if (!user) {
            api?.get('/users/me')
                .then((response) => {
                    if (!response.ok || !response.body) {
                        throw new Error('Failed to fetch user!')
                    }

                    setUser(response.body);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    setUser(undefined);
                    setApiSecurityTokens(null);
                });
        }
    }, [user]);

    useEffect(() => {
        if (securityTokens) {
            fetchMe();
        } else {
            setUser(undefined);
            setApiSecurityTokens(null);
        }
    }, [fetchMe]);

    return (
        <>
        <Router>
            <Box sx={{ display: 'flex' }}>
                {user && <Drawer
                    variant="permanent"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: 240,
                            boxSizing: 'border-box',
                        },
                    }}
                >
                    <List>
                        {navbarItems.map((item, index) => (
                            user && item.security(user) && <item.component key={item.name} name={item.name} icon={item.icon} path={item.path} />
                        ))}
                    </List>
                </Drawer>}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        {user ? (<>
                            <Route path="/" element={<DashboardComponent />} />
                            <Route path="/logger" element={<LogWatcher />} />
                            <Route path="/configurations" element={<ConfigurationsComponent />} />
                            <Route path="/configurations/:id" element={<ConfigurationOverview />} />
                            <Route path="/network-status" element={<NetworkStatus />} />
                            <Route path="/servers" element={<ServersComponent />} />
                            <Route path="/servers/:id" element={<ServerOverview />} />
                            <Route path="/audit" element={<AuditComponent />} />
                            <Route path="/notification-channels" element={<NotificationChannelsComponent />} />
                            <Route path="/companies" element={<CompaniesComponent />} />
                            <Route path="/companies/:id" element={<CompanyOverview />} />
                            <Route path="/companies/:id/edit" element={<UpsertCompany />} />
                            <Route path="/companies/add" element={<UpsertCompany />} />
                            <Route path="/users" element={<UserComponent />} />
                            <Route path="/users/:id" element={<UserOverview />} />
                            <Route path="/users/:id/edit" element={<UpsertUser />} />
                            <Route path="/users/add" element={<UpsertUser />} />
                            <Route path="/logout" element={<LogoutComponent />} />
                        </>) : (
                            <Route path="/*" element={<LoginComponent />} />
                        )}
                    </Routes>
                </Box>
            </Box>
        </Router>
    </>
    );
}

export default App;