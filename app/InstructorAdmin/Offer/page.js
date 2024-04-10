"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useMemo, use } from "react";
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
    axios.get("/api/offer").then((response) => {
      setProducts(response?.data);
    });
  }, []);

  const rowsPerPage = 4;
  const email = localStorage.getItem("email");

  const filteredData = products?.filter((user) => {
    return user.email === email;
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
        <div className="mx-auto  flex flex-col mt-2    w-full  ">
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
                <TableColumn key="Name">Name</TableColumn>
                <TableColumn key="email">email</TableColumn>
                <TableColumn key="text">text</TableColumn>
                <TableColumn key="phone">phone</TableColumn>
              </TableHeader>
              <TableBody>
                {items?.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.text}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        </div>
      </header>
    </>
  );
}
