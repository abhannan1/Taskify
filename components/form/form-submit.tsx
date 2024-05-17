"use client"

import { cn } from "@/lib/utils"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"


interface FromSubmitProps {
    children : React.ReactNode;
    disabled? : boolean;
    className?: string;
    variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link" | "primary"
}


import React from 'react'

export const FormSubmit = ({
    children,
    disabled,
    className,
    variant = "primary"
} :  FromSubmitProps) => {
    const {pending} = useFormStatus()

  return (
    <Button
    disabled={pending || disabled}
    type="submit"
    variant={variant}
    size='sm'
    className={cn(className)}
    >
        {children}
    </Button>
  )
}

