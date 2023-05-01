import React, { useContext, useState } from "react"
import { BiAddToQueue } from "react-icons/bi"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { AiOutlineClose } from "react-icons/ai"
import { toast } from "react-toastify"
import { postMainTask } from "../services/MainTaskService"
import { LoaderContext } from "../context/loaderContext"
interface AddMainProps {}

export const AddMain: React.FC<AddMainProps> = () => {
  const [parent] = useAutoAnimate<HTMLDivElement>()
  const [visible, setVisible] = useState<boolean>(false)
  const [input, setInput] = useState<string>("")
  const loader = useContext(LoaderContext)
  //Handle Submit
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    if (input.length <= 3) {
      return toast.warning("Length must be greater than 3")
    }
    const addTask = async (data: string): Promise<void> => {
      loader?.setLoading(true)
      try {
        const newTask = await postMainTask({ name: data })
        toast.success(newTask.message)
      } catch (error: any) {
        console.log(error)
        toast.error(error.message)
      } finally {
        loader?.setFetching(!loader.fetching)
      }
    }
    addTask(input)
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
