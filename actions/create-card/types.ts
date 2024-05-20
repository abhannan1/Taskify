import { Card } from "@prisma/client";
import { z } from "zod";
import { CreateCard } from "./schema";
import { ActionState } from "@/lib/create-safe-actions";

export type InputType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputType, Card>;
