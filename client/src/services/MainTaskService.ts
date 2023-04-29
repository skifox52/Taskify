import api from "./api"
import axios, { AxiosResponse, CancelTokenSource } from "axios"

//fetch all main tasks
export const fetchMainTasks = async <T>(): Promise<{
  data: T
  cancelTokenSource: CancelTokenSource
}> => {
  try {
    const cancelTokenSouce = axios.CancelToken.source()
    const response: AxiosResponse<T> = await api.get("/main", {
      cancelToken: cancelTokenSouce.token,
    })
    return { data: response.data, cancelTokenSource: cancelTokenSouce }
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw new Error("Reqquest canceled!")
    } else {
      if (axios.isCancel(error)) {
        throw new Error("User canceled the request!")
      } else {
        throw new Error(error.message)
      }
    }
  }
}
