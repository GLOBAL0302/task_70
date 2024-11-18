import { createAsyncThunk } from '@reduxjs/toolkit';
import { IContactFormState } from '../../types.ts';
import { axiosApi } from '../../axiosApi.ts';

export const postContactInfo = createAsyncThunk<void, IContactFormState>(
  "postContactInfo",
  async(contactInfo)=>{
    await axiosApi.post('/contacts.json', contactInfo);
  }
)