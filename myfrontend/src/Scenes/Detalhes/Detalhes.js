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
          <Header title="Detalhes" subtitle="#02g4454f3d234-SAO" />
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
            Editar
          </Button>
          <Button
            sx={{
              backgroundColor: colors.redAccent[700],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
              color: colors.grey[100],
            }}
          >
            Deletar pedido
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
  gridColumn="span 11"
  gridRow="span 4"
  backgroundColor={colors.primary[400]}
  sx={{ boxShadow: 4 }}
>
  <Box display={"flex"} justifyContent={"flex-start"}>
  <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    Referencia ID:
  </Typography>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
  Data de criação:
  </Typography>
  <Button
  variant="contained"
  
  sx={{
    backgroundColor: colors.greenAccent[700],
    fontSize: "10px",
    margin: "20px",
    fontWeight: "bold",
    /* padding: "10px 20px", */
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    color: colors.grey[100],
  }}
  >
    Em transito
  </Button>
  </Box>
  </Box>
  <Box display={"flex"} justifyContent={"flex-start"}>
    <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    Tipo de carga:
  </Typography>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    NCM:
  </Typography>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    Peso: 
  </Typography>

  </Box>
  </Box>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    Origem:
  </Typography>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    Custo: 
  </Typography>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
  Contratante:
  </Typography>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    CE_MERCANTE: 
  </Typography>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    NCM:
  </Typography>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    Numero do container: 
  </Typography>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    Numero do BL: 
  </Typography>
  <Typography variant="h4" margin="20px" color={colors.grey[200]}>
    Numero da NF:
  </Typography>
</Box>

          <Box
          gridColumn={"span 1"}
          gridRow={"span 4"}
          backgroundColor={colors.primary[400]}
          sx={{ boxShadow: 4 }}>
            <Box m={"20px"}>
            <Typography variant="h6">Shipping Information</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
