import React from "react";
import AdminDashboard from "./admin-dashboard/page";

const layout = ({ children }) => {
  return <div>
    <AdminDashboard/>
    {children}
    </div>;
};

export default layout;
