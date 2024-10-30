import { SLICE_NAME } from "@/constants/slice";
import { AppTypes } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api";
interface InitialState {
     post?: AppTypes.Post;
     loading: {
          [key: string]: boolean;
     }
     error?: string;
}
export const initialState: InitialState = {
     post: undefined,
     loading: {}
}


const getPost = createAsyncThunk(`${SLICE_NAME.POST}/getPost`, async (_, { rejectWithValue }) => {
     const data = await api.getPosts<AppTypes.Post>();
     return data;
})

export const postSlice = createSlice({
     name: SLICE_NAME.POST,
     initialState: initialState,
     reducers: {
    setProduct: (state, { payload }: PayloadAction<AppTypes.Post | undefined>) => {
      state.post = payload
    }
  },
  extraReducers: builder => {
     builder.addCase(getPost.pending, (state, action) => {
          state.loading[getPost.typePrefix] = true;
     })
     builder.addCase(getPost.fulfilled, (state, action) => {
          state.loading[getPost.typePrefix] = false;
          state.post = action.payload.data;
     })
     builder.addCase(getPost.rejected, (state, action) => {
          state.loading[getPost.typePrefix] = false;
          state.error = action.error.message;
     })
  }
})
export default postSlice.reducer;
export const postActions = {
     ...postSlice.actions,
     getPost
}