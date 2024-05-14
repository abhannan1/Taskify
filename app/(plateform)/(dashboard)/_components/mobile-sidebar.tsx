'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useMobileSideBar } from '@/hooks/use-mobile-sidebar'
import { Ghost, Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SideBar from './sidebar'

const MobileSideBar = () => {

    const pathname = usePathname()
    const [isMounted, setIsMounted] = useState(false)

    const isOpen = useMobileSideBar((state)=>state.isOpen)
    const onOpen = useMobileSideBar((state)=>state.onOpen)
    const onClose = useMobileSideBar((state)=>state.onClose)


    useEffect(()=>{
        setIsMounted(true)
    }, [])

    useEffect(()=>{
        onClose()
    },[pathname, onClose])


    if(!isMounted){
        return null
    }

  return (
    <>
    <Button
    onClick={onOpen}
    className='block md:hidden mr-2'
    variant='ghost'
    size='sm'
    >
        <Menu className='h-4 w-4'/>
    </Button>
    <Sheet open={isOpen} onOpenChange={onClose} >
        <SheetContent
        side='left'
        className='p-2 pt-10'
        >
            <SideBar
            storageKey='t-sidebar-mobile-state'
            />
        </SheetContent>
    </Sheet>
    </>
)
}

export default MobileSideBar




// const MobileSideBar = () => {

//   return (
//     <>
//     <Sheet  key='left'>
//         <SheetTrigger asChild>
//             <Button
//             // onClick={onOpen}
//             className='block md:hidden'
//             variant='ghost'
//             size='sm'
//             >
//                 <Menu className='h-4 w-4'/>
//             </Button>
//         </SheetTrigger>
    
//         <SheetContent
//         side='left'
//         className='p-2 pt-10'
//         >
//             <SideBar
//             storageKey='t-sidebar-mobile-state'
//             />
//         </SheetContent>
// </Sheet>
// </>
//   )
// }

// export default MobileSideBar