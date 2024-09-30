"use client";

import { useFormState } from "react-dom";
import { resetPassword } from "./actions";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEye,
  faEyeSlash,
  faCircleExclamation,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(searchParams.get("confirmation_url")!);
      const token = params.get("token");
      const email = params.get("email");

      await supabase.auth.verifyOtp({
        token: token!,
        email: email!,
        type: "recovery",
      });
    };

    init();
  }, []);

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

        <Input inputError={state.inputError} />

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
          <div className="py-3 px-4 bg-red-950 rounded-lg mt-6 border border-red-100 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-red-100 text"
            />

            <p className="text-red-100 text">{state.supabaseError}</p>
          </div>
        )}

        {state.success && (
          <div className="py-3 px-4 bg-green-950 rounded-lg mt-6 border border-green-100 flex items-center gap-2">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-green-100 text"
            />

            <p className="text-green-100 text">{state.success}</p>
          </div>
        )}
      </form>
    </div>
  );
}

const inputContainerClasses =
  "w-full px-4 py-2 rounded-full bg-slate-800 text-slate-50 border-2 border-slate-700";

const inputContainerFocusClasses = "border-indigo-500";

const inputContainerErrorClasses =
  "w-full px-4 py-2 rounded-full bg-red-950 border-red-400 border-2 focus:outline-none";

type InputProps = {
  inputError: string;
};

const Input = ({ inputError }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div
      className={`flex justify-between items-center ${
        inputError ? inputContainerErrorClasses : inputContainerClasses
      } ${isFocused && !inputError ? inputContainerFocusClasses : ""}`}
      onClick={() => {
        setIsFocused(true);
        inputRef.current?.focus();
      }}
      onBlur={() => setIsFocused(false)}
    >
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faLock} className="text-slate-400 text-sm" />

        <input
          name="password"
          id="password"
          type={isPasswordVisible ? "text" : "password"}
          placeholder="New Password"
          ref={inputRef}
          className="bg-transparent border-none focus:outline-none"
        />
      </div>

      <FontAwesomeIcon
        icon={isPasswordVisible ? faEyeSlash : faEye}
        className="text-slate-400 text-sm cursor-pointer"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      />
    </div>
  );
};
