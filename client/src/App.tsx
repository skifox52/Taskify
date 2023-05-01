import { AddMain } from "./components/AddMain"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import { MainTaskPage } from "./Pages/MianTaskPage"
import { useMemo, useState } from "react"
import { LoaderContext } from "./context/loaderContext"

function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const [fetching, setFetching] = useState<boolean>(false)
  const loaderProviderValue = useMemo(
    () => ({ loading, setLoading, fetching, setFetching }),
    [loading, setLoading, fetching, setFetching]
  )
  return (
    <LoaderContext.Provider value={loaderProviderValue}>
      <div className=" font-poppins px-16 py-4 min-h-screen w-screen">
        <AddMain />
        <MainTaskPage />
        <ToastContainer />
      </div>
    </LoaderContext.Provider>
  )
}

export default App
