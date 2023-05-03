import React, { useContext, useState } from "react"
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai"
import { SubTask } from "./SubTask"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { mainTaskType } from "../types/mainTask"
import { deleteMaintask, putMainTask } from "../services/MainTaskService"
import { toast } from "react-toastify"
import { LoaderContext } from "../context/loaderContext"
import { postSubTask } from "../services/SubTaskService"
import { subTaskType } from "../types/subTask"

interface MainTaskProps extends mainTaskType {}

export const MainTask: React.FC<MainTaskProps> = ({ name, subTasks, _id }) => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [mainTaskInput, setMainTaskInput] = useState<string>(name)
  const [parent] = useAutoAnimate()
  const [subTaskInput, setSubTaskInput] = useState<Omit<subTaskType, "_id">>({
    content: "",
    status: "",
  })
  const loader = useContext(LoaderContext)
  //Add sub task
  const postSubTaskHandler = async (): Promise<void> => {
    loader?.setLoading(true)
    try {
      await postSubTask(subTaskInput as subTaskType, _id)
      toast.success("Subtask added successfully!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      loader?.setFetching(!loader.fetching)
    }
  }
  //Delete Main task
  const deletTask = async (): Promise<void> => {
    const confirmAlrt = confirm("Confirm delete?")
    if (!confirmAlrt) return
    loader?.setLoading(true)
    try {
      const deleted = await deleteMaintask(_id)
      toast.success(deleted.message)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      loader?.setFetching(!loader.fetching)
    }
  }
  //Put Main task
  const editMainTask = async (): Promise<void | number | string> => {
    loader?.setLoading(true)
    try {
      if (mainTaskInput.length < 4) {
        return toast.warning("Length must be greater than 3")
      }
      await putMainTask({ id: _id, data: mainTaskInput })
      toast.success("Main taks updated successfully!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      loader?.setFetching(!loader.fetching)
    }
  }
  const handleShow: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowInput(!showInput)
  }
  const handleShowEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowEdit(!showEdit)
  }
  const handleDelete: React.MouseEventHandler<HTMLDivElement> = () => {
    deletTask()
  }
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMainTaskInput(e.currentTarget.value)
  }
  const submitEdit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    editMainTask()
  }
  const onChangeHandler: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    setSubTaskInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleAddSubTask: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    postSubTaskHandler()
  }
  return (
    <div
      key={_id}
      className="border-secondary border shadow-secondary shadow-md px-8 py-4  flex flex-col gap-2"
    >
      <AiOutlineClose
        className="mb-4 cursor-pointer  hover:text-red-600   hover:scale-125 transition-all duration-100"
        onClick={handleDelete}
      />
      <div
        className="w-full flex justify-between items-center h-8"
        ref={parent}
      >
        {showEdit ? (
          <form onSubmit={submitEdit}>
            <input
              type="text"
              placeholder="Edit Main Task"
              className="input input-bordered input-sm text-xs w-3/4"
              value={mainTaskInput}
              onChange={handleOnChange}
            />
          </form>
        ) : (
          <h3 className=" text-2xl text-white font-bold">
            {name.toUpperCase()}
          </h3>
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

      <div
        ref={parent}
        className="w-full  cursor-pointer hover:text-white transition-all duration-200 my-4"
      >
        <p onClick={handleShow}>Add a task</p>
        {showInput && (
          <form onSubmit={handleAddSubTask} className="py-4">
            <select
              name="status"
              className="select select-secondary w-full max-w-xs"
              onChange={onChangeHandler}
              defaultValue={""}
              required
            >
              <option value="" disabled hidden>
                Select status
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <input
              type="text"
              placeholder="Add task"
              className="input input-bordered input-md input-secondary w-full my-4"
              name="content"
              onChange={onChangeHandler}
              required
            />
          </form>
        )}
      </div>
      {subTasks.length ? (
        subTasks.map((sub) => <SubTask key={sub._id} {...sub} />)
      ) : (
        <h1 className="text-primary font-bold text-2xl text-center my-auto mx-auto">
          No Subtasks!
        </h1>
      )}
    </div>
  )
}
