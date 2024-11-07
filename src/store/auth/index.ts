import api from "@/api";
import { SLICE_NAME } from "@/constants/slice";
import { AppTypes } from "@/types";
import { setTokenCookie } from "@/utils/token";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface AuthState {
     loading: {[x: string]: boolean};
}
export const initialState: AuthState = {
     loading: {}
}
const login = createAsyncThunk(`${SLICE_NAME.AUTH}/login`, async(form: AppTypes.LoginRequest ) => {
     const res = await api.login<AppTypes.LoginResponse>(form);
     return res
})
const logout = createAsyncThunk(`${SLICE_NAME.AUTH}/logout`, async() => {
     const res = await api.logout();
     return res
})
const forgotPassword = createAsyncThunk(`${SLICE_NAME.AUTH}/forgotPassword`, async(form: AppTypes.EmailRequest ) => {
     const res = await api.forgotPassword<AppTypes.EmailRequest>(form);
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
               setTokenCookie(payload.data.data.token.accessToken)
          })
          builder.addCase(login.rejected, (state, {payload}) => {
               state.loading[login.typePrefix] = false
          })
          builder.addCase(logout.pending, (state, {payload}) => {
               state.loading[logout.typePrefix] = true
          })
          builder.addCase(logout.fulfilled, (state, {payload}) => {
               state.loading[logout.typePrefix] = false
               setTokenCookie('')
          })
          builder.addCase(logout.rejected, (state, {payload}) => {
               state.loading[logout.typePrefix] = false
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

     }
})
export default authSlice.reducer
export const authActions = {
    ...authSlice.actions,
     login,
     logout,
     forgotPassword,

}