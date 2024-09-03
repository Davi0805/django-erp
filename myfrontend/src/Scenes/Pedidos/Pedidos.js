import { Box, CircularProgress, LinearProgress, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { ptBR } from "@mui/x-data-grid/locales";
import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from "@tanstack/react-query";
import axiosConfig from "../../axiosConfig";



const Pedidos = ({ margin, altura, largura }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  /* const [rows, setRows] = useState([]); */

/*   const fetchCargas = async () => {
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
  };
} */

  const columnscarga = [
    /* { field: "id", headerName: "ID", flex: 0.3, hide: true }, */
    { field: "ce_mercante", headerName: "Cliente", flex: 0.8 },
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
              style={{color: colors.redAccent[500]}}
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
            href={`http://127.0.0.1:3000/dashboard/detalhes/${params.row.id}`}
          >
          <Button
            variant="contained"
            /* color={colors.blueAccent[100]} */
            sx={{
              color: colors.grey[100],
              backgroundColor: colors.blueAccent[500],
            }}
            
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

  const fetchCargas = async () => {

    const response = await axiosConfig.get('/cargasinfo/');
    return response.data;
  };
  

  

const { data, error, isLoading } = useQuery({
  queryKey: "cargasinfo",
  queryFn: fetchCargas,
});

console.log('Ta entrando aqui: ', data);


  if (isLoading) {

    return <LinearProgress color="secondary"/>;

  }


  if (error) {

    return <div>Error: {error.message}</div>;

  }
  console.log('Data:', data); // Add this line to log the data object


   const rows = data.map((item, index) => ({

    id: index, // DataGrid requires a unique 'id' for each row

    ...item,

  }));


  
  /* useEffect(() => {
    // Establish WebSocket connection
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
    };
  }, []); */

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
          "& .MuiDataGrid-columnHeader": {
            borderBottom: colors.blueAccent[400]
            },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.blueAccent[900],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: colors.blueAccent[400],
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
