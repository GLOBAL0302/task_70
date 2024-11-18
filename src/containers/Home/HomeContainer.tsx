import { Box, CircularProgress, Modal } from '@mui/material';
import AllContacts from '../../components/AllContacts/AllContacts.tsx';
import { NavLink, useParams } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { getOneContactById } from '../../components/AllContacts/contactsThunks.ts';
import { selectFetchLoading, selectOneContact } from '../../components/AllContacts/contactsSlice.ts';

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

interface IProps {
  contactSelected?: boolean;
}

const HomeContainer: React.FC<IProps> = ({ contactSelected = false }) => {
  const [_modal, setModal] = useState(contactSelected);
  const dispatch = useAppDispatch();
  const oneContact = useAppSelector(selectOneContact);
  const fetchLoading = useAppSelector(selectFetchLoading);
  const { id } = useParams();
  const fetchOneContact = useCallback(async () => {
    if (id) await dispatch(getOneContactById(id));
  }, [id]);

  const handleModal = () => {
    setModal((prev) => !prev);
  };

  useEffect(() => {
    void fetchOneContact();
    console.log(oneContact);
  }, [id]);

  console.log(oneContact);
  return (
    <Box component="div">
      <AllContacts />
      <Modal
        open={contactSelected}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box textAlign="right">
            <NavLink to="/">
              <HighlightOffIcon fontSize="large" />
            </NavLink>
          </Box>
          {fetchLoading ? <CircularProgress /> : <>{oneContact && <ContactForm edit={true} contact={oneContact} />}</>}
        </Box>
      </Modal>
    </Box>
  );
};

export default HomeContainer;
