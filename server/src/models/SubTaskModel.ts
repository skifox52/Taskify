import { model, Schema } from "mongoose"
import { subTask } from "../types/models.js"

const subTaskSchema = new Schema<subTask>({
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["High", "Medium", "Low"],
    required: true,
  },
})

const SubTaskModel = model("subtask", subTaskSchema)
export default SubTaskModel
