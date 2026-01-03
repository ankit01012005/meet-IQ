import { Routes,Route, Navigate } from "react-router"
import Homepage from "./pages/Homepage"
import ProblemsPage from "./pages/ProblemsPage"
import { useUser } from "@clerk/clerk-react"
import { Toaster } from "react-hot-toast"
import DashboardPage from "./pages/DashboardPage"
import ProblemPage from "./pages/ProblemPage"

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
          <Route path="/problems" element ={user.isSignedIn ? <ProblemsPage/>: <Navigate to ="/"/>}/>
          <Route path="/problem/:id" element ={user.isSignedIn ? <ProblemPage/>: <Navigate to ="/"/>}/>
        </Routes>

        <Toaster/>
    </>
  )
}

export default App

// todo : integrate react-quary/tanstack and axios