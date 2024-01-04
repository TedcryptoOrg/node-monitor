import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Drawer, List } from '@mui/material';
import { Box } from '@mui/system';
import { navbarItems } from './Navbar';
import ConfigurationsComponent from './components/configurations/ConfigurationsComponent';
import MonitorsComponent from './components/MonitorsComponent';
import ServersComponent from './components/servers/ServersComponent';
import DashboardComponent from './components/DashboardComponent';
import ConfigurationOverview from './components/configurations/ConfigurationOverview';

function App() {
    return (
        <Router>
            <Box sx={{ display: 'flex' }}>
                <Drawer
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
                            <item.component key={item.name} name={item.name} icon={item.icon} path={item.path} />
                        ))}
                    </List>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path="/" element={<DashboardComponent />} />
                        <Route path="/configurations" element={<ConfigurationsComponent />} />
                        <Route path="/configurations/:id" element={<ConfigurationOverview />} />
                        <Route path="/monitors" element={<MonitorsComponent />} />
                        <Route path="/servers" element={<ServersComponent />} />
                        <Route path="/servers/:id" element={<ConfigurationOverview />} />
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;