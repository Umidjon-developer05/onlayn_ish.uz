import React from "react";
import AdminDashboard from "./admin-dashboard/page";
import { Toaster } from "react-hot-toast";

const layout = ({ children }) => {
  return (
    <div>
      <Toaster position="top-center" />
      <AdminDashboard />

      {children}
    </div>
  );
};

export default layout;
