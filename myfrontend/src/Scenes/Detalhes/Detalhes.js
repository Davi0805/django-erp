import React from 'react'
import { Box, useTheme, Button, Typography, Grid, Card, CardContent, CardHeader } from "@mui/material";
import { tokens } from "../../theme";
import Header from '../../Components/Header/Header';

export default function Detalhes() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">

    <Box display="flex" justifyContent="space-between" sx={{ boxShadow: 4 }} alignItems="center">

      <Box>

        <Header title="Cargas" subtitle="Bem vindo ao painel de controle!" />

      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginRight="25px" sx={{ gap: "20px"}}>

        <Button sx={{ backgroundColor: colors.blueAccent[700], fontSize: "14px", fontWeight: "bold", padding: "10px 20px", alignItems: "center", display: "flex", justifyContent: "center", color: colors.grey[100] }}>

          Baixar planilhas

        </Button>

      </Box>

    </Box>

    <Box mt="15px">

      <Grid container spacing={2}>

        <Grid item xs={12} sm={6} md={4} lg={3}>

          <Typography variant="h6">Order Details</Typography>

          <Typography variant="body1">Order ID: #12345</Typography>

          <Typography variant="body1">Order Date: 2023-02-20</Typography>

          <Typography variant="body1">Total: R$ 100,00</Typography>

        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>

          <Typography variant="h6">Shipping Information</Typography>

          <Typography variant="body1">Name: John Doe</Typography>

          <Typography variant="body1">Address: 123 Main St, Anytown, USA</Typography>

          <Typography variant="body1">Phone: (123) 456-7890</Typography>

        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>

          <Typography variant="h6">Order Items</Typography>

          <Typography variant="body1">Item 1: Product 1 x 2</Typography>

          <Typography variant="body1">Item 2: Product 2 x 3</Typography>

          <Typography variant="body1">Item 3: Product 3 x 1</Typography>

        </Grid>

      </Grid>

    </Box>

  </Box>
  )
}
