"use client"

import { ListWithCards } from '@/types'
import React, { useEffect, useState } from 'react'
import {DragDropContext, Droppable} from '@hello-pangea/dnd'
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
        <DragDropContext onDragEnd={()=>{}}>
            <Droppable droppableId='lists' type='list' direction='horizontal'>
                {
                    (provided)=>(
                        <ol className='flex gap-x-3 h-full'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        >
                        {orderedData.map((data, index)=>{
                            return(
                                <ListItem
                                key={data.id}
                                index={index}
                                data={data}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <ListForm/>
                        <div className='flex-shrink-0 w-1'/>
                    </ol>
                )
            }
            </Droppable>
        </DragDropContext>
  )
}

export default ListContainer