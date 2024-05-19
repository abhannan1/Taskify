"use client"

import { updateBoard } from '@/actions/update-board'
import { FormInput } from '@/components/form/form-input'
import { Button } from '@/components/ui/button'
import { useAction } from '@/hooks/use-action'
import { Board } from '@prisma/client'
import { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'


interface BoardTitleFormProps {
    board : Board
}

const BoardTitleForm = ({board }: BoardTitleFormProps) => {

    const {execute } = useAction(updateBoard, {
        onSuccess:(data)=>{
            toast.success(`Board "${data.title}" updated`)
            setTitle(data.title)
            disableEditing()
        },
        onError:(error)=>{
            toast.error(error)
        },
        onFieldError:(fieldErrors)=>{
            toast.error(fieldErrors?.id || fieldErrors?.title)
            disableEditing()
        },
    })

    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(board.title)
    const inputRef = useRef<ElementRef<"input">>(null)
    const formRef = useRef<ElementRef<"form">>(null)
    


    const enableEditing = () =>{
        // 
        setIsEditing(true)
        
        setTimeout(()=>{
            inputRef.current?.focus()
            inputRef.current?.select()
        })
    }
    const disableEditing = () =>{
        setIsEditing(false)
    }

    const onSubmit = async (formdata: FormData) =>{

        const title = formdata.get("title") as string
        const id = board.id

        execute({title, id})
 
    }

    const onBlur = () =>{
        if(inputRef.current?.value?.length as number < 3) return disableEditing();
        if(title !== inputRef.current?.value){
            formRef.current?.requestSubmit();
        }else{
            disableEditing()
        }
    }

    if(isEditing){
        return(
            <form 
            ref={formRef} 
            action={onSubmit}
            className="flex items-center gap-x-2 mt-2"
            >
                <FormInput
                    defaultValue={title}
                    ref={inputRef}
                    // errors={fieldErrors}
                    id='title'
                    onBlur={onBlur}
                    className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none focus-visible:ring-offset-0 focus-visible:ring-0 "
                    required
                    />

            </form>
        )
    }

  return (
    <div>
        <Button 
        onClick={enableEditing} 
        variant="transparent"
        className="font-bold text-lg h-auto w-auto p-1 px-2"
        >
            {title}
        </Button>
    </div>
  )
}

export default BoardTitleForm