"use server"

import { InputType, ReturnType } from "./types"
import { createSafeAction } from "@/lib/create-safe-actions"
import { UpdateListOrder } from "./schema"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
// import { createAuditLog } from "@/lib/create-audit-log"
// import { ACTION, ENTITY_TYPE } from "@prisma/client"



const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth()

    if(!userId && !orgId){
        return {
            error: "unathorized"
        }
    }

    const {items, boardId} = data;
    let lists

    try {
         const transaction = items.map((item,index)=>(
            prisma.list.update({
                where:{
                    id:item.id,
                    boardId,
                    board:{
                        orgId
                    }
                },
                data:{
                    order:item.order
                }
            })
         ))

         lists = await prisma.$transaction(transaction)

        //  await createAuditLog({
		// 	entityId:list.id,
		// 	entityTitle:list.title,
		// 	entityType:ENTITY_TYPE.BOARD,
		// 	action:ACTION.UPDATE,
		// })

    } catch (error) {
        return {
            error:"Failed to reorder list"
        }
    }


    revalidatePath(`/board/${boardId}`);
    return{
        data:lists
    }
    
}


export const updateListOrder = createSafeAction(UpdateListOrder, handler)