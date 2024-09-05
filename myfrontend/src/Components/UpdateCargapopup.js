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
  import { useNavigate } from "react-router-dom";
  import { useMutation, useQueryClient } from '@tanstack/react-query';
  import axiosConfig from "../axiosConfig";
  
  const apiUrl = "http://127.0.0.1:8000/contractor/";
  
  const UpdateCargapopup = ({ requestData, params }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, openchange] = useState(false);
    const queryClient = useQueryClient();

    // OPCOES FORMULARIO
    const [options, setOptions] = useState([]);
    const [coptions, setCoptions] = useState([]);
    const [value, setValue] = useState(requestData.contractorname || "");
    const [covalue, setCovalue] = useState(requestData.origin || "");
    // MUDANCA DE NOME FILE UPLOADS
    /* const [ce_mfilename, setCe_mfile] = useState(requestData.ce_m_file);
    const [blfilename, setBlfile] = useState(requestData.blfile);
    const [packlistfile, setPackfile] = useState(requestData.packinglist);
    const [afrmmfile, setAfrmmfile] = useState(requestData.afrmmfile);
    // MUDANCA DE NOME FILE UPLOADS
    const handleCeMfile = (event) => setCe_mfile(event.target.files[0]?.name || ce_mfilename);
    const handleBlfilename = (event) => setBlfile(event.target.files[0]?.name || blfilename);
    const handlePacklistfile = (event) => setPackfile(event.target.files[0]?.name || packlistfile);
    const handleAfrmmfile = (event) => setAfrmmfile(event.target.files[0]?.name || afrmmfile); */
    //Alerta de sucesso
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertmessage] = useState("Carga alterada com sucesso!");
    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenAlert(false);
    };
    const handleFileChange = (event) => {
      setOpenAlert(true);
    };
    
    const redirecionar = useNavigate();
  
    const funcopenchange = () => {
      openchange(true);
    };
  
    const funcclosechange = () => {
      openchange(false);
    };

    const funcUpdateCarga = async (event) => {

      event.preventDefault();
    
      const formData = new FormData(event.currentTarget);
    
      const formJson = Object.fromEntries(formData.entries());
    
      formData.append('data', JSON.stringify(formJson)); 
    
    
      try {
    
        const response = await axiosConfig.put(`http://127.0.0.1:8000/cargasinfo/${params.id}/`, formData);
    
        console.log("Success:", response.data);
    
        funcclosechange();
    
        handleFileChange(); 
    
        window.location.reload();
    
      } catch (error) {
    
        console.error("Error:", error);
    
      }
    
    };

    /* const { mutate: updateCarga } = useMutation(
      async (formData) => {
        const response = await fetch(
          `http://127.0.0.1:8000/cargasinfo/${params.id}/`,
          {
            method: "PUT",
            body: formData,
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries("cargasinfo"); // Refetch the main page data
          setOpenAlert(true); // Show success alert
          funcclosechange(); // Close the dialog
          redirecionar('/'); // Redirect or refresh page if needed
        },
        onError: (error) => {
          console.error("Error:", error);
        },
      }
    ); */

    useEffect(() => {

        fetch(`http://127.0.0.1:8000/contractor/`)
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
            Editar
          </Button>
        <Dialog
          open={open}
          fullWidth
          onClose={funcclosechange}
          PaperProps={{
            component: "form",
            encType: "multipart/form-data",
            onSubmit: async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              /* if (ce_mfilename !== requestData.ce_m_file) formData.append('ce_m_file', event.target.ce_m_file.files[0]);
              if (blfilename !== requestData.blfile) formData.append('blfile', event.target.blfile.files[0]);
              if (packlistfile !== requestData.packinglist) formData.append('packinglist', event.target.packinglist.files[0]);
              if (afrmmfile !== requestData.afrmmfile) formData.append('afrmmfile', event.target.afrmmfile.files[0]); */
              const formJson = Object.fromEntries(formData.entries());
              formData.append('data', JSON.stringify(formJson)); //CHECAR ANTES DE PRODUCAO
              try {
                // Use axiosConfig for the PUT request
                const response = await axiosConfig.patch(
                  "cargasinfo/" + params.id + "/",
                  formData
                );
        
                // Handle the success response
                if (response.status === 200) {
                  const responseJson = response.data;
                  console.log("Success:", responseJson);
                  funcclosechange();
                  handleFileChange(); // Handle the file change event
                  window.location.reload();
                } else {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
              } catch (error) {
                // Handle error
                console.error("Error:", error);
              }
            },
              sx: {
                /* backgroundColor: colors.primary[500], */ // Change dialog background color
                color: colors.grey[100], // Change text color inside the dialog
              },
          }}
        >
          <DialogTitle variant="h3" fontWeight="Bold" color={colors.grey[200]}>
            Editar carga
          </DialogTitle>
          <DialogContent>
            <Box marginTop="15px">
              <FormControl fullWidth>
                <InputLabel htmlFor="contractorname">Contratante</InputLabel>
                <Select
                  style={{
                    height: 50,
                    backgroundColor: colors.blueAccent[900],
                    color: colors.grey[200],
/*                     borderRadius: "4px",
                    borderWidth: "1px",
                    borderColor: colors.grey[400], */
                  }}
                  defaultValue={requestData.contractorname}
                  label="Contratante"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircleIcon
                        sx={{ color: colors.grey[300] }}
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
                    color: colors.grey[200],
                    borderRadius: "4px",
                    borderWidth: "1px",
                    borderColor: colors.grey[400],
                  }}
                  defaultValue={requestData.type_of_load}
                  id="type_of_load"
                  name="type_of_load"
                  placeholder="Tipo de carga"
                  startAdornment={
                    <InputAdornment position="start">
                      <ShoppingBagSharpIcon
                        sx={{ color: colors.grey[300] }}
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
                    color: colors.grey[200],
/*                     borderRadius: "4px",
                    borderWidth: "1px",
                    borderColor: colors.grey[400], */
                  }}
                  label="Origem"
                  defaultValue={requestData.origin}
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
                    color: colors.grey[200],
/*                     borderRadius: "4px",
                    borderWidth: "1px",
                    borderColor: colors.grey[400], */
                  }}
                  id="weight"
                  name="weight"
                  defaultValue={requestData.weight}
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
                    color: colors.grey[200],
/*                     borderRadius: "4px",
                    borderWidth: "1px",
                    borderColor: colors.grey[400], */
                  }}
                  id="cost"
                  name="cost"
                  defaultValue={requestData.cost}
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
                    color: colors.grey[200],
/*                     borderRadius: "4px",
                    borderWidth: "1px",
                    borderColor: colors.grey[400], */
                  }}
                  defaultValue={requestData.ce_mercante || ""}
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
          </DialogContent>
          <DialogActions>
            <Button
              onClick={funcclosechange}
              sx={{ color: colors.grey[200] }}
            >
              Cancelar
            </Button>
            <Button type="submit" sx={{ color: colors.grey[200] }}>
              Salvar
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
  
  export default UpdateCargapopup;
  