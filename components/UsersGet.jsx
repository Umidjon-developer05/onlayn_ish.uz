import React, { useEffect, useState } from 'react';
import "./UsersGet.css"
import AosConfig from '@/utils/Aos';
  const UsersGet = () => {
    const [topics, setTopics] = useState([]);
    const [desc, setDesc] = useState('');
    const [clickedButtonId, setClickedButtonId] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [clickedButtonIds, setClickedButtonIds] = useState(
      JSON.parse(localStorage.getItem('clickedButtonIds')) || []
    );

    useEffect(() => {
      const UserData = async () => {
        try {
          const res = await fetch("https://www.onlayn-ish.uz/api/topics", {
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error("Failed to fetch topics");
          }

          const topicsData = await res.json();
          setTopics(topicsData);
        } catch (error) {
          console.log("Error loading topics: ", error);
        }
      };

      UserData();
    }, []);

   
    



    const [countdown, setCountdown] = useState(0);
    const convertTimeToSeconds = (hours, minutes, seconds) => {
      return hours * 3600 + minutes * 60 + seconds;
    };

    useEffect(() => {
      let totalSeconds = 0;
      topics.topics?.forEach((t) => {
        const seconds = convertTimeToSeconds(t.time1, t.time2, t.time3);
        totalSeconds += seconds;
      });
    
      setCountdown(totalSeconds);
    
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    
      return () => clearInterval(interval);
    }, [topics]);
    
  

    // Format seconds to display as HH:MM:SS
    const formatTime = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;

      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
    
    useEffect(() => {
      localStorage.setItem('clickedButtonIds', JSON.stringify(clickedButtonIds));
    }, [clickedButtonIds]);

    AosConfig()

    return (
      <div  style={{ width: "100%",display:"flex",gap:"14px", justifyContent:"center", margin:"0 auto" , flexWrap:"wrap",}}>
        {topics?.topics?.map((t) => (
          <div
            data-aos='zoom-in-up' data-aos-duraiton={1800}
            key={t._id} 
            className="p-4 border my-1 md:my-3 rounded-[20px] w-[320px] h-[320px] md:w-[400px] md:h-[400px]"
            style={{
              boxShadow:"rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
           
            }}
          >
            <div className='flex flex-col overflow-auto h-[240px] md:h-[300px]'>
              <h2 className="font-bold text-xl sm:text-2xl" style={{color: clickedButtonId === t._id && desc === 'ish bajarildi😁' ?'#222':'#222'}}>{t.title}</h2>
              <div style={{color: clickedButtonId === t._id && desc === 'ish bajarildi😁' ?'#222':'#222'}}>{t.description}</div>
            </div>
           
            <div className="flex gap-2 justify-between items-center">
              <div style={{color: clickedButtonId === t._id && desc === 'ish bajarildi😁' ?'#222':'#222'}}>{t.time}</div>
             <div>
             <a href="https://t.me/Umidjon01_developer">
             <button
                className='btn'
                style={{
                  width:"100px",
                  height:"50px",
                  borderRadius: "20px",
                  cursor:"pointer",
                  color: "#fff"}} 
              >
                Telegram 
              </button>
             </a>
             </div>
            </div>
          </div>
        ))}
      </div>
    );
  };



  export default UsersGet;
