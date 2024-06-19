import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, colors } from "@mui/material";
import { useState } from "react";
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

const NovaCargapopup = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, openchange] = useState(false);
    
    const funcopenchange = () => {
        openchange(true);
    }
    
    const funcclosechange = () => {
        openchange(false);
    }

    return (
        <div>
            <Button onClick={funcopenchange} sx={{backgroundColor: colors.blueAccent[700], fontSize: "14px", fontWeight: "bold", padding: "10px 20px", alignItems: "center", display: "flex" , justifyContent: "center", color: colors.grey[100]}}>Nova carga</Button>
            <Dialog open={open} fullWidth onClose={funcclosechange} sx={colors.primary[500]} PaperProps={{
                component: 'form',
                onSubmit: async (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    try {
                        const response = await fetch('http://0.0.0.0:8000/cargasinfo/', {
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
                        
/*                         setTimeout(() => {
                            window.location.reload();
                        }, 1000); */
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
                            <OutlinedInput
                                id="contractorname"
                                name="contractorname"
                                placeholder="Nome da empresa"
                                startAdornment={<InputAdornment position="start"><ApartmentSharpIcon sx={{color: colors.greenAccent[500]}}/></InputAdornment>}
                                label="Contratante"
                            />
                        </FormControl>
                    </Box>
                    <Box marginTop="25px">
                        <FormControl fullWidth>
                            <InputLabel htmlFor="type_of_load">Tipo de Carga</InputLabel>
                            <OutlinedInput
                                id="type_of_load"
                                name="type_of_load"
                                placeholder="Tipo de carga"
                                startAdornment={<InputAdornment position="start"><ShoppingBagSharpIcon sx={{color: colors.greenAccent[500]}}/></InputAdornment>}
                                label="Tipo de Carga"
                            />
                        </FormControl>
                    </Box>
                    <Box marginTop="25px" display="flex" justifyContent="space-between">
                        <FormControl fullWidth>
                            <InputLabel htmlFor="origin">Origem</InputLabel>
                            <OutlinedInput
                                id="origin"
                                name="origin"
                                startAdornment={<InputAdornment position="start"><LanguageSharpIcon sx={{color: colors.greenAccent[500]}}/></InputAdornment>}
                                label="Origem"
                                placeholder="CN - China"
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="destination">Destino</InputLabel>
                            <OutlinedInput
                                id="destination"
                                name="destination"
                                startAdornment={<InputAdornment position="start"><LanguageSharpIcon sx={{color: colors.greenAccent[500]}}/></InputAdornment>}
                                label="Destino"
                                placeholder="BR - Brasil"
                            />
                        </FormControl>
                    </Box>
                    <Box marginTop="25px">
                        <FormControl fullWidth>
                            <InputLabel htmlFor="weight">Peso</InputLabel>
                            <OutlinedInput
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
