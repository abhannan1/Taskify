"use client";

interface FormPopoverProps {
	children: React.ReactNode;
	side?: "top" | "bottom" | "left" | "right";
	align?: "center" | "start" | "end";
	sideOffset?: number;
}



import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import React, { ElementRef, useRef } from 'react'
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { FormSubmit } from './form-submit';
import { FormInput } from './form-input';
import { useAction } from '@/hooks/use-action';
import { createBoard } from '@/actions/create-board';
import { toast } from 'sonner';
import FormPicker from './form-picker';
import { useRouter } from 'next/navigation';

const FormPopover = ({
    children,
    side = 'bottom' ,
    align,
    sideOffset = 0
} : FormPopoverProps) => {
    
    const closeRef = useRef<ElementRef<"button">>(null)
    const router = useRouter()

    const {execute, fieldErrors} = useAction(createBoard, {
        onSuccess: (data) => {
          console.log(data, "SUCCESS!")
          toast.success("Board Added")
          closeRef.current?.click()
          router.push(`/board/${data.id}`)
          },
          onError: (error) => {
          console.error(error);
          toast.error("Failed to add board")
          },
          onComplete:()=>{
            console.log("done")
          }
      })
    
    
    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const image = formData.get("image") as string;

        execute({ title, image });
    };

  return (
    <Popover>
    <PopoverTrigger asChild>{children}</PopoverTrigger>
    <PopoverContent
        sideOffset={sideOffset}
        side={side}
        align={align}
        className="w-80 pt-3 shadow-xl"
    >
        <div className="text-sm font-semibold text-center text-neutral-700 pb-4">
            Create Board
        </div>
        <PopoverClose asChild ref={closeRef}>
            <Button
                className="h-auto p-2 absolute top-2 right-2 text-neutral-600"
                variant="ghost"
            >
                <X className="h-4 w-4" />
            </Button>
        </PopoverClose>
            <form action={onSubmit} className='space-y-4'>
                <div className='space-y-2'>
                    <FormPicker 
                    id='image'
                    errors={fieldErrors}
                    />
                    <FormInput
                    id='title'
                    label='Board Title'
                    type='text'
                    placeholder='enter your text here'
                    required
                    errors={fieldErrors}
                    />
                    <FormSubmit className='w-full'>
                        Create
                    </FormSubmit>
                </div>

            </form>
        </PopoverContent>
    </Popover>
  )
}

export default FormPopover