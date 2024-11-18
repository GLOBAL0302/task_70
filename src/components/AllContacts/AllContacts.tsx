import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect, useState } from 'react';
import { fetchAllContacts } from './contactsThunks.ts';
import { selectAllContacts, selectFetchLoading } from './contactsSlice.ts';
import { Box, CircularProgress, Grid2, Modal } from '@mui/material';
import OneContact from './OneContact.tsx';
import { NavLink, useParams } from 'react-router-dom';
import ContactForm from '../ContactForm/ContactForm.tsx';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props{
  contactSelected?:boolean
}

const AllContacts:React.FC<Props> = ({contactSelected = false}) => {
  const dispatch = useAppDispatch();
  const allContacts = useAppSelector(selectAllContacts);
  const fetchLoading = useAppSelector(selectFetchLoading);
  const [modal, setModal] = useState(contactSelected);

  const {id} = useParams();

  const fetchContacts = useCallback(async () => {
    await dispatch(fetchAllContacts())
  }, [dispatch])

  useEffect(() => {
    void fetchContacts();
  }, [fetchContacts, dispatch]);

  const handleModal = ()=>{
    setModal((prev) => !prev);
  }

  return (
    <>
      {fetchLoading ? <Box textAlign="center"><CircularProgress/></Box>:<Grid2>
        {allContacts && allContacts.map((contact)=>(
          <OneContact key={contact.id} contact={contact}/>
        ))}
      </Grid2>}
      <Modal
        open={contactSelected}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box textAlign="right">
            <NavLink to='/'>
              <HighlightOffIcon fontSize="large"/>
            </NavLink>
          </Box>
          <ContactForm/>
        </Box>
      </Modal>
    </>
  );
};

export default AllContacts;