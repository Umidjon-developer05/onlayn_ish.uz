"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Xato from "@/components/Xato";
export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [time1, setTime1] = useState("");
  
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session?.user.email === process.env.NEXT_PUBLIC_EMAIL) {
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!title || !description || !time || !time1 ) {
        alert("Title and description are required.");
        return;
      }
  
      try {
        const res = await fetch("http://localhost:3000/api/topics", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ title, description ,time,time1}),
        });
  
        if (res.ok) {
          router.push("/");
        } else {
          throw new Error("Failed to create a topic");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 container" style={{margin:"0 auto",padding:"20px"}}>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Title"
        />
  
        <input
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Topic Description"
        />
        <input type="time" 
         onChange={(e) => setTime(e.target.value)}
             value={time}
          className="border border-slate-500 px-8 py-2"
          placeholder="Time"
        />
        <input type="number" 
         onChange={(e) => setTime1(e.target.value)}
             value={time1}
          className="border border-slate-500 px-8 py-2"
          placeholder="Soat..."
        />

        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        >
          Add Topic
        </button>
      </form>
    );
  }else{
    return(
      <div>
        <Xato/>
      </div>
    )
  }
}
