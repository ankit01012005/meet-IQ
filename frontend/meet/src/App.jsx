import { Routes,Route, Navigate } from "react-router"
import Homepage from "./pages/Homepage"
import ProblemPage from "./pages/ProblemPage"
import { useUser } from "@clerk/clerk-react"
import { Toaster } from "react-hot-toast"

function App() {

  // monitering the user and protecting the problem route 
  const user = useUser() // useUser gives object (with details of user related to browser )
  return (
    <>
        <Routes>
          <Route path="/" element ={<Homepage/>}/>
          <Route path="/problem" element ={user.isSignedIn ? <ProblemPage/>: <Navigate to ="/"/>}/>
        </Routes>

        <Toaster/>
    </>
  )
}

export default App

// todo : integrate react-quary/tanstack and axios