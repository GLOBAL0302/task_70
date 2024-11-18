import { Grid2, Typography } from '@mui/material';
import { IAllContactsState } from '../../types.ts';
import {NavLink } from 'react-router-dom';

interface Props{
  contact:IAllContactsState
}

const OneContact:React.FC<Props> = ({contact}) => {
  return (
    <NavLink to={`/${contact.id}`}>
      <Grid2
        marginBottom={2}
        container
        alignItems='center' gap={2}
        padding={1}
        sx={{border:'2px solid grey'}}
      >
        <Grid2>
          <img style={{borderRadius:'30%'}} width={200} src={`${contact.photo}`} alt="contactImg" />
        </Grid2>
        <Grid2 marginLeft={2}>
          <Typography component="p" variant="h5">
            <strong>{contact.name}</strong>
          </Typography>
        </Grid2>
      </Grid2>
    </NavLink>
  );
};

export default OneContact;