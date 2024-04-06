import React from "react";
import AdminDashboard from "./admin-dashboard/page";
import { Toaster } from "react-hot-toast";

const layout = ({ children }) => {
  return (
    <div>
      <AdminDashboard />
      <Toaster position="top-center" />

      {children}
    </div>
  );
};

export default layout;
