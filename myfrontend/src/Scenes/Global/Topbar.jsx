import { Box, IconButton, MenuItem, useTheme } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import NotificationsOutlined from '@mui/icons-material/NotificationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlined from '@mui/icons-material/PersonOutlined';
import { Link, useNavigate } from 'react-router-dom'

const Topbar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('accessToken');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/');}

    return isAuthenticated  ? 

    <Box display="flex" justifyContent="space-between" p={2} sx={{
        boxShadow: 4, // Using Material-UI's predefined shadow intensity
        // Or for a custom shadow, you can use:
        // boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}>
        
        <Box display="flex">
        <MenuItem component={Link} to="/dashboard">Dashboard</MenuItem>
        <MenuItem component={Link} to="/dashboard/pedidos">Pedidos</MenuItem>
        <MenuItem component={Link} to="/dashboard/clientes">Clientes</MenuItem>
        </Box>
        <Box display="flex">
            <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
            </IconButton>
            <IconButton>
                <PersonOutlined />
            </IconButton>
            <IconButton>
                <NotificationsOutlined />
            </IconButton>
            <IconButton>
                <LogoutIcon onClick={handleLogout} />
            </IconButton>
        </Box>
    </Box>
                            : 
        <Box display="flex" justifyContent="space-between" p={2} sx={{
            boxShadow: 4, // Using Material-UI's predefined shadow intensity
            // Or for a custom shadow, you can use:
            // boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          }}>
            
            <Box display="flex">
            </Box>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? <DarkModeOutlined /> : <LightModeOutlined />}
                </IconButton>
            </Box>
        </Box>;
}

export default Topbar;