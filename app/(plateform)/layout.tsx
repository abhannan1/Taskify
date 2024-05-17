import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { Navbar } from '../(marketing)/_components/navbar'
import { Footer } from '../(marketing)/_components/footer'
import {Toaster} from "sonner"

const PlateformLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
  return (
    <ClerkProvider
    signInForceRedirectUrl='/'
    >
        <Toaster position='bottom-center' richColors />
        {children}
    </ClerkProvider>
  )
}

export default PlateformLayout