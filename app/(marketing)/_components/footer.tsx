import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full  min-h-fit p-4 flex items-center z-10'>
        <div className='md:max-w-screen-2xl mx-auto w-full flex items-center  justify-between'>
            <Logo/>
            <div className='space-x-4 md:block md:w-auto w-full flex justify-between'>
                <Button size='sm' variant='ghost'>
                        Privacy Policy
                </Button>
                <Button size='sm' variant='ghost' >
                    Terms of service
                </Button>
            </div>
        </div>
    </div>
  )
}

