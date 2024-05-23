import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import {Toaster} from "sonner"
import ModalProvider from '@/components/providers/modal-provider'
import QueryProvider from '@/components/providers/query-provider'

const PlateformLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
  return (
    <ClerkProvider
    signInForceRedirectUrl='/'
    >
      <QueryProvider>
        <Toaster position='bottom-center' richColors closeButton />
        <ModalProvider/>
        {children}
      </QueryProvider>
    </ClerkProvider>
  )
}

export default PlateformLayout