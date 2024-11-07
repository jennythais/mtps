import { SLICE_NAME } from "@/constants/slice";
import { AppTypes } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api";
interface InitialState {
     posts?: AppTypes.Post[];
     postById?: AppTypes.Post;
     postFilter?: AppTypes.Post[];
     loading: {
          [key: string]: boolean;
     }
     error?: string;
}
export const initialState: InitialState = {
     posts: [],
     postById: undefined,
     postFilter: [],
     loading: {}
}


const getPost = createAsyncThunk(`${SLICE_NAME.POST}/getPost`, async (_, { rejectWithValue }) => {
     const res = await api.getPosts<AppTypes.Post[]>();
     return res;
})
const getPostById  = createAsyncThunk(`${SLICE_NAME.POST}/getPostById`, async (id: string, { rejectWithValue }) => {
     const res = await api.getPostById<AppTypes.Post>(id);
     return res;
})
const getPostByCategory = createAsyncThunk(`${SLICE_NAME.POST}/getPostByCategory`, async (categories: string[]) => {
     const res = await api.getPostByCategory<AppTypes.Post[]>({
          categories
     });
     return res
})
export const postSlice = createSlice({
     name: SLICE_NAME.POST,
     initialState: initialState,
     reducers: {
          setPost: (state, { payload }: PayloadAction<AppTypes.Post[]>) => {
               state.posts = payload
          },
          setPostById: (state, { payload }: PayloadAction<AppTypes.Post>) => {
               state.postById = payload
          },
          setPostFilter: (state, { payload }: PayloadAction<AppTypes.Post[]>) => {
                                   state.postFilter = payload; 
          }
     },
  extraReducers: builder => {
     builder.addCase(getPost.pending, (state, action) => {
          state.loading[getPost.typePrefix] = true;
     })
     builder.addCase(getPost.fulfilled, (state, action) => {
          state.loading[getPost.typePrefix] = false;
          state.posts = action.payload?.data.data;
     })
     builder.addCase(getPost.rejected, (state, action) => {
          state.loading[getPost.typePrefix] = false;
          state.error = action.error.message;
     })
     builder.addCase(getPostById.pending, (state, action) => {
          state.loading[getPostById.typePrefix] = true;
     })
     builder.addCase(getPostById.fulfilled, (state, action) => {
          state.loading[getPostById.typePrefix] = false;
          state.postById = action.payload?.data.data;
     })
     builder.addCase(getPostById.rejected, (state, action) => {
          state.loading[getPostById.typePrefix] = false;
          state.error = action.error.message;
     })
     builder.addCase(getPostByCategory.pending, (state, action) => {
          state.loading[getPostByCategory.typePrefix] = true;
     })
     builder.addCase(getPostByCategory.fulfilled, (state, action) => {
          state.loading[getPostByCategory.typePrefix] = false;
          state.postFilter = action.payload.data.data;
     })
     builder.addCase(getPostByCategory.rejected, (state, action) => {
          state.loading[getPostByCategory.typePrefix] = false;
          state.error = action.error.message;
     })
  }
})
export default postSlice.reducer;
export const postActions = {
     ...postSlice.actions,
     getPost,
     getPostById,
     getPostByCategory
}