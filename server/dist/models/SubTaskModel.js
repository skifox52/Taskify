import { model, Schema } from "mongoose";
const subTaskSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Haute", "Normal", "Basse"],
        required: true,
    },
});
const SubTaskModel = model("subtask", subTaskSchema);
export default SubTaskModel;
