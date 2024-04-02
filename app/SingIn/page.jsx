"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import {  signIn, useSession } from "next-auth/react";

const Register = () => {
  const [error, setError] = useState(null);
  const route = useRouter();
  const session = useSession();
  console.log(session);
  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  if (session.status === "authenticated") {
    route?.push("/");
  }

  return (
    <div className={styles.container}>
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
        className={styles.button + " " + styles.google}
      >
        Login with Github
      </button>
    </div>
  );
};

export default Register;
