import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Container, AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* AppBar (Barra superior) */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer (barra lateral) */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <Toolbar />
        <List>
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Usuarios" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Configuración" />
          </ListItem>
        </List>
      </Drawer>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          marginLeft: isDrawerOpen ? 240 : 0, // Desplaza el contenido si el drawer está abierto
          transition: 'margin 0.3s',
        }}
      >
        <Toolbar />
        <Container>
          <Typography variant="h4" gutterBottom>
            Bienvenido al Dashboard
          </Typography>
          <Typography variant="body1">
            Este es un contenido básico. Puedes agregar más componentes o información aquí.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
