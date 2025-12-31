import { Routes,Route, Navigate } from "react-router"
import Homepage from "./pages/Homepage"
import ProblemPage from "./pages/ProblemPage"
import { useUser } from "@clerk/clerk-react"
import { Toaster } from "react-hot-toast"
import DashboardPage from "./pages/DashboardPage"

function App() {

  // monitering the user and protecting the problem route 
  const user = useUser() // useUser gives object (with details of user related to browser )

  //remove the clerk process ->(flickring effect)
  if(!user.isLoaded) return null
  return (
    <>
        <Routes>
          <Route path="/" element ={!user.isSignedIn ? <Homepage/> : <Navigate to="/dashboard"/>}/>
          <Route path="dashboard" element={user.isSignedIn ? <DashboardPage/> : <Navigate to="/"/>}/>
          <Route path="/problem" element ={user.isSignedIn ? <ProblemPage/>: <Navigate to ="/"/>}/>
        </Routes>

        <Toaster/>
    </>
  )
}

export default App

// todo : integrate react-quary/tanstack and axios