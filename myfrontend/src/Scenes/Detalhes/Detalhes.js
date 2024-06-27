import React from "react";
import {
  Box,
  useTheme,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/Header/Header";

export default function Detalhes() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ boxShadow: 4 }}
        alignItems="center"
      >
        <Box>
          <Header title="Detalhes" subtitle="Informacoes sobre a carga" />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginRight="25px"
          sx={{ gap: "20px" }}
        >
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              color: colors.grey[100],
            }}
          >
            Baixar planilhas
          </Button>
        </Box>
      </Box>

      <Box mt="15px" display="flex" justifyContent="space-between">
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          mt="15px"
          gap="15px"
          gridAutoRows="140px"
        >
          <Box
            gridColumn="span 6"
            gridRow="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            sx={{ boxShadow: 4 }}
          >
            <Typography variant="h4" margin="20px">
              #131805000071025
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6">Shipping Information</Typography>
          </Box>

          <Box>
            <Typography variant="h6">Order Items</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
