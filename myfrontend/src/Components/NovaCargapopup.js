import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  colors,
  Select,
  MenuItem,
  Fade,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/system";
import { tokens } from "../theme";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ShoppingBagSharpIcon from "@mui/icons-material/ShoppingBagSharp";
import ScaleSharpIcon from "@mui/icons-material/ScaleSharp";
import AttachMoneySharpIcon from "@mui/icons-material/AttachMoneySharp";
import AssuredWorkloadSharpIcon from "@mui/icons-material/AssuredWorkloadSharp";
import PublicIcon from "@mui/icons-material/Public";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useQueryClient } from "@tanstack/react-query";
import axiosConfig from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://127.0.0.1:8000/contractor/";

const NovaCargapopup = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, openchange] = useState(false);
  const redirecionar = useNavigate();
  // OPCOES FORMULARIO
  const [options, setOptions] = useState([]);
  const [coptions, setCoptions] = useState([]);
  const [value, setValue] = useState("");
  const [covalue, setCovalue] = useState("");
  // MUDANCA DE NOME FILE UPLOADS
  const [ce_mfilename, setCe_mfile] = useState("Adicionar CE_M");
  const [blfilename, setBlfile] = useState("Adiconar BL");
  const [packlistfile, setPackfile] = useState("Adicionar PackingList");
  const [afrmmfile, setAfrmmfile] = useState("Adicionar AFRMM");
  const handleCeMfile = (event) => {
    const filename = event.target.files[0]?.name || "Adicionar CE_M";
    setCe_mfile(filename);
  };
  const handleBlfilename = (event) => {
    const filename = event.target.files[0]?.name || "Adicionar BL";
    setBlfile(filename);
  };
  const handlePacklistfile = (event) => {
    const filename = event.target.files[0]?.name || "Adicionar PackingList";
    setPackfile(filename);
  };
  const handleAfrmmfile = (event) => {
    const filename = event.target.files[0]?.name || "Adicionar AFRMM";
    setAfrmmfile(filename);
  };
  //Alerta de sucesso
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertmessage] = useState("Nova carga registrada");
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };
  const handleFileChange = (event) => {
    setOpenAlert(true);
  };


  useEffect(() => {

    fetch("http://127.0.0.1:8000/contractor/")
      .then((response) => response.json())
      .then((data) => {
        const contractors = data.results;
        setOptions(
          contractors.map((contractor) => ({
            id: contractor.id,
            name: contractor.name,
          })),
        );
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch("http://127.0.0.1:8000/country/")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.results;
        setCoptions(
          countries.map((country) => ({ id: country.id, name: country.name })),
        );
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const funcopenchange = () => {
    openchange(true);
  };

  const funcclosechange = () => {
    openchange(false);
  };

  return (
    <div>
      <Button
        onClick={funcopenchange}
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
      >
        Nova carga
      </Button>
      <Dialog
        open={open}
        fullWidth
        onClose={funcclosechange}
        sx={colors.primary[500]}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            formData.append('data', JSON.stringify(formJson));
            console.log(formData); //CHECAR ANTES DE PRODUCAO
            try {
              const response = await axiosConfig.post('/cargasinfo/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
              console.log(response);
              setAlertmessage("Nova carga adicionada!");
              setOpenAlert(true);
              funcclosechange();
              handleFileChange(); // Close the dialog if the request was successful
              queryClient.invalidateQueries('cargasinfo');
            } catch (error) {
              console.error(error);
              setAlertmessage("Erro ao registrar nova carga");
              setOpenAlert(true);
            }
          },
        }}
      >
        <DialogTitle variant="h3" fontWeight="Bold" color={colors.grey[200]}>
          Registrar nova carga
        </DialogTitle>
        <DialogContent>
          <Box marginTop="15px">
            <FormControl fullWidth>
              <InputLabel htmlFor="contractorname">Contratante</InputLabel>
              <Select
                style={{
                  height: 50,
                  backgroundColor: colors.blueAccent[900],
                  color: colors.grey[300],
                  borderRadius: "4px",
                  borderWidth: "1px",
                  borderColor: colors.grey[400],
                }}
                value={value}
                label="Contratante"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircleIcon
                      sx={{ color: colors.grey[400] }}
                    />
                  </InputAdornment>
                }
                onChange={(event) => setValue(event.target.value)}
                name="contractorname"
              >
                {options.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="type_of_load">Tipo de Carga</InputLabel>
              <OutlinedInput
                style={{
                  height: 50,
                  backgroundColor: colors.blueAccent[900],
                  color: colors.grey[300],
                  borderRadius: "4px",
                  borderWidth: "1px",
                  borderColor: colors.grey[400],
                }}
                id="type_of_load"
                name="type_of_load"
                placeholder="Tipo de carga"
                startAdornment={
                  <InputAdornment position="start">
                    <ShoppingBagSharpIcon
                      sx={{ color: colors.grey[400] }}
                    />
                  </InputAdornment>
                }
                label="Tipo de Carga"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="origin">Origem</InputLabel>
              <Select
                style={{
                  height: 50,
                  backgroundColor: colors.blueAccent[900],
                  color: colors.grey[300],
                  borderRadius: "4px",
                  borderWidth: "1px",
                  borderColor: colors.grey[400],
                }}
                value={covalue}
                label="Origem"
                startAdornment={
                  <InputAdornment position="start">
                    <PublicIcon sx={{ color: colors.grey[300] }} />
                  </InputAdornment>
                }
                onChange={(event) => setCovalue(event.target.value)}
                name="origin"
              >
                {coptions.map((coption) => (
                  <MenuItem key={coption.id} value={coption.id}>
                    {coption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="weight">Peso</InputLabel>
              <OutlinedInput
                style={{
                  height: 50,
                  backgroundColor: colors.blueAccent[900],
                  color: colors.grey[300],
                  borderRadius: "4px",
                  borderWidth: "1px",
                  borderColor: colors.grey[400],
                }}
                id="weight"
                name="weight"
                placeholder="Kg"
                startAdornment={
                  <InputAdornment position="start">
                    <ScaleSharpIcon sx={{ color: colors.grey[300] }} />
                  </InputAdornment>
                }
                label="Peso"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="cost">Custo</InputLabel>
              <OutlinedInput
                style={{
                  height: 50,
                  backgroundColor: colors.blueAccent[900],
                  color: colors.grey[300],
                  borderRadius: "4px",
                  borderWidth: "1px",
                  borderColor: colors.grey[400],
                }}
                id="cost"
                name="cost"
                startAdornment={
                  <InputAdornment position="start">
                    <AttachMoneySharpIcon
                      sx={{ color: colors.grey[300] }}
                    />
                  </InputAdornment>
                }
                label="Custo"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="ce_mercante">CE MERCANTE</InputLabel>
              <OutlinedInput
                style={{
                  height: 50,
                  backgroundColor: colors.blueAccent[900],
                  color: colors.grey[300],
                  borderRadius: "4px",
                  borderWidth: "1px",
                  borderColor: colors.grey[400],
                }}
                id="ce_mercante"
                name="ce_mercante"
                startAdornment={
                  <InputAdornment position="start">
                    <AssuredWorkloadSharpIcon
                      sx={{ color: colors.grey[300] }}
                    />
                  </InputAdornment>
                }
                label="CE MERCANTE"
              />
            </FormControl>
          </Box>
          <Box marginTop={"25px"}display="flex">
            <FormControl fullWidth>
              <Button
                variant="outlined"
                style={{
                  height: 50,
                  backgroundColor: colors.blueAccent[900],
                  color: colors.grey[300],
                  borderColor: colors.grey[500],
                }}
                component="label"
              >
                {blfilename}
                <input
                  type="file"
                  name="blfile"
                  hidden
                  onChange={handleBlfilename}
                />
              </Button>
            </FormControl>
            <FormControl fullWidth>
              <Button
                variant="outlined"
                style={{
                  height: 50,
                  backgroundColor: colors.blueAccent[900],
                  color: colors.grey[300],
                  borderColor: colors.grey[500],
                }}
                component="label"
              >
                {ce_mfilename}
                <input
                  type="file"
                  name="ce_m_file"
                  hidden
                  onChange={handleCeMfile}
                />
              </Button>
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <Button
                variant="outlined"
                style={{
                  height: 50,
                  backgroundColor: colors.blueAccent[900],
                  color: colors.grey[300],
                  borderColor: colors.grey[500],
                }}
                component="label"
              >
                {packlistfile}
                <input
                  type="file"
                  name="packinglist"
                  hidden
                  onChange={handlePacklistfile}
                />
              </Button>
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <Button
                variant="outlined"
                style={{
                  height: 50,
                  backgroundColor: colors.blueAccent[900],
                  color: colors.grey[300],
                  borderColor: colors.grey[500],
                }}
                component="label"
              >
                {afrmmfile}
                <input
                  type="file"
                  name="afrmmfile"
                  hidden
                  onChange={handleAfrmmfile}
                />
              </Button>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={funcclosechange}
            sx={{ color: colors.grey[200] }}
          >
            Cancelar
          </Button>
          <Button type="submit" sx={{ color: colors.grey[200] }}>
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openAlert} 
        autoHideDuration={3000}
        onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NovaCargapopup;
