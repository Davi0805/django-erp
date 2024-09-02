import React, { useState, useEffect, lazy, Suspense } from "react";
import { CircularProgress } from '@mui/material';
import "./Dashboard.css";
import { Typography, useTheme, Box, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../Components/Header/Header";
import Pedidos from "../Pedidos/Pedidos";
import StatBox from "../../Components/StatBox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBoatFilledIcon from "@mui/icons-material/DirectionsBoatFilled";
import DescriptionIcon from "@mui/icons-material/Description";
import BlockIcon from "@mui/icons-material/Block";
/* import NovaCargapopup from "../../Components/NovaCargapopup"; */
import axiosConfig from "../../axiosConfig";
import { mockTransactions } from "../../Data/mockData";
import { BottomNavigation } from "@mui/material";
import axios from "axios";

/* const Pedidos = lazy(() => import('../Pedidos/Pedidos')); */
const NovaCargapopup = lazy(() => import('../../Components/NovaCargapopup'));

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [excelData, setExcelData] = useState(null);

  const [stats, setStats] = useState({
    option_t_count: 0,
    option_b_count: 0,
    option_l_count: 0,
    option_p_count: 0,
  });

  const downloadFileFromApi = async (apiUrl, fileName, fileType) => {
    console.log("Downloading file...");
    try {
      const response = await axiosConfig.get(apiUrl, {
        responseType: "arraybuffer",

        headers: {
          "Content-Type": fileType,
        },
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: fileType }),
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", fileName);

      document.body.appendChild(link);

      link.click();

      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosConfig.get("statbox/");
        const data = response.data;
        if (data.results && typeof data.results === "object") {
          setStats(data.results);
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();

  }, []);

  return (
    <Box m="20px">
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ boxShadow: 4 }}
        alignItems="center"
      >
        <Box>
          <Header
            title="GNOSES"
            subtitle="Bem vindo ao painel de controle!"
          />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginRight="25px"
          sx={{ gap: "20px" }}
        >
          <NovaCargapopup />
          
          <Button
            onClick={() =>
              downloadFileFromApi(
                "/export/",
                "Cargas.xls",
                "application/ms-excel",
              )
            }
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
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(3, 1fr)",
          sm: "repeat(6, 1fr)",
          md: "repeat(12, 1fr)",
        }}
        mt="15px"
        gap="15px"
        gridAutoRows="140px"
      >
        <Box
          gridColumn={{
            xs: "span 12",
            sm: "span 6",
            md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          sx={{ boxShadow: 5 }}
        >
          <StatBox
            title={`${stats.option_t_count} / ${stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count}`}
            subtitle="Cargas em trânsito"
            icon={
              <DirectionsBoatFilledIcon
                sx={{ color: colors.blueAccent[500] }}
              />
            }
            progress={`${((stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count) / 100) * stats.option_t_count}%`}
            colorprogressstat={colors.blueAccent[400]}
            textcolor={colors.blueAccent[400]}
          />
        </Box>
        <Box
          gridColumn={{
            xs: "span 12",
            sm: "span 6",
            md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          sx={{ boxShadow: 5 }}
        >
          <StatBox
            title={`${stats.option_b_count} / ${stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count}`}
            subtitle="Cargas bloqueadas"
            icon={<BlockIcon sx={{ color: colors.redAccent[500] }} />}
            progress={`${((stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count) / 100) * stats.option_b_count}%`}
            colorprogressstat={colors.redAccent[500]}
            textcolor={colors.redAccent[500]}
          />
        </Box>
        <Box
          gridColumn={{
            xs: "span 12",
            sm: "span 6",
            md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          sx={{ boxShadow: 5 }}
        >
          <StatBox
            title={`${stats.option_l_count} / ${stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count}`}
            subtitle="Cargas liberadas"
            icon={<LocalShippingIcon sx={{ color: colors.greenAccent[500] }} />}
            progress={`${((stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count) / 100) * stats.option_l_count}%`}
            colorprogressstat={colors.greenAccent[400]}
            textcolor={colors.greenAccent[500]}
          />
        </Box>
        <Box
          gridColumn={{
            xs: "span 12",
            sm: "span 6",
            md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          sx={{ boxShadow: 5 }}
        >
          <StatBox
            title={`${stats.option_p_count} / ${stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count}`}
            subtitle="Cargas aguardando documentação"
            icon={<DescriptionIcon sx={{ color: colors.orange[400] }} />}
            progress={`${((stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count) / 100) * stats.option_p_count}%`}
            colorprogressstat={colors.orange[400]}
            textcolor={colors.orange[400]}
          />
        </Box>
        <Box
          gridColumn={{
            xs: "span 12", // Full width on extra small screens
            sm: "span 6", // Half width on small screens
            md: "span 9",}}
          gridRow={{
            xs: "span 8",
            sm: "span 6",
            md: "span 4",}}
          backgroundColor={colors.primary[400]}
          display="flex"
          width="100%"
          height="auto"
          sx={{ boxShadow: 4,
                  
           }}
        >
          <Pedidos margin={0} altura={"auto"} largura={"100%"} />
        </Box>
        <Box
           gridColumn={{
            xs: "span 12", // Full width on extra small screens
            sm: "span 6", // Half width on small screens
            md: "span 3",}}
          gridRow={{
            xs: "span 8",
            sm: "span 6",
            md: "span 4",}}
          width="100%"
          height="auto"
          backgroundColor={colors.primary[400]}
          sx={{ boxShadow: 4 }}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600" colors={colors.grey[100]}>
              Ultimas transacoes
            </Typography>
          </Box>
          {mockTransactions.map((transaction, index) => (
            <Box
              sx={{ boxShadow: 4 }}
              key={`${transaction.txId}-${index}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.blueAccent[600]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.blueAccent[600]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <BottomNavigation component={"footer"}
        sx={{
          position: 'relative',
          top: 10,
          bottom: 0,
          left: 0,
          width: '100%',
          bgcolor: colors.primary[400],
          py: 2,
          textAlign: 'center',
        }}>
        <Typography variant="h6" color={colors.grey[100]}>
          © 2021 Trevo. Todos os direitos reservados.
        </Typography>
      </BottomNavigation>
    </Box>
  );
};

export default Dashboard;
