import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, colors, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/system";
import { tokens } from "../theme";
import React from "react";
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ApartmentSharpIcon from '@mui/icons-material/ApartmentSharp';
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
import ShoppingBagSharpIcon from '@mui/icons-material/ShoppingBagSharp';
import ScaleSharpIcon from '@mui/icons-material/ScaleSharp';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import AssuredWorkloadSharpIcon from '@mui/icons-material/AssuredWorkloadSharp';
import PublicIcon from '@mui/icons-material/Public';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";


const apiUrl = "http://127.0.0.1:8000/contractor/"; 

const NovaCargapopup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, openchange] = useState(false);
  // OPCOES FORMULARIO
  const [options, setOptions] = useState([]);
  const [coptions, setCoptions] = useState([])

  const [value, setValue] = useState("");
  const [covalue, setCovalue] = useState("");
  const [countryid, setCountryid] = useState(""); // Initialize countryid with an empty string
  const [countryid2, setCountryid2] = useState(""); // Initialize countryid2 with an empty string
  const [countriesList, setCountriesList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [languageList, setLanguageList] = useState([]);


  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
      setCountryList(result);
    });

    GetLanguages().then((result) => {
      setLanguageList(result);
    });

    fetch('http://127.0.0.1:8000/contractor/')
     .then(response => response.json())
     .then(data => {
        const contractors = data.results;
        setOptions(contractors.map((contractor) => ({ id: contractor.id, name: contractor.name })));
      })
     .catch(error => console.error('Error fetching data:', error));

    fetch('http://127.0.0.1:8000/country/')
     .then(response => response.json())
     .then(data => {
      const countries = data.results;
      setCoptions(countries.map((country) => ({ id: country.id, name: country.name })));
      })
    .catch(error => console.error('Error fetching data:', error));
  }, []);


  const funcopenchange = () => {
    openchange(true);
  }
  
  const funcclosechange = () => {
    openchange(false);
  }

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountryid(selectedCountry);
    const countryorigin = countriesList.find((country) => country.iso2 === selectedCountry);
    if (countryorigin) {
        GetState(countryorigin.iso2).then((result) => {
            setStateList(result);
        });
        }
    }

  const handleCountryChange2 = (e) => {
    const country = countryList.find((country) => country.iso2 === e.target.value);

    if (country && countryid2 === "") {
      setCountryid2(country.iso2);

      GetState(country.iso2).then((result) => {
        setStateList(result);
      });
    }
  }

  return (
    <div>
      <Button onClick={funcopenchange} sx={{backgroundColor: colors.blueAccent[700], fontSize: "14px", fontWeight: "bold", padding: "10px 20px", alignItems: "center", display: "flex", justifyContent: "center", color: colors.grey[100]}}>Nova carga</Button>
      <Dialog open={open} fullWidth onClose={funcclosechange} sx={colors.primary[500]} PaperProps={{
        component: 'form',
        onSubmit: async (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          console.log(formJson)
          try {
            const response = await fetch('http://127.0.0.1:8000/cargasinfo/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formJson),
            });
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
           const responseJson = await response.json();
            console.log('Success:', responseJson);
            funcclosechange(); // Close the dialog if the request was successful
            window.location.reload();
          } catch (error) {
            console.error('Error:', error);
          }
        },
      }}>
        <DialogTitle variant="h3" fontWeight="Bold" color={colors.grey[100]}>Registrar nova carga</DialogTitle>
        <DialogContent>
          <Box marginTop="15px">
            <FormControl fullWidth>
              <InputLabel htmlFor="contractorname">Contratante</InputLabel>
              <Select
                style={{ height: 50, backgroundColor: colors.grey[700], color: colors.grey[300], borderRadius: "4px", borderWidth: "1px", borderColor: colors.grey[400] }}
                value={value}
                label="Contratante"
                startAdornment={<InputAdornment position="start"><AccountCircleIcon sx={{color: colors.greenAccent[500]}}/></InputAdornment>}
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
                style={{ height: 50, backgroundColor: colors.grey[700], color: colors.grey[300], borderRadius: "4px", borderWidth: "1px", borderColor: colors.grey[400] }}
                id="type_of_load"
                name="type_of_load"
                placeholder="Tipo de carga"
                startAdornment={<InputAdornment position="start"><ShoppingBagSharpIcon sx={{color: colors.greenAccent[500]}}/></InputAdornment>}
                label="Tipo de Carga"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="origin">Origem</InputLabel>
              <Select
                style={{ height: 50, backgroundColor: colors.grey[700], color: colors.grey[300], borderRadius: "4px", borderWidth: "1px", borderColor: colors.grey[400] }}
                value={covalue}
                label="Origem"
                startAdornment={<InputAdornment position="start"><PublicIcon sx={{color: colors.greenAccent[500]}}/></InputAdornment>}
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
                style={{ height: 50, backgroundColor: colors.grey[700], color: colors.grey[300], borderRadius: "4px", borderWidth: "1px", borderColor: colors.grey[400] }}
                id="weight"
                name="weight"
                placeholder="Kg"
                startAdornment={<InputAdornment position="start"><ScaleSharpIcon sx={{color: colors.greenAccent[500]}}/></InputAdornment>}
                label="Peso"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="cost">Custo</InputLabel>
              <OutlinedInput
                style={{ height: 50, backgroundColor: colors.grey[700], color: colors.grey[300], borderRadius: "4px", borderWidth: "1px", borderColor: colors.grey[400] }}
                id="cost"
                name="cost"
                startAdornment={<InputAdornment position="start"><AttachMoneySharpIcon sx={{color: colors.greenAccent[500]}}/></InputAdornment>}
                label="Custo"
              />
            </FormControl>
          </Box>
          <Box marginTop="25px">
            <FormControl fullWidth>
              <InputLabel htmlFor="ce_mercante">CE MERCANTE</InputLabel>
              <OutlinedInput
                style={{ height: 50, backgroundColor: colors.grey[700], color: colors.grey[300], borderRadius: "4px", borderWidth: "1px", borderColor: colors.grey[400] }}
                id="ce_mercante"
                name="ce_mercante"
                startAdornment={<InputAdornment position="start"><AssuredWorkloadSharpIcon sx={{color: colors.greenAccent[500]}}/></InputAdornment>}
                label="CE MERCANTE"
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={funcclosechange} sx={{color: colors.greenAccent[500]}}>Cancelar</Button>
          <Button type="submit" sx={{color: colors.greenAccent[500]}}>Cadastrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NovaCargapopup;