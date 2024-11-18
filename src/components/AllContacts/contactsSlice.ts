import { createSlice } from '@reduxjs/toolkit';
import { IAllContactsState } from '../../types.ts';
import { postContactInfo } from './contactsThunks.ts';


interface contactsSliceState{
  contacts:IAllContactsState[],
  fetchLoading:boolean,
  submitLoading:boolean,
}

const initialState:contactsSliceState = {
  contacts: [],
  fetchLoading:false,
  submitLoading:false
}


export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
      .addCase(postContactInfo.pending, state=>{
        state.submitLoading = true;
      })
      .addCase(postContactInfo.fulfilled, state=>{
        state.submitLoading = false;
      })
      .addCase(postContactInfo.rejected, state=>{
        state.submitLoading = false;
      })
  }
})

export const contactsReducer = contactsSlice.reducer
export const {} = contactsSlice.actions
export const {} = contactsSlice.selectors