import { z } from "zod";

export const userInfoSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, { error: "Name is required" }).max(50, { error: "Name must not be more than 50 characters" }),
    email: z.string().trim().min(1, {error: "Email is required"}).max(100, { error: "Email most not be more than 100 characters" }).pipe(z.email({ error: "Please enter a valid email address" })),
    phone_number: z.string().trim().min(1, {error: "Phone Number is required"})
      .max(15, { error: "Phone Number must not be more than of 15 digits" })
      .regex(/^\d+$/, {error: "Phone number must contain only digits"}), // here ^ starting of the string and 6-9 means first digit must be between 6-9, and d means any digit from 0-9, \d{9} means choose any digit from 0-9 and do this 9 times which is 9 digits and first digit is already there so total 10 digits
    user_type: z.enum(["Parent", "Student", "School"]),
    category: z.enum(["Scholarship", "Admission", "Concert", "General Query"]),
    message: z.string().max(1500, { error: "Message must not be more than 1500 characters." }),
  }),
});

export const validate = (schema) => (req, res, next) => {
  try {
    
    const result = schema.safeParse({
      body: req.body,
    });

    if (!result.success) {
      return res.status(400).json({
        error: result.error.issues[0].message,
      });
    }

    req.validated = result.data;
    next();
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: "Server error occurred"})
  }
};
