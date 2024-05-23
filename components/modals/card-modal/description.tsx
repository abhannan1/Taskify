"use client"

import { updateCard } from '@/actions/update-card'
import { FormSubmit } from '@/components/form/form-submit'
import { FormTextarea } from '@/components/form/form-textarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useAction } from '@/hooks/use-action'
import { cn } from '@/lib/utils'
import { CardWithList } from '@/types'
import { useQueryClient } from '@tanstack/react-query'
import { AlignLeft } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { ElementRef, useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

interface DescriptionProps{
    data:CardWithList
}

const Description = ({data }: DescriptionProps ) => {
    const [isEditing, setIsEditing] = useState(false)
    const params = useParams();
    const queryClient = useQueryClient();
    const formRef = useRef<ElementRef<"form">>(null)
    const textareaRef = useRef<ElementRef<"textarea">>(null)


    const enableEditing = ()=>{
        setIsEditing(true)
        setTimeout(() => {
            textareaRef.current?.focus()
        });
    }
    const disableEditing = ()=>{
        setIsEditing(false)
    }

    const onkeydown = (e:KeyboardEvent)=>{
        if(e.key === "Escape"){
            disableEditing
        }
    }


    useEventListener("keydown", onkeydown)
    useOnClickOutside(formRef, disableEditing)

    const {execute, fieldErrors} = useAction(updateCard,{
        onSuccess:(data)=>{
            queryClient.invalidateQueries({
                queryKey:["card", data.id]
            });
            queryClient.invalidateQueries({
                queryKey:["card-logs", data.id]
            });
            toast.success(`Card ${data.title} updated`)
            disableEditing()
        },
        onError:(error)=>{
            toast.error(error)
        }
    })


    const onSubmit = (formData:FormData)=>{
        const description = formData.get("description") as string;
        const boardId = params.boardId as string;

        execute({boardId, description,id:data.id})
    }


  return (
    <div className='flex gap-x-3 items-start'>
        <AlignLeft className='w-6 h-6 mt-0.5 text-neutral-700'/>
        <div className='w-full '>
            <p className='font-semibold text-neutral-700 mb-2'>
                DESCRIPTION
            </p>
            { isEditing ?
                <form 
                ref={formRef}
                className='space-y-2'
                action={onSubmit}
                >
                    <FormTextarea
                    id='description'
                    defaultValue={data.description || undefined}
                    className="w-full mt-2"
                    placeholder="Add more details describing this card"
                    errors={fieldErrors}
                    ref={textareaRef}
                    />
                    <div className='flex items-center gap-x-2'>
                        <FormSubmit>
                            Save
                        </FormSubmit>
                        <Button
                        variant="ghost"
                        onClick={disableEditing}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
                :
            <div 
            role='button'
            onClick={enableEditing}
            className={cn(
                "min-h-[78px] bg-neutral-200 font-normal py-3 px-3.5 rounded-md",
                !data.description && "text-xs text-muted-foreground"
            )}            >
                {data.description || "Add a more detailed description here..."}
            </div>
        }
        </div>
    </div>
  )
}


Description.Skeleton = function DescriptionSkeleton() {
	return (
		<div className="flex items-start gap-x-3 w-full">
			<Skeleton className="h-6 w-6 mt-1 bg-neutral-200" />
			<div className="w-full ">
				<Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
				<Skeleton className="w-full h-[78px] mb-1 bg-neutral-200" />
			</div>
		</div>
	);
};

export default Description