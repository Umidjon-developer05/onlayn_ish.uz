"use client";
import axios from "axios";
import { Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";
export default function Product({
  _id,
  title: existingTitle,
  desription: existingDescription,
  text: existingText,
  Date: existingDate,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [desription, setDesription] = useState(existingDescription || "");
  const [text, setText] = useState(existingText || "");
  const [Date, setDate] = useState(existingDate || "");

  const router = useRouter();
  const [redirect, setRedirect] = useState(false);

  async function createProduct(e) {
    e.preventDefault();
    const data = {
      title,
      desription,
      text,
      Date,
    };

    if (_id) {
      await axios.put("/api/work", { ...data, _id });
      toast.success("work updated!!");
    } else {
      await axios.post("/api/work", data);
      toast.success("work created!!");
    }
    setRedirect(true);
  }
  if (redirect) {
    router.push("/admin-dashboard/work-post");
    return null;
  }

  return (
    <div>
      <form className="sm:w-[1100px] sm:ml-80 mx-10" onSubmit={createProduct}>
        {/* firstName input */}
        <div className=" items-center my-4">
          <label className="  text-lg font-medium  mb-3">title </label>
          <div>
            <input
              type="text"
              variant={"bordered"}
              className="p-3 rounded-lg w-full"
              placeholder="Title "
              required
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
          </div>
        </div>

        {/* Admin select */}
        <div className="flex flex-col gap-2 mb-4">
          <div className=" items-center my-4">
            <label className="  text-lg font-medium  mb-3">desription</label>
            <div>
              <input
                type="text"
                className="p-3 rounded-lg w-full"
                placeholder="desription"
                required
                value={desription}
                onChange={(ev) => setDesription(ev.target.value)}
              />
            </div>
          </div>
        </div>

        {/* lastName input */}
        <div className="flex flex-col gap-2 mb-4">
          <label className=" block text-lg font-medium  mb-3">LastName</label>
          <div>
            <Textarea
              type="text"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
              placeholder="lastName"
              required
              value={text}
              onChange={(ev) => setText(ev.target.value)}
            />
          </div>
        </div>

        {/* Product Details input */}
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="category">Select position</label>
          <input
            type="date"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
            placeholder="date"
            required
            value={Date}
            onChange={(ev) => setDate(ev.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-transparent transition-all w-full mt-10  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border border-blue-500 hover:border-transparent rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
