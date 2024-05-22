import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import {Toaster} from "sonner"
import ModalPRovider from '@/components/providers/modal-provider'

const PlateformLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
  return (
    <ClerkProvider
    signInForceRedirectUrl='/'
    >
        <ModalPRovider/>
        <Toaster position='bottom-center' richColors closeButton />
        {children}
    </ClerkProvider>
  )
}

export default PlateformLayout