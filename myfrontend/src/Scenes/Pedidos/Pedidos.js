import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { ptBR } from "@mui/x-data-grid/locales";
import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';


const columnscarga = [
  /* { field: "id", headerName: "ID", flex: 0.3, hide: true }, */
  { field: "ce_mercante", headerName: "CE Mercante", flex: 0.8 },
  {
    field: "shipping_status",
    headerName: "Status de Envio",
    flex: 0.5,
    align: "center",
    headerAlign: "center",
  },
  { field: "type_of_load", headerName: "Tipo de Carga", flex: 0.8, align: "center",
    headerAlign: "center", },
  {
    field: "origin_name_display",
    headerName: "Origem",
    flex: 0.5,
    align: "center",
    headerAlign: "center",
  },
  { field: "weight", headerName: "Peso", type: "number", flex: 0.5, align: "center",
    headerAlign: "center", },
  { field: "cost", headerName: "Custo", type: "number", flex: 0.5, align: "center",
    headerAlign: "center", },
  {
    field: "BL",
    headerName: "BL",
    flex: 0.5,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      if (params.row.blfile === null) {
        return (
          <Button
            style={{color: 'red'}}
            size="small"
          >
            Indisponível
          </Button>
        );
      } else {
        return (
          <strong>
            <a
              href={`http://127.0.0.1:8000/repositorio/bl/${params.row.id}`}
              download={params.row.filename + '.' + params.row.extension}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
              >
                Baixar
              </Button>
            </a>
          </strong>
        );
      }
    },
  },
  {
    field: " ",
    headerName: " ",
    flex: 0.5,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <strong>
        <a
          href={`http://127.0.0.1:8000/repositorio/bl/${params.row.id}`}
          download={params.row.filename + '.' + params.row.extension}
        >
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<AddIcon />}
        >
        Detalhes
        </Button>
        </a>
      </strong>
    ),
  }
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
    const newWs = new WebSocket("wss://localhost/ws/cargas_info");

    setWs(newWs);

    // Handle WebSocket messages

    newWs.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "update") {
        // Update the DataGrid rows

        setRows(data.data);
      }
    };

    // Handle WebSocket errors

    newWs.onerror = (event) => {
      console.error("WebSocket error:", event);
    };

    // Handle WebSocket close

    newWs.onclose = () => {
      console.log("WebSocket connection closed. Reconnecting in 5 seconds...");
    };

    // Fetch initial data from API
    fetch("http://127.0.0.1:8000/cargasinfo/")
      .then((response) => response.json())
      .then((data) => {
        setRows(
          data.results.map((item, index) => ({
            id: index, // DataGrid requires a unique 'id' for each row
            ...item,
          })),
        );
      })
      .catch((error) => console.error("Error fetching data:", error));

    return () => {
      // Close WebSocket connection when component unmounts
      newWs.close();
    };
  }, []);

  return (
      <Box
        m={margin}
        height={altura}
        width={largura}
        sx={{
          "& .name-column-cell": {
            color: colors.greenAccent[400],
          },
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[700],
            borderTop: "none",
          },
        }}
      >
        <DataGrid
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columnscarga}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box>
  );
};

export default Pedidos;
