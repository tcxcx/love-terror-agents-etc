import * as z from "zod";

export const formSchema = z.object({
  system_prompt: z.string().min(1).max(1500),
  valentines_name: z.string().min(1).max(255),
  secret_admirer_name: z.string().min(1).max(255),
  secret_question: z.string().min(1).max(255),
  secret_answer: z.string().min(1),
  clue_1: z.string(),
  clue_2: z.string().optional(),
  clue_3: z.string().optional(),
  clue_4: z.string().optional(),
  clue_5: z.string().optional(),
  clue_6: z.string().optional(),
  clue_7: z.string().max(255).optional(),
  poem_text: z.string().min(1),
  date_site: z.string().min(1).max(255),
  date_details: z.string().min(1).max(255).optional(),
  calendly_link: z.string().min(1).max(255).optional(),
  amount_roses: z.number().min(1, "").max(9999999999),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export const defaultValues: Partial<FormSchemaType> = {
  system_prompt: "",
  valentines_name: "",
  secret_admirer_name: "",
  secret_question: "",
  secret_answer: "",
  clue_1: "",
  clue_2: "",
  clue_3: "",
  clue_4: "",
  clue_5: "",
  clue_6: "",
  clue_7: "",
  poem_text: "",
  date_site: "",
  date_details: "",
  calendly_link: "",
  amount_roses: 0,
};
