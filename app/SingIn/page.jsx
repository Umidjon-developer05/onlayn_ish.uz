"use client";
import styles from "./page.module.css";
import { signIn } from "next-auth/react";

const Register = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-10 sm:h-[500px]">
      <button
        onClick={() => {
          signIn("google");
        }}
        className={styles.button + " " + styles.google}
      >
        Login with Google
      </button>
      <button
        onClick={() => {
          signIn("github");
        }}
        className="flex gap-2 bg-green-500 sm:w-[400px] rounded-lg items-center justify-center p-5"
      >
        <img src="/GitHub.svg" className="w-10 h-10 bg-slate-50 rounded-full" />
        <p className="text-white"> Login with Github</p>
      </button>
    </div>
  );
};

export default Register;
