"use client"

import { deleteBoard } from '@/actions/delete-board'
import { Button } from '@/components/ui/button'
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAction } from '@/hooks/use-action'
import { error } from 'console'
import { MoreHorizontalIcon, X } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'

interface BoardOptionsProps{

    id:string
}

const BoardOptions = ({id}: BoardOptionsProps) => {

	const { execute, isLoading } = useAction(deleteBoard, {
		onError: (error) => {
			toast.error(error);
		},
		onSuccess: (data) => {
			toast.info("Board deleted");
		},
	});

    const onDelete =()=>{
        execute({id})
    }

  return (
    <div
    className='ml-auto'
    >
        <Popover>
            <PopoverTrigger asChild>
                <Button className='h-auto w-auto p-2' variant="transparent">
                    <MoreHorizontalIcon className='h-4 w-4'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent
            className='px-0 py-3 mr-2 relative'
            side='bottom'
            align='start'
            >
                <div
                className='text-sm font-medium text-center text-neutral-600 pb-4'
                >
                    Board Options
                </div>
                <PopoverClose 
                asChild
                className='h-auto w-auto absolute top-2 right-2 p-1 text-neutral-600'
                >
                    <X className='w-4 h-4'/>
                </PopoverClose>
                <Button
                variant="ghost"
                className='rounded-sm w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                onClick={onDelete}
                disabled={isLoading}
                >
                    Delete This board
                </Button>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default BoardOptions