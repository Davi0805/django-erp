import React, { lazy, Suspense } from "react";
import { CircularProgress, LinearProgress } from '@mui/material';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "./authContext"; 
/* import Topbar from "./Scenes/Global/Topbar";
import Dashboard from "./Scenes/Dashboard/Dashboard";
import { LoginSignup } from "./Scenes/LoginSignup/LoginSignup";

import Detalhes from "./Scenes/Detalhes/Detalhes";
import PaginaPedidos from "./Scenes/Pedidos/PaginaPedidos"; */
import PrivateRoute from "./PrivateRoute";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const Topbar = lazy(() => import('./Scenes/Global/Topbar'));
const Dashboard = lazy(() => import('./Scenes/Dashboard/Dashboard'));
const LoginSignup = lazy(() => import('./Scenes/LoginSignup/LoginSignup'));
const Detalhes = lazy(() => import('./Scenes/Detalhes/Detalhes'));
const PaginaPedidos = lazy(() => import('./Scenes/Pedidos/PaginaPedidos'));

const queryClient = new QueryClient();

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Router>
            <main className="content">
              <Suspense fallback={<LinearProgress color="inherit" />}>
              <AuthProvider>
              <QueryClientProvider client={queryClient}>
              <Topbar />
              <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route element={<PrivateRoute />}>
                <Route path="/dashboard/detalhes/:id/" element={<Detalhes />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/dashboard/pedidos"
                    element={<PaginaPedidos />}
                  />
                  <Route path="/dashboard/detalhes/:id/" element={<Detalhes />} />
                </Route>
              </Routes>
              </QueryClientProvider>
              </AuthProvider>
              </Suspense>
            </main>
          </Router>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
