"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { UpdateCard } from "./schema";
import { InputType, ReturnType } from "./types";
import prisma from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-actions";

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		};
	}
	const { id, boardId, ...values } = data;
	let card;

	try {
		card = await prisma.card.update({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
			data: {
				...values,
			},
		});

	} catch (error) {
		return {
			error: "Failed to update card",
		};
	}

	revalidatePath(`/board/${boardId}`);
	return {
		data: card,
	};
};

export const updateCard = createSafeAction(UpdateCard, handler);