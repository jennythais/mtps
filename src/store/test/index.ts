import api from "@/api";
import { SLICE_NAME } from "@/constants/slice";
import { AppTypes } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
     testByPostId?: AppTypes.Test
     loading: {
          [key: string]: boolean;
     }
     error?: string;
}
export const initialState: InitialState = {
     testByPostId: undefined,
     loading: {}
}
const getTestByPostId = createAsyncThunk(`${SLICE_NAME.TEST}/getTestByPostId`, async (form: {postId: string}, { rejectWithValue }) => {
     const res = await api.getTestById<AppTypes.Test>(form);
     console.log(res);
     return res;

})
export const testSlice = createSlice({
     name: SLICE_NAME.TEST,
     initialState: initialState,
     reducers: {
          setTestByPostId: (state, { payload }: { payload: AppTypes.Test }) => {
               state.testByPostId = payload
          }
     },
     extraReducers: builder => {
          builder.addCase(getTestByPostId.pending, (state) => {
               state.loading.getTestByPostId = true;
          })
          builder.addCase(getTestByPostId.fulfilled, (state, { payload }) => {
               state.testByPostId = payload.data.data;
               state.loading.getTestByPostId = false;
          })
          builder.addCase(getTestByPostId.rejected, (state, { payload }) => {
               state.error = payload as string;
               state.loading.getTestByPostId = false;
          })
     }
})

export default testSlice.reducer;
export const testActions = {
     ...testSlice.actions,
     getTestByPostId
}
