import React, { useState } from 'react';
import { tokens } from '../theme';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../axiosConfig';
import { useQueryClient } from '@tanstack/react-query';


function DeleteButton({ endpoint }) {
  const queryclient = useQueryClient();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const redirecionar = useNavigate();

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axiosConfig.delete(endpoint);

      console.log('Delete request successful!');
        handleClose();
        redirecionar('/dashboard')
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (<Box>
    <Button
    sx={{
      backgroundColor: colors.blueAccent[400],
      fontSize: "14px",
      fontWeight: "bold",
      padding: "10px 20px",
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      color: colors.grey[100],
    }}
    onClick={handleClickOpen}
  >
    Deletar pedido
  </Button>
  <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Apagar carga"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Voce esta prestes a apagar um registro, voce tem certeza que deseja prosseguir?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Apagar
          </Button>
        </DialogActions>
      </Dialog>
  </Box>
  
  );
}

export default DeleteButton;
