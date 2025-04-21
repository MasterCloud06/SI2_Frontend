// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Personaliza tu color primario
    },
    secondary: {
      main: '#dc004e', // Personaliza el secundario
    },
    // Puedes añadir más personalización en el palette
  },
  typography: {
    // Ajustes de tipografía si es necesario
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  // Otros ajustes globales
});

export default theme;
