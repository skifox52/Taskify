import React, { useEffect, useState, useContext } from "react"
import { fetchMainTasks } from "../services/MainTaskService"
import { toast } from "react-toastify"
import { mainTaskType } from "../types/mainTask"
import { CancelTokenSource } from "axios"
import { MainTask } from "../components/MainTask"
import { LoaderContext } from "../context/loaderContext"

interface MianTaskPageProps {}

export const MainTaskPage: React.FC<MianTaskPageProps> = () => {
  const loader = useContext(LoaderContext)
  const [data, setData] = useState<mainTaskType[] | null>(null)
  const [source, setSource] = useState<CancelTokenSource | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      loader?.setLoading(true)
      try {
        const { data: ResponseData, cancelTokenSource } = await fetchMainTasks()
        setData(ResponseData)
        setSource(cancelTokenSource)
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        loader?.setLoading(false)
      }
    }
    fetchData()
    return () => {
      source?.cancel()
    }
  }, [loader?.fetching])
  if (loader?.loading) {
    return (
      <h1 className=" text-5xl text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        Loading...
      </h1>
    )
  }
  return data?.length ? (
    <div className="py-8 flex flex-wrap gap-4 h-full w-full">
      {data.map((element) => (
        <MainTask {...element} key={element._id} />
      ))}
    </div>
  ) : (
    <h1 className=" text-primary text-4xl text-center mt-16 font-bold">
      No data
    </h1>
  )
}
