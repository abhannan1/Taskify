"use client"

import { Button } from "@/components/ui/button"
import ListWrapper from "./list-wrapper"
import {  ListPlus, X } from "lucide-react"
import { ElementRef, useRef, useState } from "react"
import { useEventListener, useOnClickOutside } from "usehooks-ts"
import { FormInput } from "@/components/form/form-input"
import { useParams, useRouter } from "next/navigation"
import { FormSubmit } from "@/components/form/form-submit"
import { useAction } from "@/hooks/use-action"
import { createList } from "@/actions/create-list"
import { toast } from "sonner"


const ListForm = () => {

  
  const [isEditing, setIsEditing] = useState(false)
  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)
  const router = useRouter()
  const {boardId} = useParams()
  
  const enableEditing = ()=>{
    setIsEditing(true)
    setTimeout(() => {  
      inputRef.current?.focus()
      inputRef.current?.select()
    });
  }
  
  const disableEditing = ()=>{
    setIsEditing(false)
  }


  const {execute, fieldErrors} = useAction(createList, {
    onSuccess:(data)=>{
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
    },

    onError:(error)=>{
      toast.error(error);
    }
  })

  const onKeyDown = (e : KeyboardEvent) =>{
    if(e.key == "Escape"){
      disableEditing()
    }
  }


  useEventListener("keydown", onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const onSubmit = (formData:FormData)=>{
    const boardId = formData.get("boardId") as string
    const title = formData.get("title") as string

    execute({boardId, title})

  }

  if(isEditing){
    return(
      <ListWrapper>
        <form 
        ref={formRef} 
        action={onSubmit}
        className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            className="text-sm px-2 py-1 h-7 border-transparent font-medium hover:border-input focus:border-input transition focus-visible:ring-offset-0 focus-visible:ring-1"
            placeholder="Enter list title"
            id="title"
            errors={fieldErrors}
          />
          <input 
            type="text" 
            hidden
            value={boardId}
            name="boardId"
          />
          <div
          className="flex items-center gap-x-1 "
          >
            <FormSubmit
            
            >
              Add list
            </FormSubmit>
            <Button
            className="ml-auto"
            variant="ghost"
            size="sm"
            onClick={disableEditing}
            >
              <X
              className="h-4 w-4"
              />
            </Button>

          </div>
        </form>
      </ListWrapper>
    )
  }

  return (
      <ListWrapper>
        <Button 
          onClick={enableEditing}
          className="w-full rounded-sm bg-white/80 hover:bg-white/50 
          transition p-3 flex items-center font-medium text-sm text-black justify-start">
          <ListPlus className="h-5 w-5 mr-2"/>
          Add a list 
        </Button>
      </ListWrapper>
  )
}

export default ListForm