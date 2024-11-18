import { createSlice } from '@reduxjs/toolkit';
import { IAllContactsState } from '../../types.ts';
import { fetchAllContacts, postContactInfo } from './contactsThunks.ts';


interface contactsSliceState{
  contacts:IAllContactsState[] | null,
  fetchLoading:boolean,
  postLoading:boolean,
}

const initialState:contactsSliceState = {
  contacts: [],
  fetchLoading:false,
  postLoading:false
}


export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
      .addCase(fetchAllContacts.pending, state=>{
        state.fetchLoading = true;
      })
      .addCase(fetchAllContacts.fulfilled, (state, {payload})=>{
        state.fetchLoading = false;
        state.contacts = payload
      })
      .addCase(fetchAllContacts.rejected, state=>{
        state.fetchLoading = false;
      })
    builder
      .addCase(postContactInfo.pending, state=>{
        state.postLoading = true;
      })
      .addCase(postContactInfo.fulfilled, state=>{
        state.postLoading = false;
      })
      .addCase(postContactInfo.rejected, state=>{
        state.postLoading = false;
      })
  },
  selectors:{
    selectAllContacts:(state)=>state.contacts,
    selectFetchLoading: (state)=>state.fetchLoading,
    selectPostLoading:(state)=> state.postLoading
  }
})

export const contactsReducer = contactsSlice.reducer
export const {} = contactsSlice.actions
export const {
  selectAllContacts
  ,selectFetchLoading
  ,selectPostLoading} = contactsSlice.selectors