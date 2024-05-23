import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server"



export async function GET(req: Request, {params}:{params:{cardId:string}}) {

    try {

        const {cardId} = params;
        
        const {orgId, userId} = auth()

    
        if(!orgId || !userId){
            return new NextResponse("unauthorized", {status:401})
        }


        const auditLogs = await prisma.auditLog.findMany({
            where:{
                orgId:orgId,
                entityId:cardId,
                entityType:ENTITY_TYPE.CARD,
            },
            orderBy:{
                createdAt:"desc"
            },
            take:3,
        })


        if(!auditLogs){
            return new NextResponse("No audit logs founds", {status:404})
        }

        return NextResponse.json(auditLogs)
        
    } catch (error) {
        return new NextResponse("Internal Server Error", {status:500})
        
    }
    



}