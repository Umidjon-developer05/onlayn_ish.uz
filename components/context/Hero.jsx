"use client"
import React, { useState,useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { MdOutlineCancel } from "react-icons/md";
import AosConfig from '@/utils/Aos';

export default function Hero (){
    const session = useSession();
    const [email,setEmail]= useState('')
    const [topics,setTopics]=useState([])
    const [inp,setInp]=useState('')
    const [searchData,setSearchData]=useState([])
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
    
      function searchJob(title){
        setInp(title)
        setSearchData(topics.filter(x=>x.title.includes(title)))
      }
      AosConfig()
  return email !== process.env.NEXT_PUBLIC_EMAIL ? (
    <div  data-aos-duration={1600} className='h-[250px] md:h-[320px] lg:h-[400px] bg-no-repeat bg-cover bg-center relative' style={{backgroundImage:"url(https://assets-global.website-files.com/63fef929dc32cb28d93d6c87/642422b9f4a0f2660ff09419_62ba0aac27602b507d989610_Background%2520Checks%2520Done%2520in%2520The%2520United%2520States%2520What%2520You%2520Need%2520to%2520Know.jpeg)"}}>
        <div className='bg-[#0b1125] absolute top-0 left-0 w-full h-full opacity-80'></div>   
        <div className='h-full flex items-center  flex-col gap-[26px]'> 
        <h1 className='text-[24px] sm:text-[32px] md:text-[40px] lg:text-[44px] xl:text-[50px] text-white font-extrabold z-10 mt-20'>Find your Job with Our App</h1>

      <div className="relative">
      <div className="flex items-center w-[310px] sm:w-[400px] md:w-[500px] lg:w-[540px] xl:w-[650px] bg-white rounded-md pl-2 pr-2 h-[30px] lg:h-[30px] xl:h-[35px]">
      <input className="bg-transparent  flex-1 indent-1 outline-0 text-[13px] md:text-[14px] xl:text-[16px] h-full" onChange={e=>searchJob(e.target.value)} value={inp} type="text" placeholder="Search Job" />
      {
        inp.length>0?
        <button className="text-md xl:text-xl" onClick={e=>{setInp("");setSearchData([])}}>
          <MdOutlineCancel/>
        </button>
        :
        null
      }
      </div>
      {
        inp.length>0?
        <div style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",zIndex:"10",opacity:"1"}} className="absolute top-[100%] w-[100%] bg-white rounded-md overflow-hidden mt-1">
          {
            searchData.length>0?
            <div className='max-h-[160px] md:max-h-[180px] lg:max-h-[210px] overflow-y-auto'>
                {
                  searchData.map(x=>
                      <div className="w-full pt-2 pb-2 hover:bg-slate-800 hover:text-white indent-3 cursor-pointer text-[13px] xl:text-[15px]">
                        {x.title}
                      </div>
                    )
                }
            </div>
            :
            <div>

            </div>
          }
        </div>
        :
        null
      }
      </div>
      </div>
        </div>
  )
  :
  <></>
}
