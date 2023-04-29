import React, { useState } from "react"
import { subTaskType } from "../types/subTask"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai"

interface SubTaskProps extends subTaskType {}

export const SubTask: React.FC<SubTaskProps> = ({ content, status }) => {
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [parent] = useAutoAnimate()
  const handleShowEdit: React.MouseEventHandler<HTMLDivElement> = () => {
    setShowEdit(!showEdit)
  }
  return (
    <div className="text-base-100 bg-secondary py-2 px-4">
      <div
        className="w-full flex justify-between items-center h-8"
        ref={parent}
      >
        {showEdit ? (
          <input
            type="text"
            placeholder="Edit Sub Task"
            className="input input-bordered input-sm text-xs w-3/4"
            //   value={element.name}
          />
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
