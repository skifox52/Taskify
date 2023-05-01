import api from "./api"
import axios, { AxiosResponse, CancelTokenSource } from "axios"
import { mainTaskType } from "../types/mainTask"

//fetch all main tasks
export const fetchMainTasks = async (): Promise<{
  data: mainTaskType[]
  cancelTokenSource: CancelTokenSource
}> => {
  try {
    const cancelTokenSouce = axios.CancelToken.source()
    const response: AxiosResponse<mainTaskType[]> = await api.get("/main", {
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

//Add new main task
export const postMainTask = async ({
  name: data,
}: {
  name: string
}): Promise<{ message: string }> => {
  try {
    const cancelTokenSouce = axios.CancelToken.source()
    await api.post(
      "/main",
      { name: data },
      { cancelToken: cancelTokenSouce.token }
    )
    return { message: "Main task added successfully!" }
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw new Error("Request canceled!")
    } else {
      throw new Error(error)
    }
  }
}

//Delete main task
export const deleteMaintask = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const cancelTokenSouce = axios.CancelToken.source()
    await api.delete(`/main/${id}`, { cancelToken: cancelTokenSouce.token })
    return { message: "Main task deleted successfully!" }
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw new Error("Request canceled!")
    } else {
      throw new Error(error)
    }
  }
}
