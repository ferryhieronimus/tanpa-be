import { z } from "zod";

const updateArticleSchema = z
  .object({
    title: z.string().min(1).max(100).optional(),
    subtitle: z.string().max(200).optional(),
    content: z.string().min(1).optional(),
    tags: z
      .array(z.string())
      .optional()
      .refine((tags) => tags && tags.length <= 3, {
        message: "Tags must not exceed 3 tags.",
      }),
  })
  .catchall(z.unknown());

export default updateArticleSchema;
