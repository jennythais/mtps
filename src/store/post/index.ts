import { SLICE_NAME } from "@/constants/slice";
import { AppTypes } from "@/types";
import { createAsyncThunk, createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import api from "@/api";
const postAdapter = createEntityAdapter<AppTypes.Post, string>({
     selectId: post => post.id
})
interface InitialState {
     posts?: AppTypes.Post[];
     postsEntity: EntityState<AppTypes.Post, string>;

     postsAssistant?: AppTypes.Post[];
     postById?: AppTypes.Post;
     postJoin?: AppTypes.Post;
     postFilter?: AppTypes.Post[];
     loading: {
          [key: string]: boolean;
     }
     error?: string;
}
export const initialState: InitialState = {
     posts: undefined,
     postsEntity: postAdapter.getInitialState(),
     postById: undefined,
     postFilter: [],
     postsAssistant: [],
     loading: {}
}


const getPost = createAsyncThunk(`${SLICE_NAME.POST}/getPost`, async (_, { rejectWithValue }) => {
     const res = await api.getPosts<AppTypes.Post[]>();
     return res;
})
const getPostAssistant = createAsyncThunk(`${SLICE_NAME.POST}/getPostAssistant`, async (_, { rejectWithValue }) => {
     const res = await api.getPostsAssistant<AppTypes.Post[]>();
     return res;
})
const getPostById  = createAsyncThunk(`${SLICE_NAME.POST}/getPostById`, async (postID: string, { rejectWithValue }) => {
     const res = await api.getPostById<AppTypes.Post>({postID});
     return res;
})
const getPostByCategory = createAsyncThunk(`${SLICE_NAME.POST}/getPostByCategory`, async (categories: string[]) => {
     const res = await api.getPostByCategory<AppTypes.Post[]>({
          categories
     });
     return res
})
const joinPost = createAsyncThunk(`${SLICE_NAME.POST}/joinPost`, async (form: AppTypes.JoinPostRequest ) => {
     const res = await api.joinPost<AppTypes.JoinPostRequest>(form);
     return res
})
const updatePost = createAsyncThunk(`${SLICE_NAME.POST}/updatePost`, async (form: AppTypes.UpdatePostRequest) => {
     const res = await api.updatePost<AppTypes.UpdatePostRequest>(form);
     return res
})
const checkAttendees = createAsyncThunk(`${SLICE_NAME.POST}/checkAttendees`, async (form: {studentId: string, postId: string}) => {
     const res = await api.checkAttendance(form);
     return res
})
const createPost = createAsyncThunk(`${SLICE_NAME.POST}/createPost`, async (form: AppTypes.CreatePostRequest, {rejectWithValue}) => {
     try {
          const res = await api.createPost<AppTypes.CreatePostRequest>(form);
          return res
     } catch (error) {
          return rejectWithValue(error)  
     }
})
export const postSlice = createSlice({
     name: SLICE_NAME.POST,
     initialState: initialState,
     reducers: {
          setPost: (state, { payload }: PayloadAction<AppTypes.Post[]>) => {
               state.posts = payload
          },
          setPostAssistant: (state, { payload }: PayloadAction<AppTypes.Post[]>) => {
               state.postsAssistant = payload
          },
          setPostById: (state, { payload }: PayloadAction<AppTypes.Post>) => {
               state.postById = payload
          },
          setPostFilter: (state, { payload }: PayloadAction<AppTypes.Post[]>) => {
               state.postFilter = payload; 
          },

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
     builder.addCase(getPostAssistant.pending, (state, action) => {
          state.loading[getPostAssistant.typePrefix] = true;
     })
     builder.addCase(getPostAssistant.fulfilled, (state, action) => {
          state.loading[getPostAssistant.typePrefix] = false;
          state.postsAssistant = action.payload?.data.data;
     })
     builder.addCase(getPostAssistant.rejected, (state, action) => {
          state.loading[getPostAssistant.typePrefix] = false;
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
     builder.addCase(joinPost.pending, (state, action) => {
          state.loading[joinPost.typePrefix] = true;
     })
     builder.addCase(joinPost.fulfilled, (state, action) => {
          state.loading[joinPost.typePrefix] = false;
     })
     builder.addCase(joinPost.rejected, (state, action) => {
          state.loading[joinPost.typePrefix] = false;
          state.error = action.error.message;     
     })   
     builder.addCase(updatePost.pending, (state, action) => {
          state.loading[updatePost.typePrefix] = true;
     })
     builder.addCase(updatePost.fulfilled, (state, action) => {
          state.loading[updatePost.typePrefix] = false;
     })
     builder.addCase(updatePost.rejected, (state, action) => {
          state.loading[updatePost.typePrefix] = false;
          state.error = action.error.message;
     })
     builder.addCase(checkAttendees.pending, (state, action) => {
          state.loading[checkAttendees.typePrefix] = true;
     })
     builder.addCase(checkAttendees.fulfilled, (state, action) => {
          state.loading[checkAttendees.typePrefix] = false;
     })
     builder.addCase(checkAttendees.rejected, (state, action) => {
          state.loading[checkAttendees.typePrefix] = false;
          state.error = action.error.message;
     })
     builder.addCase(createPost.pending, (state, action) => {
          state.loading[createPost.typePrefix] = true;
     })
     builder.addCase(createPost.fulfilled, (state, action) => {
          state.loading[createPost.typePrefix] = false;
     })
     builder.addCase(createPost.rejected, (state, action) => {
          state.loading[createPost.typePrefix] = false;
          state.error = action.error.message;
     })
  }
})
export default postSlice.reducer;
export const postActions = {
     ...postSlice.actions,
     getPost,
     getPostAssistant,
     getPostById,
     getPostByCategory,
     joinPost,
     updatePost,
     checkAttendees,
     createPost
}