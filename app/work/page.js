"use client";
import React, { useState, useEffect } from "react";
import { Checkbox } from "@nextui-org/react";
import axios from "axios";
import Work from "./_components/Work";
function Work1() {
  const [open, setOpen] = useState(false);
  const [work, setWork] = useState([]);
  const [data, setTable] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");

  function OpenSIdebar() {
    setOpen(!open);
  }

  const defaultContent12 = async () => {
    const data = await axios.get("/api/category");
    setWork(data?.data);
  };
  useEffect(() => {
    defaultContent12();
  }, []);
  const handlePostionChange = (category) => {
    setSelectedPosition(category);
  };
  useEffect(() => {
    const defaultContent = async () => {
      const data = await axios.get("/api/work");
      setTable(data?.data);
    };
    defaultContent();
  }, []);

  const filteredData = data.filter((user) => {
    return selectedPosition === "" || user?.category === selectedPosition;
  });

  return (
    <div>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        onClick={() => OpenSIdebar()}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        class="fixed top-20 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-screen flex justify-center flex-col  px-3 py-4 overflow-y-auto border">
          <Checkbox
            checked={selectedPosition === ""}
            onClick={() => handlePostionChange("")}
            defaultChecked
          >
            All
          </Checkbox>
          {work?.map((item, index) => (
            <p className="flex gap-2 mt-2 items-center" key={index}>
              <Checkbox
                checked={selectedPosition === item?._id}
                onClick={() => handlePostionChange(item?._id)}
                defaultChecked={selectedPosition === item?._id ? true : false}
              >
                {item?.name}
              </Checkbox>
            </p>
          ))}
        </div>
      </aside>
      {open ? (
        <aside
          className="fixed sm:hidden top-0 left-0 z-40 w-64 h-screen transition-transform translate-full sm:translate-x-0"
          aria-label="Sidebar"
        >
          <div className="h-screen px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => OpenSIdebar()}
                className=" items-center flex justify-end  ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  className="bi bi-x-lg"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                </svg>
              </button>
            </div>
            <div class="h-screen flex justify-center flex-col  px-3 py-4 overflow-y-auto ">
              {work?.map((item, index) => (
                <p className="flex gap-2 mt-2 items-center" key={index}>
                  <Checkbox defaultChecked>{item?.name}</Checkbox>
                </p>
              ))}
            </div>
          </div>
        </aside>
      ) : null}
      <div className="p-4 sm:ml-64">
        <Work filteredData={filteredData} />
      </div>
    </div>
  );
}

export default Work1;
