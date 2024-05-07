import React from 'react'
import { Navbar } from './_components/navbar'
import { Footer } from './_components/footer'

const MarketingLayout = ({
    children
} : {
    children:React.ReactNode
}) => {
  return (
    <div className='h-full  bg-slate-100 '>
        {/* Navbar */}
        <Navbar/>
        <main className='bg-slate-100 h-full flex justify-center items-center z-0 '>
        {children}
        </main>
        {/* Footer */}
        <Footer/>
    </div>
  )
}

export default MarketingLayout