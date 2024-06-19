import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './Scenes/Global/Topbar';
import Dashboard from './Scenes/Dashboard/Dashboard';
import { LoginSignup } from './Scenes/LoginSignup/LoginSignup';
import PrivateRoute from './PrivateRoute';
import Pedidos from './Scenes/Pedidos/Pedidos';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <Router>
            <main className='content'>
              <Topbar />
              <Routes>
                <Route path="/" element={<LoginSignup />} />
                    <Route element={<PrivateRoute />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/dashboard/pedidos" element={<Pedidos />} />
                    </Route>
              </Routes>
            </main>
          </Router>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
