"use client";
import React from "react";
import AddUser from "./_components/AddUser";
import GetUser from "./_components/GetUser";

const AdminCreate = () => {
  return (
    <div className="sm:ml-72">
      <AddUser />

      <GetUser />
    </div>
  );
};

export default AdminCreate;
