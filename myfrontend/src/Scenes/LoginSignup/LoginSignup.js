import React, { useContext } from "react";
import { useTheme, Box, Typography, Button, FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { tokens } from "../../theme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HttpsIcon from "@mui/icons-material/Https";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../../axiosConfig";
import { AuthContext } from "../../authContext";

export const LoginSignup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    try {
      await login(formJson); // Ensure login function is properly called
      navigate("/dashboard"); // Adjust path if necessary
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt="200px">
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="row"
        sx={{ backgroundColor: colors.primary[400], borderRadius: "1%" }}
      >
        <Box
          display="flex"
          width="35vw"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h2"
            sx={{ borderRadius: "10px" }}
            margin="35px 25px"
            alignItems="center"
            color={colors.grey[200]}
          >
            Login
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box display="row" justifyContent="center" alignItems="center">
            <Box margin="25px">
              <FormControl fullWidth size="normal">
                <InputLabel htmlFor="username">Usuário</InputLabel>
                <OutlinedInput
                  id="username"
                  name="username"
                  placeholder="Usuário"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircleIcon sx={{ color: colors.blueAccent[500] }} />
                    </InputAdornment>
                  }
                  label="Usuário"
                />
              </FormControl>
            </Box>
            <Box margin="25px" fullWidth>
              <FormControl fullWidth size="normal">
                <InputLabel htmlFor="password">Senha</InputLabel>
                <OutlinedInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Senha"
                  startAdornment={
                    <InputAdornment position="start">
                      <HttpsIcon sx={{ color: colors.blueAccent[500] }} />
                    </InputAdornment>
                  }
                  label="Senha"
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" size="large" m="20px">
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ backgroundColor: colors.blueAccent[500], color: colors.grey[200] }}
          >
            Logar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginSignup;
