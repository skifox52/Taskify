import api from "./api"
import axios from "axios"
import { subTaskType } from "../types/subTask"

//Add new sub task
export const postSubTask = async (
  data: Omit<subTaskType, "_id">,
  id: string
): Promise<{ message: string }> => {
  try {
    const cancelTokenSouce = axios.CancelToken.source()
    await api.post(`/sub/${id}`, data, { cancelToken: cancelTokenSouce.token })
    return { message: "Sub task added successfully!" }
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw new Error("Request canceled!")
    } else {
      throw new Error(error)
    }
  }
}

//Delete sub task
export const deleteSubTask = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const cancelTokenSouce = axios.CancelToken.source()
    await api.delete(`/sub/${id}`, { cancelToken: cancelTokenSouce.token })
    return { message: "Sub task deleted successfully!" }
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw new Error("Request canceled!")
    } else {
      throw new Error(error)
    }
  }
}
//Put main task
export const putSubTask = async ({
  id,
  data,
}: {
  id: string
  data: string
}): Promise<{ message: string }> => {
  try {
    const cancelTokenSource = axios.CancelToken.source()
    await api.put(
      `/sub/${id}`,
      { content: data },
      { cancelToken: cancelTokenSource.token }
    )
    return { message: "Sub task updated successfully!" }
  } catch (error: any) {
    if (axios.isCancel(error)) {
      throw new Error("Request canceled!")
    } else {
      throw new Error(error)
    }
  }
}
