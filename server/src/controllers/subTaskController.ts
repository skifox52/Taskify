import { Request, Response } from "express"
import expressAsyncHandler from "express-async-handler"
import MainTaskModel from "../models/MainTaskModel.js"
import SubTaskModel from "../models/SubTaskModel.js"
import { mainTaskType, subTask } from "../types/models.js"
import { Types } from "mongoose"

// POST subtask
export const addSubTask = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id }: { id: string } = req.params
      const { content, status }: subTask = req.body
      if (!content || !status) {
        throw new Error("Empty fields!")
      }
      const newSubTask = await SubTaskModel.create({ content, status })
      const mainTask = (await MainTaskModel.findById(id)) as mainTaskType
      mainTask.subTasks.push(new Types.ObjectId(newSubTask._id))
      await mainTask.save()
      res.status(200).json("Subtask created successfully!")
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
// GET subtasks
export const getSubTasks = expressAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const subtasks = await SubTaskModel.find({})
      res.status(200).json(subtasks)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)

//PUT subtasks
export const putSubTask = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id }: { id: string } = req.params
      await SubTaskModel.findByIdAndUpdate(id, req.body)
      res.status(201).json(`Task [${id}] updated successfully!`)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
//DELETE subtask
export const deleteSubTask = expressAsyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id }: { id: string } = req.params
      await MainTaskModel.findOneAndUpdate(
        { subTasks: { $in: [id] } },
        { $pull: { subTasks: id } }
      )
      await SubTaskModel.findByIdAndDelete(id)
      res.status(200).json(`Subtask [${id}] deleted successfully!`)
    } catch (error: any) {
      res.status(400)
      throw new Error(error)
    }
  }
)
