// src/layout/AdminLayout.jsx
import { useState } from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className={`main-content ${collapsed ? "collapsed" : ""}`}>
        <Header />
        <div className="page-content">{children}</div>
      </div>

    </div>
  );
};

export default AdminLayout;
