import { subTaskType } from "./subTask"

export interface mainTaskType {
  _id: string
  name: string
  subTasks: [subTaskType]
}
