"use client";
import axios from "axios";
import { Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "../../../components/ui/input";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
export default function Product({
  _id,
  title: existingTitle,
  desription: existingDescription,
  text: existingText,
  Date: existingDate,
  category: existingCategory,
  price: existingPrice,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [desription, setDescription] = useState(existingDescription || "");
  const [text, setText] = useState(existingText || "");
  const [Date, setDate] = useState(existingDate || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [categories, setCategories] = useState([]);

  const router = useRouter();
  const [redirect, setRedirect] = useState(false);
  const session = useSession();
  async function CreateProduct() {
    const name =session?.data?.user?.name;
    const email = session?.data?.user?.email;
    const image = session?.data?.user?.image;
    const email1 = localStorage.getItem("email");
   if (name && email && image && email1) {
       const data = {
         title,
         desription,
         text,
         Date,
         price,
         email1,
         category,
         name,
         email,
         image,
       };
       try {
         if (_id) {
           await axios.put("/api/work", { ...data, _id });
           toast.success("Work updated!!");
         } else {
           await axios.post("/api/work", data);
           toast.success("Work created!!");
         }
         setRedirect(true);
       } catch (error) {
         console.error("Error creating/updating work:", error);
       }
   }

  }

  useEffect(() => {
    axios
      .get("/api/category")
      .then((response) => {
        setCategories(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  if (redirect) {
    router.push("/InstructorAdmin/dashboard");
    return null;
  }

  return (
    <div>
      <div className="w-full mx-5" >
        {/* Title input */}
        <div className="items-center my-4">
          <label className="text-lg font-medium mb-3">Title</label>
          <Input
            type="text"
            variant={"bordered"}
            className="p-3 rounded-lg w-full"
            placeholder="Title"
            required
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </div>

        {/* Description input */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="items-center my-4">
            <label className="text-lg font-medium mb-3">Description</label>
            <Input
              type="text"
              className="p-3 rounded-lg w-full"
              placeholder="Description"
              required
              value={desription}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>
        </div>

        {/* Category select */}
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="category">Work Category</label>
          <select
            id="category"
            className="mt-1.5 p-3 rounded-md border border-gray-300"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option value="0">No category selected</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Textarea input */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="block text-lg font-medium mb-3">Text</label>
          <Textarea
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
            placeholder="Text"
            required
            value={text}
            onChange={(ev) => setText(ev.target.value)}
          />
        </div>

        {/* Date input */}
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="date">Select Date</label>
          <Input
            type="date"
            id="date"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
            required
            value={Date}
            onChange={(ev) => setDate(ev.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="date">Price</label>
          <Input
            type="text"
            id="date"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-3"
            required
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
          />
        </div>

        {/* Submit button */}
        <button
        type="button"
           onClick={() => CreateProduct()}
          className="bg-transparent transition-all w-full mt-10 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-4 px-6 border border-blue-500 hover:border-transparent rounded"
        >
          Save work 
        </button>
      </div>
    </div>
  );
}
