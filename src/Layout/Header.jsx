import React from "react";
import { Button, Badge, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = ({ handleDrawerToggle }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const logoutDispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleLogOut = async () => {
    try {
      await logoutDispatch(logout()).unwrap();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <header className="sticky top-0 border-b border-border px-4 md:px-6 py-2.5 shadow-sm flex items-center bg-bg-navbar dark:bg-bg-navbar/70 z-sticky">
      <div className="w-full flex justify-between items-center bg-bg-navbar dark:bg-bg-navbar/80">
        <div className="flex items-center gap-4">
          <Button
            variant="contained"
            className="!flex lg:!hidden !min-w-0 !bg-info-bg hover:!bg-info-bg/70 !p-2 !rounded-md !border !border-border !text-text-primary"
            onClick={handleDrawerToggle}
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
              className="lucide lucide-menu-icon lucide-menu !size-5"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </Button>

          <div className="hidden md:flex gap-6">
            <img
              src={
                theme === "dark"
                  ? "../../../public/darkLogo.png"
                  : "../../../public/logo.png"
              }
              alt="logo"
              className="w-32"
            />
            <div className="hidden md:flex flex-col gap-1">
              <h3 className="text-text-primary text-lg capitalize font-semibold">
                Admin Dashboard
              </h3>
              <p className="text-xs text-text-secondary">
                E-Commerce Admin Panel
              </p>
            </div>
          </div>
        </div>

        <div className="flex md:hidden !bg-info-bg px-2 py-1.5 gap-2 rounded-2xl border border-border shadow">
          <Avatar
            alt="HM"
            src="/"
            className="!size-8 !bg-gradient-to-br !from-primary-hover !to-primary !text-sm !font-bold !text-white"
          >
            HM
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-[11px] font-bold text-text-primary/95 capitalize">
              {user?.username}
            </h3>
            <p className="text-[10px] text-text-secondary capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        <div className="flex md:items-center gap-3">
          {/* Notification */}
          <Button
            variant="contained"
            className="!bg-info-bg hover:!bg-info-bg/70 !min-w-0 !p-0 !p-2.5 !rounded-md !border !border-border !duration-0"
          >
            <Badge
              variant="dot"
              overlap="circular"
              slotProps={{
                badge: { className: "!bg-danger" },
              }}
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
                className="lucide lucide-bell-icon lucide-bell !text-text-primary !size-5"
              >
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
              </svg>
            </Badge>
          </Button>
          {/* Change Theme */}
          <Button
            variant="contained"
            className="!bg-info-bg hover:!bg-info-bg/70 !min-w-0 !p-0 !p-2.5 !rounded-md !border !border-border !duration-0"
            onClick={handleChangeTheme}
          >
            {theme === "dark" ? (
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
                className="lucide lucide-sun-icon lucide-sun !text-warning !size-5"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
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
                className="lucide lucide-moon-icon lucide-moon !text-text-primary !size-5"
              >
                <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
              </svg>
            )}
          </Button>
          <div className="hidden md:flex !bg-info-bg px-3 py-2 gap-2 rounded-2xl border border-border shadow">
            <Avatar
              alt="HM"
              src="/"
              className="!size-10 !bg-gradient-to-br !from-primary-hover !to-primary !text-sm !font-bold !text-white"
            >
              HM
            </Avatar>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-text-primary/95 capitalize">
                {user?.username}
              </h3>
              <p className="text-xs text-text-secondary capitalize">
                {user?.role}
              </p>
            </div>
          </div>
          {/* Logout */}
          <Button
            variant="contained"
            onClick={handleLogOut}
            className="!bg-danger !text-text-primary !capitalize !min-w-0 !px-3 !py-2 !rounded-md hover:!bg-danger/70"
          >
            <div className="flex items-center gap-1">
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
                className="lucide lucide-log-out-icon lucide-log-out !size-4"
              >
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              </svg>
              <span className="hidden md:inline">Logout</span>
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
