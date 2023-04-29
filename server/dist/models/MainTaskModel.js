import { Schema, model } from "mongoose";
const mainTaskSchema = new Schema({
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
});
const MainTaskModel = model("maintask", mainTaskSchema);
export default MainTaskModel;
