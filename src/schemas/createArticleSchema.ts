import { z } from "zod";

const createArticleSchema = z.object({
  title: z.string().min(1).max(100),
  subtitle: z.string().max(200),
  content: z.string().min(1),
  tags: z.array(z.string()).refine((tags) => tags.length <= 3, {
    message: "Tags must not exceed 3 tags.",
  }),
});

export default createArticleSchema;
