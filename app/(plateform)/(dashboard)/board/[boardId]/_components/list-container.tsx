import { ListWithCards } from '@/types'
import React from 'react'

interface ListContainerProps{
    boardId:string,
    data: ListWithCards[]

}

const ListContainer = ({boardId, data}: ListContainerProps) => {
  return (
    <div>ListContainer</div>
  )
}

export default ListContainer