import React from 'react'
import { SignedOut, SignedIn, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

function Homepage() {
  return (
    <div>
        <button className='btn btn-primary' onClick={()=>toast.error("Clicked it ")}> click me </button>
        <SignedOut>
            <SignInButton mode='modal'>
                <button className='btn btn-secondary'>Sign In</button>
            </SignInButton>
        </SignedOut>
        <SignedIn>
            <UserButton/>
            <SignOutButton/>
        </SignedIn>
    </div>
  )
}

export default Homepage