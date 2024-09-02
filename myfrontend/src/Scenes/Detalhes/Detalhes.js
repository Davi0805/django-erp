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
import DeleteButton from "../../Components/Deletebutton";
import { tokens } from "../../theme";
import Header from "../../Components/Header/Header";
import DownloadIcon from '@mui/icons-material/Download';
import StatBox from "../../Components/StatBox";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UpdateCargapopup from "../../Components/UpdateCargapopup";
import axiosConfig from "../../axiosConfig";

export default function Detalhes() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const params = useParams();
  const [data, setData] = useState([]);


  console.log(params)


  useEffect(() => {
    console.log('Fetching data for ID:', params.id); // Debug log
    axiosConfig.get(`http://127.0.0.1:8000/cargasinfo/${params.id}`)
      .then(response => {
        console.log('Fetched data:', response.data); // Log fetched data
        setData(response.data);
      })
      .catch(error => console.error('Fetch error:', error));
  }, [params.id]); // Consider dependency on params.id if it should trigger refetch

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ boxShadow: 4 }}
        alignItems="center"
      >
        <Box>
          <Header title="Detalhes" subtitle={data.contractor_name_display} />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginRight="25px"
          sx={{ gap: "20px" }}
        >
          <UpdateCargapopup requestData={data} params={params} />
          <DeleteButton endpoint={`http://127.0.0.1:8000/cargasinfo/${params.id}`} />
           {/* <Button
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
          </Button> */}
        </Box>
      </Box>

      <Box mt="15px" display="flex" justifyContent="space-between">
      <Box
  display="grid"
  gridTemplateColumns="repeat(12, 1fr)"
  mt="15px"
  gap="15px"
  width={"100%"}
  gridAutoRows="auto" // Adjusted to auto for dynamic height
>
  <Box
    gridColumn="span 12" // Use full width for better organization
    backgroundColor={colors.primary[400]}
    sx={{ boxShadow: 4, padding: "20px" }} // Added padding here
  >
    {/* Header Section */}
    <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="15px" alignContent={"center"}>
      <Typography variant="h5" color={colors.grey[200]}>
        Id: {data.referenciaid}
      </Typography>
      <Typography variant="h5" color={colors.grey[200]}>
        Data: {data.created_at}
      </Typography>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
         <Button
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[700],
              fontSize: "10px",
              fontWeight: "bold",
              color: colors.grey[100],
            }}
          >
            Em transito
          </Button>
          </Box>
        
    </Box>
  </Box>


          <Box display="grid" backgroundColor={colors.primary[400]} gridColumn="span 12" gridRow={"span 12"} gap="20px" alignContent={"center"} sx={{ boxShadow: 4, padding: "20px" }}>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="20px">
            <Typography variant="h5" color={colors.grey[200]} >Custo: R${data.cost}</Typography>
            <Typography variant="h5" color={colors.grey[200]} >NCM: {data.ncm}</Typography>
            <Typography variant="h5" color={colors.grey[200]} >Container: {data.cntrnum}</Typography>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="20px">
            <Typography variant="h5" color={colors.grey[200]} >Origem: {data.origin_name_display}</Typography>
            <Typography variant="h5" color={colors.grey[200]} >Peso: {data.weight}kg</Typography>
            <Typography variant="h5" color={colors.grey[200]} >CE MERCANTE: {data.ce_mercante}</Typography>
            <Typography variant="h5" color={colors.grey[200]} >Destino:</Typography>
            <Typography variant="h5" color={colors.grey[200]} >Tipo de carga: {data.type_of_load}</Typography>
            <Typography variant="h5" color={colors.grey[200]} >BL: {data.blnum}</Typography>
            </Box>
            
          </Box>
          <Box display="grid" backgroundColor={colors.primary[400]} gridColumn="span 12" gridRow={"span 5"} alignContent={"center"} sx={{ boxShadow: 4, padding: "10px" }}>
            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="20px">
              <Button
              href={`http://127.0.0.1:8000/repositorio/bl/${params.id}`}
              download={"Packinglist" + data.referenciaid}
               variant="contained"
               disabled={!data.blfile}><DownloadIcon />BL</Button>
              <Button 
              href={`http://127.0.0.1:8000/repositorio/ce_m/${params.id}`}
              download={"Packinglist" + data.referenciaid}
              variant="contained"
              disabled={!data.ce_m_file}><DownloadIcon />CE MERCANTE</Button>
              <Button 
              href={`http://127.0.0.1:8000/repositorio/packinglist/${params.id}`}
              download={"Packinglist" + data.referenciaid}
              variant="contained"
              disabled={!data.packinglist}><DownloadIcon />PACKING LIST</Button>
              <Button 
              href={`http://127.0.0.1:8000/repositorio/afrmm/${params.id}`}
              download={"Packinglist" + data.referenciaid}
              variant="contained"
              disabled={!data.afrmmfile}><DownloadIcon />Comprovante de pagamento</Button>
            </Box>
          </Box>
          <Box display="grid" gridColumn="span 12" gridRow={"span 10"} alignContent={"center"} backgroundColor={colors.primary[400]} sx={{ boxShadow: 4, padding: "10px" }}>
            <Box display={"grid"} gridTemplateColumns={"repeat(4, 1fr)"}>
          <StatBox title={"20/10/2024 - 18:00"} textcolor={colors.grey[200]} icon={<CalendarMonthIcon />} subtitle={"Previsao de chegada"} ></StatBox>
          <StatBox title={"R$: 7.540"} textcolor={colors.grey[200]} icon={<MonetizationOnIcon />} subtitle={"Faturamento do pedido"}></StatBox>
          <StatBox title={"R$: 27.560"} textcolor={colors.grey[200]} icon={<AccountBalanceIcon />} subtitle={"Faturamento total do cliente"}></StatBox>
          <StatBox title={"XXXX"} textcolor={colors.grey[200]} icon={<DirectionsBoatFilledIcon />} subtitle={"Terminal de carregamento"}></StatBox>
          </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
