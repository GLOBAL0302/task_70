import { AppBar, Grid2, Toolbar, Typography } from '@mui/material';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <AppBar sx={{ marginBottom: 2 }} position="static">
      <Toolbar>
        <Grid2 width={'100%'} container flexDirection={'row'} alignItems={'center'}>
          <Grid2
            borderRadius={5}
            padding={1}
            sx={{
              border: '1px solid white',
            }}
          >
            <NavLink to="/">
              <Grid2 display={'flex'} alignItems={'center'} gap={2}>
                <ContactPhoneIcon fontSize="large" />
                <Typography variant="h5" component="h5" sx={{ flexGrow: 1 }}>
                  Contacts
                </Typography>
              </Grid2>
            </NavLink>
          </Grid2>
          <Grid2
            borderRadius={5}
            padding={1}
            gap={1}
            sx={{
              marginLeft: 'auto',
              border: '1px solid white',
            }}
          >
            <NavLink to="/addContact">
              <Grid2 container spacing={2} alignItems={'center'}>
                <Typography variant="h6" component="h6">
                  Add Contacts
                </Typography>
                <GroupAddIcon />
              </Grid2>
            </NavLink>
          </Grid2>
        </Grid2>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
