"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import Link from "next/link";
import { Button } from "../../../../../components/ui/button";
import Image from "next/image";

const UsersGet = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [Timer, setTimer] = useState("");

  useEffect(() => {
    axios.get("/api/dashboard").then((response) => {
      setUsers(response?.data);
    });
  }, []);

  const rowsPerPage = 4;
  const pages = Math.ceil(users.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return users.slice(start, end);
  }, [page, users]);
  async function Publish(p) {
    const Action = "Publish";
    const data = {
      id: p.id,
      Action,
    };
    await axios.post("/api/publish", data);
  }

  return (
    <div className="mt-2 mx-10">
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
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="email">email</TableColumn>
          <TableColumn key="price">price</TableColumn>
          <TableColumn key="action">Action</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Image
                  src={item.image}
                  className="rounded-full"
                  width={30}
                  alt="image"
                  height={30}
                />
                <h2>{item.email}</h2>
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell className="flex gap-2">
                <button
                  onClick={() => Publish(item)}
                  className="outline hover:outline-blue-400 w-16 h-10 flex justify-center items-center  rounded-lg outline-offset-2 outline-blue-500"
                >
                  Publish
                </button>
                <Link
                  href={`/admin-dashboard/dashboard_price/delete/${item._id}`}
                >
                  <Button variant="destructive">Delete</Button>
                </Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersGet;
