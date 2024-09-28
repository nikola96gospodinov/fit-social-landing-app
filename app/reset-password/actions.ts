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

type ReturnType = {
  inputError: string;
  supabaseError: string;
  success: string;
};

export async function resetPassword(
  _state: ReturnType,
  formData: FormData
): Promise<ReturnType> {
  try {
    const supabase = createClient();

    const data = {
      password: formData.get("password"),
    };

    const parsedData = resetPasswordSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        inputError:
          parsedData.error.flatten().fieldErrors.password?.[0] ??
          "Check your password",
        supabaseError: "",
        success: "",
      };
    }

    const { error } = await supabase.auth.updateUser(parsedData);

    if (error) {
      return { supabaseError: error.message, inputError: "", success: "" };
    }

    return {
      success: "Password updated successfully",
      inputError: "",
      supabaseError: "",
    };
  } catch {
    return {
      inputError: "",
      supabaseError: "Something went wrong",
      success: "",
    };
  }
}
