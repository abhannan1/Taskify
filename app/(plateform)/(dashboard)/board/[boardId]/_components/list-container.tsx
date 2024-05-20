"use client"

import { ListWithCards } from '@/types'
import React, { useEffect, useState } from 'react'
import ListForm from './list-form'
import ListItem from './list-item'

interface ListContainerProps{
    boardId:string,
    data: ListWithCards[]

}

const ListContainer = ({boardId, data}: ListContainerProps) => {

    const [orderedData, setOrderedData] = useState(data)

    useEffect(()=>{
        setOrderedData(data)
    },[data])

  return (
    <div>
        <ol className='flex gap-x-3 h-full'>
            {orderedData.map((data, index)=>{
                return(
                    <ListItem
                    key={data.id}
                    index={index}
                    data={data}
                    />
                )
            })}
            <ListForm/>
            <div className='flex-shrink-0 w-1'/>
        </ol>
    </div>
  )
}

export default ListContainer