import React from "react";
import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-72 bg-slate-100/50 dark:bg-transparent shadow-xl">
        <aside className="flex h-full p-6 gap-6 flex-col">
          <div>
            <p className="text-xs uppercase font-bold tracking-[0.25em] text-cyan-400">
              Commerce
            </p>
            <h2 className="mt-1 text-xl font-semibold">Admin Panel</h2>
          </div>

          <nav className="space-y-1.5">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-md font-medium transition dark:text-gray-300 ${isActive ? "bg-slate-700 text-slate-200" : "text-slate-800 hover:bg-gray-500/10 dark:hover:bg-gray-600/30"}`
              }
              to="/dashboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-house h-4 w-4"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              Dashboard
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-md font-medium transition dark:text-gray-300 ${isActive ? "bg-slate-700 text-slate-200" : "text-slate-800 hover:bg-gray-500/10 dark:hover:bg-gray-600/30"}`
              }
              to="/users"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users h-4 w-4"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              Users
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-md font-medium transition dark:text-gray-300 ${isActive ? "bg-slate-700 text-slate-200" : "text-slate-800 hover:bg-gray-500/10 dark:hover:bg-gray-600/30"}`
              }
              to="/products"
              aria-current="page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-package h-4 w-4"
              >
                <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path>
                <path d="M12 22V12"></path>
                <path d="m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7"></path>
                <path d="m7.5 4.27 9 5.15"></path>
              </svg>
              Products
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-md font-medium transition dark:text-gray-300 ${isActive ? "bg-slate-700 text-slate-200" : "text-slate-800 hover:bg-gray-500/10 dark:hover:bg-gray-600/30"}`
              }
              to="/products/add"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add Product
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-md font-medium transition dark:text-gray-300 ${isActive ? "bg-slate-700 text-slate-200" : "text-slate-800 hover:bg-gray-500/10 dark:hover:bg-gray-600/30"}`
              }
              to="/orders"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-text h-4 w-4"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                <path d="M10 9H8"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
              </svg>
              Orders
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-md font-medium transition dark:text-gray-300 ${isActive ? "bg-slate-700 text-slate-200" : "text-slate-800 hover:bg-gray-500/10 dark:hover:bg-gray-600/30"}`
              }
              to="/carts"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-shopping-cart h-4 w-4"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              Carts
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-md font-medium transition dark:text-gray-300 ${isActive ? "bg-slate-700 text-slate-200" : "text-slate-800 hover:bg-gray-500/10 dark:hover:bg-gray-600/30"}`
              }
              to="/settings"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-settings h-4 w-4"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Settings
            </NavLink>
          </nav>
        </aside>
      </div>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-20 h-16 border-b px-6 shadow-sm flex items-center bg-red-500">
          Header
        </header>

        {/* Page Content */}
        <section className="flex-1">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default React.memo(Layout);
