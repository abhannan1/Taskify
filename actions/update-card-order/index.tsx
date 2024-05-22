"use server"

import { InputType, ReturnType } from "./types"
import { createSafeAction } from "@/lib/create-safe-actions"
import { UpdateCardOrder } from "./schema"
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

    const {items, boardId} = data;
    let updatedCard

    try {
         const transaction = items.map((item,index)=>(
            prisma.card.update({
                where:{
                    id:item.id,
                    list:{
                        board:{
                            orgId
                        }
                    }
                },
                data:{
                    order:item.order,
                    listId:item.listId,

                }
            })
         ))

         updatedCard = await prisma.$transaction(transaction)

    } catch (error) {
        return {
            error:"Failed to reorder list"
        }
    }


    revalidatePath(`/board/${boardId}`);
    return{
        data:updatedCard
    }
    
}


export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)