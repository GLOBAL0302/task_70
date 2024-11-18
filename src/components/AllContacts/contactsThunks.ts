import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAllContactsState, IContactApi, IContactFormState } from '../../types.ts';
import { axiosApi } from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const postContactInfo = createAsyncThunk<void, IContactFormState>('postContactInfo', async (contactInfo) => {
  try {
    await axiosApi.post('/contacts.json', contactInfo);
  } catch (error) {
    console.error(error);
  }
});

export const fetchAllContacts = createAsyncThunk<IAllContactsState[] | null, void, { state: RootState }>(
  'fetchAllContacts',
  async () => {
    const { data } = await axiosApi.get<IContactApi | null>('contacts.json');
    if (data) {
      return Object.keys(data).map((contact) => {
        return {
          id: contact,
          ...data[contact],
        };
      });
    }
    return null;
  },
);

export const getOneContactById = createAsyncThunk<IContactFormState | null, string>(
  'getOneContactById',
  async (contactId) => {
    const { data } = await axiosApi.get(`contacts/${contactId}.json`);
    return data;
  },
);

export const deleteOneContactById = createAsyncThunk<void, string>('deleteOneContactById', async (contactId) => {
  await axiosApi.delete(`contacts/${contactId}.json`);
});

export const updateOneContactById = createAsyncThunk<void, { id: string; contactInfo: IContactFormState }>(
  'updateOneContactById',
  async ({ id, contactInfo }) => {
    await axiosApi.put(`contacts/${id}.json`, contactInfo);
  },
);
