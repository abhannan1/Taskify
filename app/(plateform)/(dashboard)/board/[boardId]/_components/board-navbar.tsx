import prisma from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { Board } from '@prisma/client'
import React from 'react'
import BoardTitleForm from './board-title-form'
import BoardOptions from './board-options'


export interface BoardNavbarProps {
    board: Board
}

const BoardNavbar = async({board} : BoardNavbarProps) => {
    
    const {orgId} = auth()



  return (
    <div className='absolute top-14 bg-black/50 w-full z-[40] h-14 flex items-center px-6 gap-x-4 text-white'>
      <BoardTitleForm board= {board}/>
      <BoardOptions id={board.id}/>
    </div>
  )
}

export default BoardNavbar