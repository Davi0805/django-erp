import { Box, IconButton, MenuItem, useTheme, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import { Link, useNavigate } from "react-router-dom";
import axiosConfig from "../../axiosConfig";
import { Menu } from "@mui/material";
import Cookies from 'js-cookie'

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [companyselect, setCompanyselect] = useState(null)
  /* const isAuthenticated = !!localStorage.getItem("accessToken"); */
  const isAuthenticated = !!Cookies.get("token");

  const handleColorModeChange = () => {
    colorMode.toggleColorMode();
    localStorage.setItem("colorMode", theme.palette.mode === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("refreshtoken")
    navigate("/");
  };

  const excelexport = async () => {
    try {
      const response = await axiosConfig.get("export/");
      const data = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleopenprofile = e => {
    setCompanyselect(e.currentTarget);
  }

  const handlecloseprofile = () => {
    setCompanyselect(null);
  }

  return isAuthenticated ? (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{
        backgroundColor: colors.primary[400],
        boxShadow: 4, // Using Material-UI's predefined shadow intensity
        // Or for a custom shadow, you can use:
        // boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box display="flex" alignItems="center"
      >
        <Typography
          marginTop="5px"
          component={Link}
          to="/dashboard"
          variant="h4"
          color={colors.grey[200]}
          fontWeight="bold"
          display="inline"
          sx={{ mb: "5px", textDecoration: "none" }}
        >
          GNOSES
        </Typography>
        {/* <MenuItem component={Link} to="/dashboard">Dashboard</MenuItem> */}
        <Box display="flex" alignItems="center" marginLeft="5px">
          <MenuItem component={Link} to="/dashboard/pedidos">
            Cargas
          </MenuItem>
          <MenuItem component={Link} to="/dashboard/clientes">
            Clientes
          </MenuItem>
        </Box>
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
        <IconButton>
          <PersonOutlined onClick={handleopenprofile} />

        </IconButton>
        <Menu
        id="simple-menu"
        anchorEl={companyselect}
        keepMounted
        open={Boolean(companyselect)}
        onClose={handlecloseprofile}
      >
          <MenuItem onClick={handlecloseprofile}>
            Trevo
          </MenuItem>
          <MenuItem onClick={handlecloseprofile}>
            CardozoBros
          </MenuItem>
      </Menu>
        <IconButton>
          <NotificationsOutlined />
        </IconButton>
        <IconButton>
          <LogoutIcon onClick={handleLogout} />
        </IconButton>
      </Box>
    </Box>
  ) : (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      sx={{
        boxShadow: 4, // Using Material-UI's predefined shadow intensity
        // Or for a custom shadow, you can use:
        // boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box display="flex"></Box>
      <Box display="flex">
        <IconButton onClick={handleColorModeChange}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
