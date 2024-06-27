import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

export default function CargaAdd() {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
      Carga adicionada com sucesso!
    </Alert>
  );
}
