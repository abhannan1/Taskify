"use server"

import { InputType, ReturnType } from "./types"
import { createSafeAction } from "@/lib/create-safe-actions"
import { DeleteBoard } from "./schema"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"



const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth()

    if(!userId && !orgId){
        return {
            error: "unathorized"
        }
    }

    const {id} = data;

    let board

    try {
        board = await prisma.board.delete({
            where:{
                id: id,
                orgId
            }
        })
        
    } catch (error) {
        return {
            error:"failed to delete the board"
        }
    }


    revalidatePath(`/organization/${orgId}`);
    redirect(`/organizattion/${orgId}`)
    
}


export const deleteBoard = createSafeAction(DeleteBoard, handler)