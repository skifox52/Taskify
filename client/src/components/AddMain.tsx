import React, { useState } from "react"
import { BiAddToQueue } from "react-icons/bi"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { AiOutlineClose } from "react-icons/ai"
interface AddMainProps {}

export const AddMain: React.FC<AddMainProps> = ({}) => {
  const [parent] = useAutoAnimate<HTMLDivElement>()
  const [visible, setVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>("")
  //Handle Submit
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setInput("")
  }
  return (
    <div
      ref={parent}
      className="w-full relative bg-secondary text-base-100 font-bold text-5xl text-center"
    >
      <h1>TASKIFY</h1>
      {visible ? (
        <AiOutlineClose
          className="fill-base-100 absolute h-8 top-6 -translate-y-1/2 left-4 cursor-pointer"
          onClick={() => setVisible(!visible)}
        />
      ) : (
        <BiAddToQueue
          className="fill-base-100 absolute h-8 top-6 -translate-y-1/2 left-4 cursor-pointer"
          onClick={() => setVisible(!visible)}
        />
      )}
      {visible && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add a task"
            className="input input-bordered input-primary text-white text-opacity-90 w-full max-w-xs top-[120%] my-4 tracking-wide"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />
        </form>
      )}
    </div>
  )
}
