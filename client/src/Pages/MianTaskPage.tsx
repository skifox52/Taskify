import React, { useEffect, useState } from "react"
import { fetchMainTasks } from "../services/MainTaskService"
import { toast } from "react-toastify"
import { mainTaskType } from "../types/mainTask"
import { CancelTokenSource } from "axios"
import { MainTask } from "../components/MainTask"

interface MianTaskPageProps {}

export const MainTaskPage: React.FC<MianTaskPageProps> = ({}) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<mainTaskType[] | null>(null)
  const [source, setSource] = useState<CancelTokenSource | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: ResponseData, cancelTokenSource } = await fetchMainTasks<
          mainTaskType[]
        >()
        setData(ResponseData)
        setSource(cancelTokenSource)
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    return () => {
      source?.cancel()
    }
  }, [])
  if (loading) {
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
    <h1>No data</h1>
  )
}
