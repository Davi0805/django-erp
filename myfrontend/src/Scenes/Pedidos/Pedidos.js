import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import { ptBR } from "@mui/x-data-grid/locales";

const columnscarga = [
  { field: 'id', headerName: 'ID', flex: 0.3, hide: true },
  { field: 'contractor_name_display', headerName: 'Contratante', flex: 1.5 },
  { field: 'shipping_status', headerName: 'Status de Envio', flex: 0.6, align: 'center' },
  { field: 'type_of_load', headerName: 'Tipo de Carga', flex: 1 },
  { field: 'origin_name_display', headerName: 'Origem', flex: 0.5, align: 'center' },
  { field: 'weight', headerName: 'Peso', type: 'number', flex: 1 },
  { field: 'cost', headerName: 'Custo', type: 'number', flex: 1 },
];

const WS_URL = "ws://127.0.0.1:800";

const Pedidos = ({ margin, altura, largura }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [ws, setWs] = useState(null);

  const reconnectInterval = 5000;

  useEffect(() => {
    // Establish WebSocket connection
    const newWs = new WebSocket('wss://localhost/ws/cargas_info');

    setWs(newWs);


    // Handle WebSocket messages

    newWs.onmessage = (event) => {

      const data = JSON.parse(event.data);


      if (data.type === 'update') {

        // Update the DataGrid rows

        setRows(data.data);

      }

    };


    // Handle WebSocket errors

    newWs.onerror = (event) => {

      console.error('WebSocket error:', event);

    };


    // Handle WebSocket close

    newWs.onclose = () => {

      console.log('WebSocket connection closed. Reconnecting in 5 seconds...');

    };

    // Fetch initial data from API
    fetch('http://127.0.0.1:8000/cargasinfo/')
      .then(response => response.json())
      .then(data => {
        setRows(data.results.map((item, index) => ({
          id: index, // DataGrid requires a unique 'id' for each row
          ...item
        })));
      })
      .catch(error => console.error('Error fetching data:', error));

    return () => {
      // Close WebSocket connection when component unmounts
      newWs.close();
    };
  }, []);

    
  return (
    <Box>
      {/*  <Header title="Pedidos" subtitle="Relatorio de todos pedidos"/> */}
      <Box m={margin} height={altura} width={largura} sx={{
        '& .name-column-cell': {
          color: colors.greenAccent[400],
        },
        '& .MuiDataGrid-root': {
          border: "none",
        },
        '& .MuiDataGrid-cell': {
          borderBottom: "none",
        },
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        '& .MuiDataGrid-virtualScroller': {
          backgroundColor: colors.primary[400],
        },
        '& .MuiDataGrid-footerContainer': {
          backgroundColor: colors.blueAccent[700],
          borderTop: "none",
        },
      }}>
        <DataGrid
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columnscarga}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
    </Box>
  );
};

export default Pedidos;