"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { useRouter } from "next/navigation";
const bcrypt = require("bcryptjs");
export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmins] = useState([]);
  const router = useRouter();
  function generateToken() {
    const tokenLength = 32;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < tokenLength; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    localStorage.setItem("token", token);

    return token;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    localStorage.setItem("email", email);
    const admin = admins.find((admin) => admin?.email === email);
    if (admin) {
      const token = generateToken();
      const isPasswordMatch = await bcrypt.compare(password, admin?.password);
      if (isPasswordMatch && token) {
        router.push("/InstructorAdmin");
      } else {
        alert("Incorrect email or password");
      }
    } else {
      router.push("/Error");
    }

    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const res = await fetch("/api/Admin");
        const data = await res.json();
        setAdmins(data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    }

    fetchAdmins();
  }, []);

  return (
    <div className="sm:w-[500px] mx-auto flex flex-col gap-5  mt-40">
      <div className="container">
        <h3 className="text-center  text-3xl Text">Log In</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="mb-3 mt-6 flex flex-col gap-2">
            <span className="p-float-label text-left">
              <Input
                placeholder="Email"
                value={email}
                className="inline-flex w-full h-12 animate-shimmer  items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>
          </div>

          <div className="mb-3 flex flex-col gap-2">
            <span className="p-float-label text-left">
              <Input
                placeholder="Password"
                value={password}
                className="inline-flex w-full h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
          </div>

          <div className="d-grid">
            <button className="inline-flex w-full h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
              LogIn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
