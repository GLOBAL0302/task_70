import { createAsyncThunk } from '@reduxjs/toolkit';
import { IAllContactsState, IContactApi, IContactFormState } from '../../types.ts';
import { axiosApi } from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const postContactInfo = createAsyncThunk<void, IContactFormState>(
  "postContactInfo",
  async(contactInfo)=>{
    try{
      await axiosApi.post('/contacts.json', contactInfo);
    }catch(error){
      console.error(error);
    }
  }
)

export const fetchAllContacts = createAsyncThunk<IAllContactsState[] | null, void, {state:RootState}>(
  "fetchAllContacts",
  async()=>{
    const {data} = await axiosApi.get<IContactApi | null>("contacts.json");
    if(data){
      return Object.keys(data).map((contact) => {
        return {
          id: contact,
          ...data[contact],
        }
      });
    }
    return null;
  }
)