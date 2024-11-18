import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { fetchAllContacts } from './contactsThunks.ts';
import { selectAllContacts, selectFetchLoading } from './contactsSlice.ts';
import { Box, CircularProgress, Grid2 } from '@mui/material';
import OneContact from './OneContact.tsx';

const AllContacts = () => {
  const dispatch = useAppDispatch();
  const allContacts = useAppSelector(selectAllContacts);
  const fetchLoading = useAppSelector(selectFetchLoading);

  const fetchContacts = useCallback(async () => {
    await dispatch(fetchAllContacts());
  }, [dispatch]);

  useEffect(() => {
    void fetchContacts();
  }, [fetchContacts, dispatch]);

  return (
    <>
      {fetchLoading ? (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid2>{allContacts && allContacts.map((contact) => <OneContact key={contact.id} contact={contact} />)}</Grid2>
      )}
    </>
  );
};

export default AllContacts;
