import { Box, Button, Grid2, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';
import { IContactFormState } from '../../types.ts';
import { useAppDispatch } from '../../app/hooks.ts';
import { postContactInfo } from '../AllContacts/contactsThunks.ts';
import { NavLink, useNavigate } from 'react-router-dom';

const initialState = {
  name:"",
  phone:"",
  mail:"",
  photo:""
}

const ContactForm = () => {
  const [contactInfo, setContactInfo] = useState<IContactFormState>(initialState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInfoChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    const {name, value} = e.target;
    setContactInfo((prevState)=>{
      return{
        ...prevState,
        [name]:value
      }
    })
  }

  const formSubmit = async (e:FormEvent)=>{
    e.preventDefault();
    await dispatch(postContactInfo(contactInfo));
    setContactInfo(initialState);
    navigate('/')
  }

  return (
    <>
      <Typography variant="h6" component='h6' color="textSecondary">
        Add new Contact
      </Typography>
      <Grid2 container component='form' spacing={2} onSubmit={formSubmit}>
        <TextField required type="text" onChange={handleInfoChange} value={contactInfo.name} fullWidth id="name" name='name' label="Name" variant="outlined" />
        <TextField required type="number" onChange={handleInfoChange} value={contactInfo.phone}  fullWidth id="phone" name='phone' label="Phone" variant="outlined" />
        <TextField required type="email" onChange={handleInfoChange}  value={contactInfo.mail}  fullWidth id='mail' name='mail' label="Mail" variant="outlined" />
        <TextField required type="url" onChange={handleInfoChange} value={contactInfo.photo}   fullWidth id='photo' name='photo' label="Photo" variant="outlined" />
        {contactInfo.photo && <Box component='div' textAlign='center'>
          <img
            width="50%"
            src={contactInfo.photo}
            alt="contact photo" />
        </Box>}
        <Grid2 container spacing={2} marginLeft="auto">
          <Button variant="contained" color="success" type="submit">
            Save
          </Button>
         <NavLink to='/'>
           <Button variant="contained" color="warning" type="button">
             Back to Contacts
           </Button>
         </NavLink>
        </Grid2>
      </Grid2>
    </>
  );
};

export default ContactForm;