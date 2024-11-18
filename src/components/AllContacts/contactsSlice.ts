import { createSlice } from '@reduxjs/toolkit';
import { IAllContactsState, IContactFormState } from '../../types.ts';
import { fetchAllContacts, getOneContactById, postContactInfo } from './contactsThunks.ts';

interface contactsSliceState {
  contacts: IAllContactsState[] | null;
  oneContact: IContactFormState | null;
  fetchLoading: boolean;
  postLoading: boolean;
}

const initialState: contactsSliceState = {
  contacts: [],
  oneContact: null,
  fetchLoading: false,
  postLoading: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    deleteContactReducer: (state, { payload }) => {
      state.contacts = state.contacts && state.contacts.filter((contact) => contact.id !== payload);
    },
    updateContactReducer: (state, { payload }) => {
      state.contacts =
        state.contacts &&
        state.contacts.map((contact) => {
          if (contact.id === payload.id) {
            return {
              id: payload.id,
              ...payload.contactInfo,
            };
          }
          return contact;
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContacts.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAllContacts.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.contacts = payload;
      })
      .addCase(fetchAllContacts.rejected, (state) => {
        state.fetchLoading = false;
      });
    builder
      .addCase(postContactInfo.pending, (state) => {
        state.postLoading = true;
      })
      .addCase(postContactInfo.fulfilled, (state) => {
        state.postLoading = false;
      })
      .addCase(postContactInfo.rejected, (state) => {
        state.postLoading = false;
      });
    builder
      .addCase(getOneContactById.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(getOneContactById.fulfilled, (state, { payload }) => {
        state.fetchLoading = false;
        state.oneContact = payload;
      })
      .addCase(getOneContactById.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
  selectors: {
    selectAllContacts: (state) => state.contacts,
    selectFetchLoading: (state) => state.fetchLoading,
    selectPostLoading: (state) => state.postLoading,
    selectOneContact: (state) => state.oneContact,
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { deleteContactReducer, updateContactReducer } = contactsSlice.actions;
export const { selectAllContacts, selectFetchLoading, selectPostLoading, selectOneContact } = contactsSlice.selectors;
