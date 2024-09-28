"use client";

import { useFormState } from "react-dom";
import { resetPassword } from "./actions";

export default function ResetPassword() {
  const [state, formAction] = useFormState(resetPassword, {
    inputError: "",
    supabaseError: "",
    success: "",
  });

  console.log(state);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950">
      <form action={formAction}>
        <h1 className="text-4xl font-bold text-slate-50">Reset Password</h1>
        <p className="text-xl text-slate-200 mt-2 mb-6">
          Enter your new password below.
        </p>
        <input
          name="password"
          id="password"
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 rounded-full bg-slate-800 text-slate-50 border-2 border-slate-700 focus:border-indigo-500 focus:outline-none"
        />
        <button
          className="w-full px-4 py-2 rounded-full bg-slate-100 text-slate-900 mt-4"
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
