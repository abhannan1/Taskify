"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CopyList } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}
	const { id, boardId } = data;
	let list 

	try {
		const listToCopy = await prisma.list.findUnique({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
			include:{
				cards:true
			}
		});


		if(!listToCopy){
			return{
				error:"list not found"
			}
		}

		const lastList = await prisma.list.findFirst({
			where:{boardId},
			orderBy:{order:"desc"},
			select:{order:true}
		})

		const newOrder = lastList ? lastList.order + 1 : 1;


		list = await prisma.list.create({
			data:{
				boardId,
				title:`${listToCopy.title} - Copy`,
				order:newOrder,
				cards:{
					createMany:{
						data: listToCopy.cards.map((card)=> ({
							title:card.title,
							discription : card.description,
							order:card.order

						}))
					}
				}
			},
			include:{
				cards:true
			}
		})

		await createAuditLog({
			entityId:list.id,
			entityType:ENTITY_TYPE.LIST,
			entityTitle:list.title,
			action:ACTION.CREATE,
		})

	} catch (error) {
		return {
			error: "Failed to copy list",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return {
		data: list,
	};
};

export const copyList = createSafeAction(CopyList, handler);
