import { z } from "zod";

export const CreateBoard = z.object({
  title: z
    .string({
      invalid_type_error: "This is a required field",
      required_error: "This is a required field",
    })
    .min(3, { message: "This is too short" }),
});
