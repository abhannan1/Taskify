import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import {Toaster} from "sonner"
import ModalPRovider from '@/components/providers/modal-provider'
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
        <ModalPRovider/>
        <Toaster position='bottom-center' richColors closeButton />
        {children}
      </QueryProvider>
    </ClerkProvider>
  )
}

export default PlateformLayout