"use client";

import { useFormState } from "react-dom";
import { resetPassword } from "./actions";

const inputClasses =
  "w-full px-4 py-2 rounded-full bg-slate-800 text-slate-50 border-2 border-slate-700 focus:border-indigo-500 focus:outline-none";
const inputErrorClasses =
  "w-full px-4 py-2 rounded-full bg-red-950 border-red-400 border-2 focus:outline-none";

export default function ResetPassword() {
  const [state, formAction] = useFormState(resetPassword, {
    inputError: "",
    supabaseError: "",
    success: "",
  });

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
          className={state.inputError ? inputErrorClasses : inputClasses}
        />
        {state.inputError && (
          <p className="text-red-100 text-sm mt-2">{state.inputError}</p>
        )}
        <button
          className="w-full px-4 py-2 rounded-full bg-slate-100 text-slate-900 mt-4"
          type="submit"
        >
          Reset Password
        </button>
        {state.supabaseError && (
          <p className="text-red-100 text-sm mt-2">{state.supabaseError}</p>
        )}
        {state.success && (
          <p className="text-green-100 text-sm mt-2">{state.success}</p>
        )}
      </form>
    </div>
  );
}
