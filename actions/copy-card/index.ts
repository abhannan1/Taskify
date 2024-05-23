"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { CopyCard } from "./schema";
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
	let card;

	try {
		const cardToCopy = await prisma.card.findUnique({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
		});

		if (!cardToCopy) {
			return {
				error: "Card not found",
			};
		}

		const lastCard = await prisma.card.findFirst({
			where: {
				listId: cardToCopy.listId,
			},
			orderBy: { order: "desc" },
			select: { order: true },
		});

		const newOrder = lastCard ? lastCard.order + 1 : 1;

		card = await prisma.card.create({
			data: {
				title: `${cardToCopy.title} - (copy)`,
				description: cardToCopy.description,
				order: newOrder,
				listId: cardToCopy.listId,
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
			error: "Failed to copy card",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return {
		data: card,
	};
};

export const copyCard = createSafeAction(CopyCard, handler);
