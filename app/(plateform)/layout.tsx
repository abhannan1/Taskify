import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import { Navbar } from '../(marketing)/_components/navbar'
import { Footer } from '../(marketing)/_components/footer'

const PlateformLayout = ({
    children
}:{
    children:React.ReactNode
}) => {
  return (
    <ClerkProvider>
        {children}
    </ClerkProvider>
  )
}

export default PlateformLayout