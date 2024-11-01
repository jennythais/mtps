import api from "@/api";
import { SLICE_NAME } from "@/constants/slice";
import { AppTypes } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MeState{ 
     user?: AppTypes.User;
     loading: {[x: string]: boolean};
     error?: string;
}
export const initialState: MeState = {
     user: undefined,
     loading: {}
}
const getUser = createAsyncThunk(`${SLICE_NAME.ME}/getUser`, async (_,{rejectWithValue}) => {
     const data = await api.getProfile<AppTypes.User>();
     return data;
})
export const userSlice = createSlice({
     name: SLICE_NAME.ME,
     initialState: initialState,
     reducers: {
          setUser: (state, {payload}: PayloadAction<AppTypes.User | undefined>) => {
               state.user = payload
          }
     },
     extraReducers: builder => {
          builder.addCase(getUser.pending, (state, action) => {
               state.loading[getUser.typePrefix] = true;
          })
          builder.addCase(getUser.fulfilled, (state, action) => {
               state.loading[getUser.typePrefix] = false;
               state.user = action.payload.data;
          })
          builder.addCase(getUser.rejected, (state, action) => {
               state.loading[getUser.typePrefix] = false;
               state.error = action.error.message;
          })
     }
})
export default userSlice.reducer;
export const userActions = {
     ...userSlice.actions,
     getUser
}