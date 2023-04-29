import React, { useState } from "react"
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai"
import { SubTask } from "./SubTask"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { mainTaskType } from "../types/mainTask"

interface MainTaskProps extends mainTaskType {}

export const MainTask: React.FC<MainTaskProps> = ({ name, subTasks, _id }) => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [parent] = useAutoAnimate()

  const handleShow: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowInput(!showInput)
  }
  const handleShowEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowEdit(!showEdit)
  }
  return (
    <div
      key={_id}
      className="border-secondary border shadow-secondary shadow-md px-8 py-4 w-1/3 flex flex-col gap-2"
    >
      <div
        className="w-full flex justify-between items-center h-8"
        ref={parent}
      >
        {showEdit ? (
          <input
            type="text"
            placeholder="Edit Main Task"
            className="input input-bordered input-sm text-xs w-3/4"
            //   value={element.name}
          />
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
        className="w-full  cursor-pointer hover:text-white transition-all duration-200"
      >
        <p onClick={handleShow}>Add a task</p>
        {showInput && (
          <input
            type="text"
            placeholder="Add task"
            className="input input-bordered input-md input-secondary w-full my-4"
          />
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
