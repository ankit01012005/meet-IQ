import './App.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {

  return (
    <>
        <div>
          <h1>meet-IQ program provider</h1>
          <SignedOut>
            <SignInButton mode='modal'/>
          </SignedOut>
          <SignedIn>
            <SignOutButton/>
            <UserButton/>
          </SignedIn>
          
        </div>
    </>
  )
}

export default App
