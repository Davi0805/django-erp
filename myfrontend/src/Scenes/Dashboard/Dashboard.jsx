import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Typography, useTheme, Box, Button } from '@mui/material';
import { tokens } from '../../theme';
import Header from '../../Components/Header/Header';
import Pedidos from '../Pedidos/Pedidos';
import StatBox from '../../Components/StatBox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import DescriptionIcon from '@mui/icons-material/Description';
import BlockIcon from '@mui/icons-material/Block';
import NovaCargapopup from '../../Components/NovaCargapopup';
import axiosConfig from '../../axiosConfig';
import { mockTransactions } from '../../Data/mockData';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [stats, setStats] = useState({
    option_t_count: 0,
    option_b_count: 0,
    option_l_count: 0,
    option_p_count: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosConfig.get('statbox/');
        const data = response.data;
        if (data.results && typeof data.results === 'object') {
          setStats(data.results);
        } else {
          console.error('Unexpected data structure:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStats();

 /*    const socket = new WebSocket(SOCKET_SERVER_URL);

    socket.onmessage = (event) => {
      const newData = JSON.parse(event.data).data;
      setStats(prevStats => ({
        ...prevStats,
        ...newData
      }));
    };

    socket.onclose = (event) => {
      console.log('WebSocket closed: ', event);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    return () => {
      socket.close();
    }; */
  }, []);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" sx={{ boxShadow: 4 }} alignItems="center">
        <Box>
          <Header title="CardozoBros" subtitle="Bem vindo ao painel de controle!" />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginRight="25px" sx={{ gap: "20px" }}>
          <NovaCargapopup />
          <Button sx={{ backgroundColor: colors.blueAccent[700], fontSize: "14px", fontWeight: "bold", padding: "10px 20px", alignItems: "center", display: "flex", justifyContent: "center", color: colors.grey[100] }}>
            Baixar planilhas
          </Button>
        </Box>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" mt="15px" gap="15px" gridAutoRows="140px">
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" sx={{ boxShadow: 5 }}>
          <StatBox
            title={`${stats.option_t_count} / ${stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count}`}
            subtitle="Cargas em trânsito"
            icon={<DirectionsBoatFilledIcon sx={{ color: colors.blueAccent[500] }} />}
            progress={`${((stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count) / 100) * stats.option_t_count}%`}
            colorprogressstat={colors.blueAccent[400]}
            textcolor={colors.blueAccent[400]}
          />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" sx={{ boxShadow: 5 }}>
          <StatBox
            title={`${stats.option_b_count} / ${stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count}`}
            subtitle="Cargas bloqueadas"
            icon={<BlockIcon sx={{ color: colors.redAccent[500] }} />}
            progress={`${((stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count) / 100) * stats.option_b_count}%`}
            colorprogressstat={colors.redAccent[500]}
            textcolor={colors.redAccent[500]}
          />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" sx={{ boxShadow: 5 }}>
          <StatBox
            title={`${stats.option_l_count} / ${stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count}`}
            subtitle="Cargas liberadas"
            icon={<LocalShippingIcon sx={{ color: colors.greenAccent[500] }} />}
            progress={`${((stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count) / 100) * stats.option_l_count}%`}
            colorprogressstat={colors.greenAccent[400]}
            textcolor={colors.greenAccent[500]}
          />
        </Box>
        <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display="flex" alignItems="center" justifyContent="center" sx={{ boxShadow: 5 }}>
          <StatBox
            title={`${stats.option_p_count} / ${stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count}`}
            subtitle="Cargas aguardando documentação"
            icon={<DescriptionIcon sx={{ color: colors.orange[400] }} />}
            progress={`${((stats.option_t_count + stats.option_b_count + stats.option_p_count + stats.option_l_count) / 100) * stats.option_p_count}%`}
            colorprogressstat={colors.orange[400]}
            textcolor={colors.orange[400]}
          />
        </Box>
        <Box gridColumn="span 6" gridRow="span 3" backgroundColor={colors.primary[400]} display="flex" width="48.50vw" height="51vh" sx={{ boxShadow: 4 }}>
          <Pedidos margin={0} altura={"51vh"} largura={"48.50vw"} />
        </Box>
        <Box gridColumn="span 6" gridRow="span 3" backgroundColor={colors.primary[400]} sx={{ boxShadow: 4 }} overflow="auto">
          <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} colors={colors.grey[100]} p="15px">
            <Typography variant="h5" fontWeight="600" colors={colors.grey[100]}>Atualizações recentes</Typography>
          </Box>
          {mockTransactions.map((transaction, index) => (
            <Box sx={{ boxShadow: 4 }} key={`${transaction.txId}-${index}`} display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
              <Box>
                <Typography color={colors.greenAccent[500]} variant='h5' fontWeight="600">
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
