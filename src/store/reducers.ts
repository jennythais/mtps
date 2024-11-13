import { combineReducers } from "redux";
import post from '@/store/post'
import auth from '@/store/auth'
import me from "@/store/me";
import test from "@/store/test";
export const rootReducer = combineReducers({
     post,
     auth,
     me,
     test
})