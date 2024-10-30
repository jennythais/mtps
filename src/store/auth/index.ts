import api from "@/api";
import { SLICE_NAME } from "@/constants/slice";
import { AppTypes } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
     loading: {[x: string]: boolean};
}
export const initialState: AuthState = {
     loading: {}
}
const login = createAsyncThunk(`${SLICE_NAME.AUTH}/login`, async(form: AppTypes.LoginRequest ) => {
     const res = await api.login<AppTypes.LoginRequest>(form);
     return res
})
const forgotPassword = createAsyncThunk(`${SLICE_NAME.AUTH}/forgotPassword`, async(form: AppTypes.EmailRequest ) => {
     const res = await api.forgotPassword<AppTypes.EmailRequest>(form);
     return res
})
const resetPassword = createAsyncThunk(`${SLICE_NAME.AUTH}/resetPassword`, async(form: AppTypes.ResetPasswordRequest ) => {
     const res = await api.resetPassword<AppTypes.ResetPasswordRequest>(form);
     return res
})
const changePassword = createAsyncThunk(`${SLICE_NAME.AUTH}/changePassword`, async(form: AppTypes.ChangePasswordRequest ) => {
     const res = await api.changePassword<AppTypes.ChangePasswordRequest>(form);
     return res
})
const authSlice = createSlice({
     name: SLICE_NAME.AUTH,
     initialState: initialState,
     reducers: {},
     extraReducers: builder => {
          builder.addCase(login.pending, (state, {payload}) => {
               state.loading[login.typePrefix] = true
          })
          builder.addCase(login.fulfilled, (state, {payload}) => {
               state.loading[login.typePrefix] = false
          })
          builder.addCase(login.rejected, (state, {payload}) => {
               state.loading[login.typePrefix] = false
          })
          builder.addCase(forgotPassword.pending, (state, {payload}) => {
               state.loading[forgotPassword.typePrefix] = true
          })
          builder.addCase(forgotPassword.fulfilled, (state, {payload}) => {
               state.loading[forgotPassword.typePrefix] = false
          })
          builder.addCase(forgotPassword.rejected, (state, {payload}) => {
               state.loading[forgotPassword.typePrefix] = false
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
export default authSlice.reducer
export const authActions = {
    ...authSlice.actions,
     login,
     forgotPassword,
     changePassword,
     resetPassword
}