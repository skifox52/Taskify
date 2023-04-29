import { AddMain } from "./components/AddMain"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import { MainTaskPage } from "./Pages/MianTaskPage"

function App() {
  return (
    <div className=" font-poppins px-16 py-4 min-h-screen w-screen">
      <AddMain />
      <MainTaskPage />
      <ToastContainer />
    </div>
  )
}

export default App
