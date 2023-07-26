import { z } from "zod";

const createArticleSchema = z.object({
  title: z.string().min(1).max(100),
  content: z.string().min(1),
  tags: z.array(z.string()),
});

export default createArticleSchema;
