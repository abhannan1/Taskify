"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CreateCard } from "./schema";
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

	const { title, boardId, listId } = data;
	let card;

	try {
		const list = await prisma.list.findUnique({
			where: {
				id: listId,
				boardId,
				board: {
					orgId,
				},
			},
		});

		if (!list) {
			return {
				error: "List not found",
			};
		}

		const lastCard = await prisma.card.findFirst({
			where: {
				listId,
			},
			orderBy: {
				order: "desc",
			},
			select: {
				order: true,
			},
		});

		const newOrder = lastCard ? lastCard.order + 1 : 1;

		card = await prisma.card.create({
			data: {
				title,
				listId,
				order: newOrder,
			},
		});

		await createAuditLog({
			entityId:card.id,
			entityType:ENTITY_TYPE.CARD,
			entityTitle:card.title,
			action:ACTION.CREATE,
		})

	} catch (error) {
		return {
			error: "Failed to create card",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return {
		data: card,
	};
};

export const createCard = createSafeAction(CreateCard, handler);
