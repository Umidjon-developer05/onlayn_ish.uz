"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
const pageSize = 4;
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  user,
} from "@nextui-org/react";
import { Button } from "../../../../components/ui/button";
export default function WorkPost() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios.get("/api/work").then((response) => {
      setProducts(response?.data);
      setLoading(false);
    });
  }, []);
  const rowsPerPage = 4;

  const pages = Math.ceil(products.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    console.log(start, end);
    return products.slice(start, end);
  }, [page, products]);
  return (
    <>
      <header>
        <div className="mx-auto flex flex-col justify-center items-center w-full ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="mt-4 mb-2 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center ">
              <Link
                href={"/admin-dashboard/work-post/new1"}
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
        <div className="sm:ml-80 mx-10">
          {products?.length === 0 ? (
            <p className=" text-center">No products available.</p>
          ) : (
            <>
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
                classNames={{
                  wrapper: "min-h-[222px]",
                }}
              >
                <TableHeader>
                  <TableColumn key="title">title</TableColumn>
                  <TableColumn key="desription">desription</TableColumn>
                  <TableColumn key="text">text</TableColumn>
                  <TableColumn key="Date">Date</TableColumn>
                  <TableColumn key="">Action</TableColumn>
                </TableHeader>
                <TableBody items={items}>
                  {(item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.desription}</TableCell>
                      <TableCell>{item.text}</TableCell>
                      <TableCell>{item.Date}</TableCell>
                      <TableCell className="flex gap-2">
                        <Link
                          href={`/admin-dashboard/work-post/edit/${item._id}`}
                        >
                          <Button variant="outline">Edit</Button>
                        </Link>
                        <Link
                          href={`/admin-dashboard/work-post/delete/${item._id}`}
                        >
                          <Button variant="destructive">Delete</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </>
          )}
        </div>
      </header>
    </>
  );
}
