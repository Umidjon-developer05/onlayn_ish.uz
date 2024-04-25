"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { Button } from "../../../../components/ui/button";
export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 4;
  const pages = Math.ceil(categories.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return categories.slice(start, end);
  }, [page, categories]);
  useEffect(() => {
    axios.get("/api/categorymarket").then((res) => setCategories(res?.data));
  }, []);

  async function saveCategory(ev) {
    ev.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const data = { name, parentCategory };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put("/api/categorymarket", data);
      setEditedCategory(null);
      toast.success("Category updated!!");
    } else {
      await axios.post("/api/categorymarket", data);
      toast.success("Category created successfully");
    }
    setName("");
    setParentCategory("");
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
  }

  return (
    <>
      <header className="sm:ml-72">
        <div className="mx-auto  ">
          <div className="flex ">
            <form
              onSubmit={saveCategory}
              className="mt-4 flex mx-10  gap-4 sm:mt-3 sm:items-center"
            >
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center text-gray-500">
                    <select
                      className="h-full rounded-md border-transparent bg-transparent py-0 pl-3  pr-7 text-gray-500 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      value={parentCategory}
                      onChange={(ev) => setParentCategory(ev.target.value)}
                    >
                      <option>No parent</option>
                      {categories?.length > 0 &&
                        categories?.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <input
                    type="text"
                    id="example11"
                    className="block sm:w-[400px] rounded-md border border-slate-300 py-2.5 pl-8 pr-16 shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                    placeholder="Category Name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-lg border border-blue-100 bg-blue-100 px-5 py-3 text-center text-sm font-medium text-blue-600 transition-all hover:border-blue-200 hover:bg-blue-200 focus:ring focus:ring-blue-50 disabled:border-blue-50 disabled:bg-blue-50 disabled:text-blue-400"
              >
                {editedCategory ? "Save changes" : "Save Category"}
              </button>
            </form>
          </div>
        </div>
        <div className=" sm:w-[1200px]  p-4">
          <Table
            aria-label="Example table with client side pagination"
            bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }
            classNames="flex justify-center"
          >
            <TableHeader>
              <TableColumn key="name">NAME</TableColumn>
              <TableColumn key="action">Action</TableColumn>
            </TableHeader>
            <TableBody items={items}>
              {(item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>

                  <TableCell className="flex gap-2">
                    <button
                      className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700	"
                      onClick={() => editCategory(item)}
                    >
                      Edit
                    </button>
                    <Link
                      href={`/admin-dashboard/category-market/delete/${item._id}`}
                    >
                      <Button variant="destructive">Delete</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </header>
    </>
  );
}
