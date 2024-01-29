import { z } from "zod";

export const BlogSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 chars")
    .max(50, "Title must  be at least 50 chars"),
  content: z
    .string()
    .min(150, "content has to be at least 150 chars")
    .max(1000, "content must be at least 1000 chars"),
  /* comment: z
      .array(
        z.object({
          title: z.string().min(5),
        })
      )
      .optional() */
});
