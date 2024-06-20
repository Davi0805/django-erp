import React from 'react'
import Pedidos from './Pedidos'
import { Box, useTheme, Button, } from "@mui/material";
import { tokens } from "../../theme";
import Header from '../../Components/Header/Header';
import NovaCargapopup from '../../Components/NovaCargapopup';
import axiosConfig from '../../axiosConfig';

export default function PaginaPedidos() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const downloadFileFromApi = async (apiUrl, fileName, fileType) => {
        console.log('Downloading file...');
        try {
      
          const response = await axiosConfig.get(apiUrl, {
      
            responseType: 'arraybuffer',
      
            headers: {
      
              'Content-Type': fileType,
      
            },
      
          });
      
      
          const url = window.URL.createObjectURL(new Blob([response.data], { type: fileType }));
      
          const link = document.createElement('a');
      
          link.href = url;
      
          link.setAttribute('download', fileName);
      
          document.body.appendChild(link);
      
          link.click();
      
          link.remove();
      
        } catch (error) {
      
          console.error(error);
      
        }
      
      };

  return (
    <Box m="20px">
    <Box display="flex" justifyContent="space-between" sx={{ boxShadow: 4 }} alignItems="center">
        <Box>
          <Header title="Cargas" subtitle="Bem vindo ao painel de controle!" />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginRight="25px" sx={{ gap: "20px"}}>
          <NovaCargapopup />
          <Button onClick={() => downloadFileFromApi('/export/', 'ThePythonDjango.xls', 'application/ms-excel')} sx={{ backgroundColor: colors.blueAccent[700], fontSize: "14px", fontWeight: "bold", padding: "10px 20px", alignItems: "center", display: "flex", justifyContent: "center", color: colors.grey[100] }}>
            Baixar planilhas
          </Button>
        </Box>
      </Box>
      <Box mt="15px ">
      <Pedidos />
      </Box>
      </Box>
  )
}
