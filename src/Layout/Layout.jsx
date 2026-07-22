import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-bg-main text-text-primary">
      {/* Sidebar */}
      <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />

      {/* Main Content */}
      <div className="ml-0 lg:ml-54 xl:ml-72">
        {/* Header */}
        <Header handleDrawerToggle={handleDrawerToggle} />

        {/* Page Content */}
        <section className="flex-1">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default React.memo(Layout);
