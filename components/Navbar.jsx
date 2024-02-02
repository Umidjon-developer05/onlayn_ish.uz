"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import AosConfig from "@/utils/Aos";


export default function Navbar() {
  const session = useSession();
  const [email,setEmail]= useState('')
  const [topics,setTopics]=useState([])
  useEffect(() => {
    if (session?.data?.user?.email) {
      setEmail(session.data.user.email);
    }
  }, [session]);
  useEffect(() => {
    const UserData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/topics", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }

        const topicsData = await res.json();
        setTopics(topicsData.topics);
      } catch (error) {
        console.log("Error loading topics: ", error);
      }
    };

    UserData();
  }, []);

  AosConfig()

  return (
    <div>
      <nav data-aos="fade-down" data-aos-duration={1100} className="flex justify-between items-center bg-slate-800 px-8 py-3 ">
      <Link className="text-white font-bold" href={"/"}>
        Ish Uz
      </Link>


      <ul className="flex items-center gap-3 sm:gap-4 md:gap-6 text-white text-[13px] sm:text-lg ">
        {
         email === process.env.NEXT_PUBLIC_EMAIL &&
         <li>
         <Link className="bg-white p-2" href={`${email === process.env.NEXT_PUBLIC_EMAIL?'/addTopic':'/'}`}>
            Add Topic
          </Link>
          </li>
        }
        <li>
          <Link href={'/about'}>About Us</Link>
        </li>
        <li>
          <Link href={'/contact'}>Contact us</Link>
        </li>
        { session.data?.user?.email ?
        <li>
        <div ><img src={session.data?.user.image} className=" bg-red-800 w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-[50%] "  /></div>
        </li>
        :
        <li>
        <Link className="bg-white p-2" href={"/SingIn"}>
        Sing In 
        </Link>
        </li>
        }
      </ul>


    </nav>
    </div>
  );
}
