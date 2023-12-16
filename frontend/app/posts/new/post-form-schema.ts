import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/gif",
    "image/png",
    "image/webp",
];

export const postFormSchema = z.object({
    category: z.string().min(1, { message: "Please select a category" }),
    title: z
        .string({
            required_error: "Title is required",
        })
        .min(3, { message: "Title is too short" })
        .max(80, { message: "Title is too long" }),
    image: z
        .custom<File>((v) => v instanceof File)
        .refine((file) => file?.size <= MAX_FILE_SIZE, {
            message: "Max image size is 5MB",
        })
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .gif, .png and .webp images are supported."
        )
        .optional(),
    content: z
        .string({
            required_error: "Post body is required",
        })
        .min(10, { message: "Post body is too short" }),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;
