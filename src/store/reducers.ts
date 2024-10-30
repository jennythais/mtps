import { combineReducers } from "redux";
import post from '@/store/post'
import auth from '@/store/auth'
export const rootReducer = combineReducers({
     post,
     auth
})