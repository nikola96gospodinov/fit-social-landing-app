"use server";

import { createClient } from "@/lib/supabase";
import { z } from "zod";

const resetPasswordSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .regex(/\d/, {
      message: "Password must include at least one numeric character",
    })
    .regex(/[a-zA-Z]/, {
      message: "Password must include at least one letter character",
    }),
});

type ResetPasswordResponse = {
  inputError: Record<string, string | string[]> | false;
  supabaseError: string | false;
  success: string | false;
};

export async function resetPassword(
  formData: FormData
): Promise<ResetPasswordResponse> {
  const supabase = createClient();

  const data = {
    password: formData.get("password"),
  };

  const parsedData = resetPasswordSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      inputError: parsedData.error.flatten().fieldErrors,
      supabaseError: false,
      success: false,
    };
  }

  const { error } = await supabase.auth.updateUser(parsedData);

  if (error) {
    return { supabaseError: error.message, inputError: false, success: false };
  }

  return {
    success: "Password updated successfully",
    inputError: false,
    supabaseError: false,
  };
}
