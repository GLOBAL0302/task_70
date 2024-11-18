import { Box, CircularProgress, Modal } from '@mui/material';
import AllContacts from '../../components/AllContacts/AllContacts.tsx';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ContactForm from '../../components/ContactForm/ContactForm.tsx';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  deleteOneContactById,
  getOneContactById,
  updateOneContactById,
} from '../../components/AllContacts/contactsThunks.ts';
import {
  deleteContactReducer,
  selectFetchLoading,
  selectOneContact,
  updateContactReducer,
} from '../../components/AllContacts/contactsSlice.ts';
import { IContactFormState } from '../../types.ts';

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
  const navigate = useNavigate();
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
  }, [id]);

  const updateContact = async (contact: IContactFormState) => {
    id && (await dispatch(updateOneContactById({ id, contactInfo: contact })));
    dispatch(updateContactReducer({ id, contactInfo: contact }));
    navigate('/');
  };

  const deleteContact = async () => {
    id && (await dispatch(deleteOneContactById(id)));
    dispatch(deleteContactReducer(id));
    navigate('/');
  };

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
          {fetchLoading ? (
            <CircularProgress />
          ) : (
            <>
              {oneContact && (
                <ContactForm
                  updateContact={updateContact}
                  deleteContact={deleteContact}
                  edit={true}
                  contact={oneContact}
                />
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default HomeContainer;
