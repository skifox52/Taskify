import React, { useContext, useState } from "react"
import { subTaskType } from "../types/subTask"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai"
import { LoaderContext } from "../context/loaderContext"
import { toast } from "react-toastify"
import { deleteSubTask, putSubTask } from "../services/SubTaskService"

interface SubTaskProps extends subTaskType {}

export const SubTask: React.FC<SubTaskProps> = ({ content, status, _id }) => {
  const loader = useContext(LoaderContext)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [input, setInput] = useState<string>(content)
  const [parent] = useAutoAnimate()
  const handleShowEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowEdit(!showEdit)
  }
  const handleUpdateService = async (): Promise<void | string | number> => {
    loader?.setLoading(true)
    try {
      if (input.length < 4) {
        return toast.warning("Length must be greater than 3")
      }
      await putSubTask({ id: _id, data: input })
      toast.success("Main taks updated successfully!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      loader?.setFetching(!loader.fetching)
    }
  }
  const handleDeleteService = async (): Promise<void> => {
    const confirmAlrt = confirm("Confirm delete?")
    if (!confirmAlrt) return
    loader?.setLoading(true)
    try {
      const deleted = await deleteSubTask(_id)
      toast.success(deleted.message)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      loader?.setFetching(!loader.fetching)
    }
  }
  const handleDelete: React.MouseEventHandler<HTMLDivElement> = () => {
    handleDeleteService()
  }
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value)
  }
  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    handleUpdateService()
  }
  return (
    <div className="text-base-100 bg-secondary py-2 px-4">
      <AiOutlineClose
        className="mb-4 text-lg hover:rotate-180 hover:text-red-600 cursor-pointer transition-all duration-350"
        onClick={handleDelete}
      />
      <div
        className="w-full flex justify-between items-center h-8"
        ref={parent}
      >
        {showEdit ? (
          <form onSubmit={handleOnSubmit}>
            <input
              type="text"
              placeholder="Edit Sub Task"
              className="input input-bordered input-sm text-xs w-3/4 text-white"
              onChange={handleOnChange}
              value={input}
            />
          </form>
        ) : (
          <h3 className=" text-md">{content}</h3>
        )}{" "}
        {showEdit ? (
          <AiOutlineClose
            onClick={handleShowEdit}
            className="cursor-pointer hover:scale-125 hover:text-white transition-all duration-200 text-[20px]"
          />
        ) : (
          <AiOutlineEdit
            onClick={handleShowEdit}
            className="cursor-pointer hover:scale-125 hover:text-white transition-all duration-200 text-[20px]"
          />
        )}
      </div>
      <div className="flex justify-between items-center my-2">
        <p>Priority</p>
        <p className=" font-bold">{status.toUpperCase()}</p>
      </div>
    </div>
  )
}
function useContect() {
  throw new Error("Function not implemented.")
}
