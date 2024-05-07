import Logo from '@/components/logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  return (
    <div className='fixed top-0 w-full  min-h-fit h-14 px-4 border-b shadow-sm bg-white flex items-center '>
        <div className='md:max-w-screen-2xl mx-auto w-full flex items-center  justify-between'>
            <Logo/>
            <div className='space-x-4 md:block md:w-auto w-full flex justify-between'>
                <Button size='sm' variant='outline' asChild>
                    <Link href='/sign-in'>
                        Login
                    </Link>
                </Button>
                <Button size='sm' variant='destructive' asChild className='hover:bg-red-300 duration-300 ease-in-out'>
                    <Link href='./sign-up'>
                    Get taskify for free
                    </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}

