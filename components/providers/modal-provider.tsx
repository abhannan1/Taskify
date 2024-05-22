"use client"

import React, { useEffect, useState } from 'react'
import CardModal from '@/components/modals/card-modal'

const ModalPRovider = () => {

    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(()=>{
        setIsMounted(true)
    },[])


    if(!isMounted){
        return null
    }

  return (

    <CardModal/>

)
}

export default ModalPRovider