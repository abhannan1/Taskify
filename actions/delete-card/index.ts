"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { DeleteCard } from "./schema";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-safe-actions";
import prisma from "@/lib/db";
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
		card = await prisma.card.delete({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
		});

		await createAuditLog({
			entityId:card.id,
			entityType:ENTITY_TYPE.CARD,
			entityTitle:card.title,
			action:ACTION.DELETE,
		})

	} catch (error) {
		return {
			error: "Failed to delete card",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return {
		data: card,
	};
};

export const deleteCard = createSafeAction(DeleteCard, handler);
