"use server"

import { InputType, ReturnType } from "./types"
import { createSafeAction } from "@/lib/create-safe-actions"
import { UpdateBoard } from "./schema"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"



const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth()

    if(!userId && !orgId){
        return {
            error: "unathorized"
        }
    }

    const {id, title} = data;
    let board

    try {
        
        
        board = await prisma.board.update({
            where:{
                id: id,
                orgId
            },
            data:{
                title:title
            }
        })
        
    } catch (error) {
        return {
            error:"failed to update the title"
        }
    }


    revalidatePath(`/board/${board.id}`);
    return{
        data:board
    }
    
}


export const updateBoard = createSafeAction(UpdateBoard, handler)