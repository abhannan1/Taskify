"use server"

import { InputType, ReturnType } from "./types"
import { createSafeAction } from "@/lib/create-safe-actions"
import { CreateList } from "./schema"
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

    const {boardId, title} = data;
    let list

    try {

        const board = await prisma.board.findUnique({
            where:{
                id:boardId,
                orgId
            }
        })

        if(!board){
            return {
                error:"board not found"
            }
        }

        const lastList = await prisma.list.findFirst({
            where:{boardId:boardId},
            orderBy:{order:"desc"},
            select:{order:true}
        })
        
        const newOrder = lastList ? lastList?.order + 1: 1;
        
        list = await prisma.list.create({
            data:{
                boardId,
                title:title,
                order:newOrder
            }
        })
        
    } catch (error) {
        return {
            error:"Failed to create list"
        }
    }


    revalidatePath(`/board/${boardId}`);
    return{
        data:list
    }
    
}


export const createList = createSafeAction(CreateList, handler)