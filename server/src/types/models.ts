import { Types, Document } from "mongoose"

interface mainTaskFields {
  name: string
  subTasks: [Types.ObjectId]
}
interface subTaskFields {
  content: string
  status: "Haute" | "Normal" | "Basse"
}
export interface mainTaskType extends Document, mainTaskFields {}
export interface subTask extends Document, subTaskFields {}
