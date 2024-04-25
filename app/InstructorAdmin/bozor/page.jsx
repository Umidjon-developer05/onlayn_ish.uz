"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import { Button } from "../../components/ui/button";
export default function WorkPost() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios.get("/api/bozor").then((response) => {
      setProducts(response?.data);
    });
  }, []);

  const rowsPerPage = 4;
  const email = localStorage.getItem("email");

  const filteredData = products?.filter((user) => {
    return user.email1 === email;
  });
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    console.log(start, end);
    return filteredData.slice(start, end);
  }, [page, filteredData]);

  const pages = Math.ceil(filteredData?.length / rowsPerPage);

  return (
    <>
      <header>
        <div className="mx-auto  flex flex-col    w-full ">
          <div>
            <div>
              <Link
                href={"/InstructorAdmin/bozor/new1"}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-600 px-5 py-3 text-green-600 transition hover:bg-green-50 hover:text-green-700 focus:outline-none focus:ring"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm font-medium"> Add Product </span>
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          {products?.length === 0 ? (
            <p className=" text-center">No products available.</p>
          ) : (
            <>
              <Table
                aria-label="Example  table with client side pagination"
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
              >
                <TableHeader>
                  <TableColumn key="title">title</TableColumn>
                  <TableColumn key="desription">desription</TableColumn>
                  <TableColumn key="text">text</TableColumn>
                  <TableColumn key="Date">Date</TableColumn>
                  <TableColumn key="">Action</TableColumn>
                </TableHeader>
                <TableBody>
                  {items?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.desription}</TableCell>
                      <TableCell>{item.text}</TableCell>
                      <TableCell>{item.Date}</TableCell>
                      <TableCell className="flex gap-2">
                        <Link href={`/InstructorAdmin/bozor/edit/${item._id}`}>
                          <Button variant="outline">Edit</Button>
                        </Link>
                        <Link
                          href={`/InstructorAdmin/bozor/delete/${item._id}`}
                        >
                          <Button variant="destructive">Delete</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      </header>
    </>
  );
}
