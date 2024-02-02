"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { useSession } from "next-auth/react";
import UsersGet from "./UsersGet";
import RemoveBtn1 from "./RemoveBtn1";
import Xato from "./Xato";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// Other imports...
// Other imports...

const TopicsList = () => {
  const { data: session, status } = useSession();
  const [topics, setTopics] = useState([]);
  const [Button, setButton] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicsData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/topics", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }

        const topicsData = await res.json();
        setTopics(topicsData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.log("Error loading topics: ", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchTopicsData();
  }, []); // Empty dependency array ensures the effect runs only once on mount
  useEffect(() => {
    const UserData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/button", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch topics");
        }

        const ButtonData = await res.json();
        setButton(ButtonData);
      } catch (error) {
        console.log("Error loading topics: ", error);
      }
    };

    UserData();
  }, []);
  if (status === "loading" || loading) {
    return <div className="w-full h-full fixed top-0 left-0 bg-[rgb(30,41,59)] z-20 grid place-items-center text-[40px] text-white "><AiOutlineLoading3Quarters className="loading-animation"/></div>; // Show loading indicator while fetching data
  }

  if (!session?.user?.email) {
    return <Xato/>;
  }
  if (session?.user?.email === process.env.NEXT_PUBLIC_EMAIL) {
    return (
      <>
      <div  style={{ overflowY:"auto",height:"500px"}}>{
          topics.topics?.map((t) => (
            <div
              key={t._id}
              className="p-4 border border-slate-300 my-3 flex justify-between gap-5 m-3 items-start"
              style={{ borderRadius: "20px"}}
            >
              <div>
                <h2 className="font-bold text-2xl">{t.title}</h2>
              </div>
  
              <div className="flex gap-2 align-items-center">
                <RemoveBtn id={t._id} />
                <Link href={`/editTopic/${t._id}`}>
                  <HiPencilAlt size={24} />
                </Link>
              </div>
            </div>
          ))
      }
      
      </div>
      <div>
        <h1 style={{textAlign:"center",fontSize:"20px"}}>Ish status</h1>
        {
          Button?.button?.map((item)=>
          <div
              key={item._id}
              className="p-4 border border-slate-300 my-3 flex justify-between gap-5 m-3 items-start"
              style={{ borderRadius: "20px"}}
            >
              <div>
                <h2 className="font-bold text-2xl">{item.title}</h2>
                <div>{item.desc ? item.desc :'ish bajarildi😁'}</div>
              </div>
  
              <div className="flex gap-2 align-items-center">
                <RemoveBtn1 id={item._id} />
              </div>
            </div>
          )
        }
      </div>
      </>
    );
  }else{
    return(
      <div style={{display:"flex",justifyContent:"center"}}>
        <UsersGet/>
      </div>
    )
  }
};

export default TopicsList;
