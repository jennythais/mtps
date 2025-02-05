import api from "@/api";
import { SLICE_NAME } from "@/constants/slice";
import { AppTypes } from "@/types";
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
// const AssistantAdapter = createEntityAdapter<AppTypes.Student>({
//   selectId: 
// });

interface InitialState {
  students?: AppTypes.Student[];
  studentsByFaculty?: AppTypes.Student[];
  loading: {
    [key: string]: boolean;
  }
  error?: string;
}

export const initialState: InitialState = {
  students: [],
  loading: {}
}

const getStudents = createAsyncThunk(`${SLICE_NAME.ASSISTANT}/getStudents`, async (payload: {
  studentId?: string
  faculty?: string
}) => {
  const res = await api.getStudents<AppTypes.Student[]>(payload);
  return res
})
const getStudentsByFaculty = createAsyncThunk(`${SLICE_NAME.ASSISTANT}/getStudentsByFaculty`, async (form: { faculty: string }
, { rejectWithValue }) => {
  try {
    // console.log(faculty);
    const res = await api.getStudentsByFaculty<AppTypes.Student[]>(form);
    return res
  } catch (error) {
    return rejectWithValue(error)
  }
})
const assistantSlice = createSlice({
  name: SLICE_NAME.ASSISTANT,
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getStudents.pending, (state, { payload }) => {
      state.loading[getStudents.typePrefix] = true
    })
    builder.addCase(getStudents.fulfilled, (state, { payload }) => {
      state.loading[getStudents.typePrefix] = false
      state.students = payload.data.data
    })
    builder.addCase(getStudents.rejected, (state, { payload }) => {
      state.loading[getStudents.typePrefix] = false
    })
    builder.addCase(getStudentsByFaculty.pending, (state, { payload }) => {
      state.loading[getStudentsByFaculty.typePrefix] = true
    })
    builder.addCase(getStudentsByFaculty.fulfilled, (state, { payload }) => {
      state.loading[getStudentsByFaculty.typePrefix] = false
      state.studentsByFaculty = payload.data.data
    })
    builder.addCase(getStudentsByFaculty.rejected, (state, { payload }) => {
      state.loading[getStudentsByFaculty.typePrefix] = false
    })
  }
})
export default assistantSlice.reducer;
export const assistantActions = {
  ...assistantSlice.actions,
  getStudents,
  getStudentsByFaculty
}