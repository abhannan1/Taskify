"use server"

import { InputType, ReturnType } from "./types"
import { createSafeAction } from "@/lib/create-safe-actions"
import { UpdateList } from "./schema"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"
import { createAuditLog } from "@/lib/create-audit-log"
import { ACTION, ENTITY_TYPE } from "@prisma/client"



const handler = async (data: InputType): Promise<ReturnType> =>{
    const {userId, orgId} = auth()

    if(!userId && !orgId){
        return {
            error: "unathorized"
        }
    }

    const {id, boardId, title} = data;
    let list

    try {
        
        list = await prisma.list.update({
            where:{
                id: id,
                boardId,
                board:{
                    orgId
                }
            },
            data:{
                title:title
            }
        })

        await createAuditLog({
			entityId:list.id,
			entityTitle:list.title,
			entityType:ENTITY_TYPE.LIST,
			action:ACTION.UPDATE,
		})
        
    } catch (error) {
        return {
            error:"failed to update the title"
        }
    }


    revalidatePath(`/board/${boardId}`);
    return{
        data:list
    }
    
}


export const updateList = createSafeAction(UpdateList, handler)