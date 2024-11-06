import { Method } from "axios";
import request from "./request";
import endpoints from "./endpoint";
import env from "../config/env";
export interface IApiResponses<T = {}> {
     data: {
          data: T;
     }
          status: number;
          message: string;
          success: boolean;
}
interface IOption{
     headers?: {[key: string]: any};
     params?: object;
}
const gen = (params: string, baseURL?: string) => {
     let url = params
     let method: Method = 'GET'

     const paramsArray = params.split(' ')
     if (paramsArray.length === 2) {
          method = paramsArray[0] as Method
          url = paramsArray[1]
          console.log(url);
     }
     return function (data?: any, options?: IOption) {
          console.log("option", options);
          return request(url, {
               data: data,
               method: method,
               params: options?.params,
               baseURL,
               headers: options?.headers
          })
     }
}
export type APIFunc = <T>(data?: any, option?: IOption) => Promise<IApiResponses<T>>

export type APIMap = {
  [key in keyof typeof endpoints]: APIFunc
}

const api: any = {}

for (const key in endpoints) {
  const apiURL = env?.BASE_URL

  api[key] = gen((endpoints as any)[key], apiURL)
}

export type EndPoints = keyof typeof endpoints

export default api as APIMap
