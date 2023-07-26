import { z } from "zod";

const updateArticleSchema = z
  .object({
    title: z.string().min(1).max(100).optional(),
    content: z.string().min(1).optional(),
    tags: z.array(z.string()).optional(),
  })
  .catchall(z.unknown());

export default updateArticleSchema;
