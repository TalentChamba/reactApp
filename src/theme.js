import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue
    },
    secondary: {
      main: '#dc004e', // Red
    },
    background: {
      default: '#f5f5f5', // Light Gray
    },
  },
  typography: {
    h4: {
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          color: '#1976d2',
          '&:hover': {
            color: '#115293',
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#1976d2',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
            padding: '6px 45px',
            borderRadius: '25px',
            background: 'linear-gradient(to bottom, #e1e1e1 0%, #b7b7b7 100%)',
            border: '3px solid #ccc',
            boxShadow: '0 1px 2px #fff, 0 -1px 1px #666, inset 0 -1px 1px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.8)',
            textShadow: '0 1px 2px #fff',
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: '#5b5b5b',
        },
      },
    },
  },
});

export default theme;
