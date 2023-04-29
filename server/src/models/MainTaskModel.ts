import { Schema, model } from "mongoose"
import { mainTaskType } from "../types/models.js"

const mainTaskSchema = new Schema<mainTaskType>({
  name: {
    type: String,
    required: true,
  },
  subTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "subtask",
      default: [],
    },
  ],
})
const MainTaskModel = model("maintask", mainTaskSchema)
export default MainTaskModel
