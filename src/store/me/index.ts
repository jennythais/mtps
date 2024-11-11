import api from "@/api";
import { SLICE_NAME } from "@/constants/slice";
import { AppTypes } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MeState{ 
     user?: AppTypes.User;
     loading: {[x: string]: boolean};
     error?: string;
     userPoint?: AppTypes.PointCategory;
}
export const initialState: MeState = {
     user: undefined,
     loading: {}
}
const getUser = createAsyncThunk(`${SLICE_NAME.ME}/getUser`, async (_,{rejectWithValue}) => {
     const data = await api.getProfile<AppTypes.User>();
     return data;

})
const getPoint = createAsyncThunk(`${SLICE_NAME.ME}/getPoint`, async (form: {id: string}) => {
     const data = await api.pointCategory<AppTypes.PointCategory>(form);
     return data;
})
const resetPassword = createAsyncThunk(`${SLICE_NAME.AUTH}/resetPassword`, async(form: AppTypes.ResetPasswordRequest ) => {
     const res = await api.resetPassword<AppTypes.ResetPasswordRequest>(form);
     return res
})
const changePassword = createAsyncThunk(`${SLICE_NAME.AUTH}/changePassword`, async(form: AppTypes.ChangePasswordRequest ) => {
     const res = await api.changePassword<AppTypes.ChangePasswordRequest>(form);
     return res
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
               state.user = action.payload.data.data;
          })
          builder.addCase(getUser.rejected, (state, action) => {
               state.loading[getUser.typePrefix] = false;
               state.error = action.error.message;
          })
          builder.addCase(getPoint.pending, (state, action) => {
               state.loading[getPoint.typePrefix] = true;
          })
          builder.addCase(getPoint.fulfilled, (state, action) => {
               state.loading[getPoint.typePrefix] = false;
               state.userPoint = action.payload.data.data;
          })
          builder.addCase(getPoint.rejected, (state, action) => {
               state.loading[getPoint.typePrefix] = false;
               state.error = action.error.message;
          })
          builder.addCase(changePassword.pending, (state, {payload}) => {
               state.loading[changePassword.typePrefix] = true
          })
          builder.addCase(changePassword.fulfilled, (state, {payload}) => {
               state.loading[changePassword.typePrefix] = false
          })
          builder.addCase(changePassword.rejected, (state, {payload}) => {
               state.loading[changePassword.typePrefix] = false
          })
            builder.addCase(resetPassword.pending, (state, {payload}) => {
               state.loading[changePassword.typePrefix] = true
          })
          builder.addCase(resetPassword.fulfilled, (state, {payload}) => {
               state.loading[changePassword.typePrefix] = false
          })
          builder.addCase(resetPassword.rejected, (state, {payload}) => {
               state.loading[changePassword.typePrefix] = false
          })
     }
})
export default userSlice.reducer;
export const userActions = {
     ...userSlice.actions,
     getUser,
     getPoint,
     changePassword,
     resetPassword
}