import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="30px">
      <Typography
        variant="h2"
        color={colors.grey[200]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.blueAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
