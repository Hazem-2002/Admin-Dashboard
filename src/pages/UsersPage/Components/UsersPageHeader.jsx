import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserThunk } from "../../../features/users/Thunks/AddUserThunk";
import {
  IconButton,
  Button,
  InputBase,
  InputLabel,
  InputAdornment,
  Collapse,
} from "@mui/material";
import Toast from "../../../toast/Toast";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

const ProductsPageHeader = ({ inputSearch, handleSearch }) => {
  const initialNewUserData = {
    username: "",
    email: "",
    password: "",
    phone: "",
  };

  const initialErrors = { username: "", email: "", password: "", phone: "" };
  const usersDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);

  // Control Password Visibility
  const [showPassword, setShowPassword] = useState(false);

  // New User Data
  const [newUserData, setNewUserData] = useState(initialNewUserData);

  // Fields Errors
  const [errors, setErrors] = useState(initialErrors);

  // Toast Control
  const [openToast, setOpenToast] = useState(false);

  // Toast Data
  const [toastData, setToastData] = useState({
    message: "User added successfully!",
    severity: "success",
  });

  const handleReset = () => {
    setNewUserData(initialNewUserData);
    setErrors(initialErrors);
  };

  const regex = {
    username: /^[a-zA-Z0-9_\p{L}\s]{3,30}$/u,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^\S{6,}$/,
    phone: /^01[0125]\d{8}$/,
  };

  const validate = () => {
    const newErrors = {};

    if (!regex.username.test(newUserData.username.trim())) {
      newErrors.username = "Invalid username.";
    }

    if (!regex.email.test(newUserData.email.trim())) {
      newErrors.email = "Invalid email.";
    }

    if (!regex.password.test(newUserData.password)) {
      newErrors.password = "Min. 6 characters.";
    }

    if (!regex.phone.test(newUserData.phone.trim())) {
      newErrors.phone = "Invalid phone number.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await usersDispatch(addUserThunk(newUserData)).unwrap();

      setToastData({
        message: "User added successfully!",
        severity: "success",
      });
    } catch (error) {
      setToastData({
        message: error || "Failed to add user!",
        severity: "error",
      });
    } finally {
      setLoading(false);
      setOpenToast(true);
      handleReset();
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-8 items-stretch justify-start sm:items-center sm:justify-between lg:items-stretch lg:justify-start xl:items-center xl:justify-between p-6 bg-bg-card/75 dark:bg-bg-card rounded-3xl border border-slate-300/30 dark:border-slate-700/50 shadow">
          <div className="flex flex-col gap-2">
            <h2 className="uppercase tracking-[0.2rem] font-bold text-primary/98">
              User Management
            </h2>
            <h2 className="font-semibold text-3xl text-text-primary">
              Manage Users
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            <InputBase
              placeholder="Search users..."
              value={inputSearch}
              onChange={(e) => handleSearch(e.target.value)}
              className="!h-12 !min-w-64 !grow lg:!grow xl:!grow-0 !rounded-2xl !border !border-border !bg-info-bg/25 !transition-all !duration-200 focus-within:!ring-2 focus-within:!ring-primary/30 dark:focus-within:!ring-primary/70"
              slotProps={{
                input: {
                  className:
                    "!h-full !w-full !pr-4 !text-sm !text-text-primary !outline-none placeholder:!text-text-muted",
                },
              }}
              startAdornment={
                <InputAdornment className="flex justify-center !h-12 !w-13 !py-3 !text-secondary/70">
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
                    className="lucide lucide-search-icon lucide-search !size-5"
                  >
                    <path d="m21 21-4.34-4.34" />
                    <circle cx="11" cy="11" r="8" />
                  </svg>
                </InputAdornment>
              }
            />
            <Button
              className="flex gap-2 !px-3.5 !py-1.5 !bg-gradient-to-br !from-primary/55 !to-primary-hover/55 hover:!from-primary/40 hover:!to-primary-hover/40 dark:!from-primary/90 dark:hover:!to-primary-hover/75 dark:hover:!from-primary/75 dark:!to-primary-hover/90 !transition !duration-250 !shadow-[0_0_5px] !shadow-slate-400/30 dark:!shadow-slate-400/70 !rounded-lg !text-text-primary/90"
              onClick={() => {
                setOpenCollapse(!openCollapse);
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
                className="lucide lucide-user-plus-icon lucide-user-plus !size-5"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>

              <span className="font-semibold capitalize">Add User</span>

              {openCollapse ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </Button>
          </div>
        </div>

        {/* Collapse Form */}
        <Collapse in={openCollapse} timeout={300}>
          <div className="mt-8 bg-slate-200/60 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-300/40 dark:border-slate-700/50">
            {/* Header */}
            <div className="flex justify-between items-center bg-slate-200/70 dark:bg-slate-800/75 p-5">
              <div className="flex gap-3 items-center justify-start">
                {/* Icon */}
                <div className="flex items-center justify-center size-10 rounded-xl bg-slate-400/25 dark:bg-slate-300/50 dark:bg-slate-500 hover:-rotate-12 transition duration-250 shadow-[0_0_5px] shadow-slate-500/40 dark:shadow-slate-400/70 will-change-transform">
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
                    className="lucide lucide-user-plus-icon lucide-user-plus"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" x2="19" y1="8" y2="14" />
                    <line x1="22" x2="16" y1="11" y2="11" />
                  </svg>
                </div>
                {/* Title && Description */}
                <div className="flex flex-col gap-1">
                  <h2 className="capitalize text-slate-500/85 dark:text-slate-200 font-bold">
                    Create New User
                  </h2>
                  <p className="text-sm text-slate-500/85 dark:text-slate-300">
                    Fill in the details below to add a new user
                  </p>
                </div>
              </div>
              {/* Close Button */}
              <IconButton
                size="small"
                className="!text-slate-500/60 hover:!text-slate-500/80 dark:!text-slate-400/80 dark:hover:!text-slate-300 !transition !duration-150"
                onClick={() => setOpenCollapse(false)}
              >
                <CloseIcon />
              </IconButton>
            </div>

            {/* Body (Form) */}
            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 pt-6 px-6">
                {/* Username */}
                <div className="flex flex-col gap-2">
                  <InputLabel
                    required
                    className="!uppercase !text-slate-400/90 !text-xs [&_.MuiFormLabel-asterisk]:!text-red-500"
                  >
                    Username
                  </InputLabel>
                  <InputBase
                    type="text"
                    placeholder="e.g.john_doe"
                    value={newUserData.username}
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        username: e.target.value,
                      });
                    }}
                    className="!h-10 !px-4 !rounded-xl !border !border-slate-300/55 dark:!border-slate-700/80 !bg-white/55 dark:!bg-slate-600/30 !text-slate-500/80 dark:!text-slate-200/90 transition-all duration-200 [&.Mui-focused]:!shadow-[0_0_8px] [&.Mui-focused]:!shadow-slate-400/40 dark:[&.Mui-focused]:!shadow-slate-200/30 [&_input::placeholder]:!text-slate-500/85 dark:[&_input::placeholder]:!text-slate-200 [&_input::placeholder]:!text-sm !text-sm"
                  />
                  {errors.username && (
                    <p className="text-sm text-red-400 min-h-[20px]">
                      {errors.username || ""}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <InputLabel
                    required
                    className="!uppercase !text-slate-400/90 dark:!text-slate-400/90 !text-xs [&_.MuiFormLabel-asterisk]:!text-red-500"
                  >
                    Email
                  </InputLabel>
                  <InputBase
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        email: e.target.value,
                      });
                    }}
                    placeholder="e.g. john@gmail.com"
                    className="!h-10 !px-4 !rounded-xl !border !border-slate-300/55 dark:!border-slate-700/80 !bg-white/55 dark:!bg-slate-600/30 !text-slate-500/80 dark:!text-slate-200/90 transition-all duration-200 [&.Mui-focused]:!shadow-[0_0_8px] [&.Mui-focused]:!shadow-slate-400/40 dark:[&.Mui-focused]:!shadow-slate-200/30 [&_input::placeholder]:!text-slate-500/85 dark:[&_input::placeholder]:!text-slate-200 [&_input::placeholder]:!text-sm !text-sm"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400 min-h-[20px]">
                      {errors.email || ""}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <InputLabel
                    required
                    className="!uppercase !text-slate-400/90 !text-xs [&_.MuiFormLabel-asterisk]:!text-red-500"
                  >
                    Password
                  </InputLabel>
                  <InputBase
                    type={showPassword ? "text" : "password"}
                    value={newUserData.password}
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        password: e.target.value,
                      });
                    }}
                    placeholder="Min. 6 characters"
                    className="!h-10 !px-4 !rounded-xl !border !border-slate-300/55 dark:!border-slate-700/80 !bg-white/55 dark:!bg-slate-600/30 !text-slate-500/80 dark:!text-slate-200/90 transition-all duration-200 [&.Mui-focused]:!shadow-[0_0_8px] [&.Mui-focused]:!shadow-slate-400/40 dark:[&.Mui-focused]:!shadow-slate-200/30 [&_input::placeholder]:!text-slate-500/85 dark:[&_input::placeholder]:!text-slate-200 [&_input::placeholder]:!text-sm !text-sm"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          edge="end"
                          disableRipple
                          className="!text-slate-400/60 hover:!text-slate-400/75 !bg-transparent dark:!text-slate-500 dark:hover:!text-slate-400 !transition !duration-100"
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {errors.password && (
                    <p className="text-sm text-red-400 min-h-[20px]">
                      {errors.password || ""}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <InputLabel
                    required
                    className="!uppercase !text-slate-400/90 !text-xs [&_.MuiFormLabel-asterisk]:!text-red-500"
                  >
                    Phone
                  </InputLabel>
                  <InputBase
                    type="text"
                    value={newUserData.phone}
                    onChange={(e) => {
                      setNewUserData({
                        ...newUserData,
                        phone: e.target.value,
                      });
                    }}
                    placeholder="e.g. +1 023 612 348"
                    className="!h-10 !px-4 !rounded-xl !border !border-slate-300/55 dark:!border-slate-700/80 !bg-white/55 dark:!bg-slate-600/30 !text-slate-500/80 dark:!text-slate-200/90 transition-all duration-200 [&.Mui-focused]:!shadow-[0_0_8px] [&.Mui-focused]:!shadow-slate-400/40 dark:[&.Mui-focused]:!shadow-slate-200/30 [&_input::placeholder]:!text-slate-500/85 dark:[&_input::placeholder]:!text-slate-200 [&_input::placeholder]:!text-sm !text-sm"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-400 min-h-[20px]">
                      {errors.phone || ""}
                    </p>
                  )}
                </div>
              </div>
              <hr className="mx-6 border-0 border-t border-slate-300/55 dark:!border-slate-800" />

              {/* Actions */}
              <div className="flex justify-end">
                <div className="flex gap-3 pb-6 px-6">
                  <Button
                    type="button"
                    onClick={handleReset}
                    className="!rounded-xl !border !border-slate-400/30 dark:!border-slate-700/80 !px-3 !py-2 !font-medium !text-slate-500 dark:!text-slate-300 !transition hover:!bg-gray-400/10 dark:hover:!bg-slate-800/60 !capitalize"
                  >
                    Clear
                  </Button>

                  <Button
                    onClick={handleCreateUser}
                    loadingPosition="start"
                    type="submit"
                    startIcon={
                      loading ? (
                        <CircularProgress
                          size={18}
                          className="!text-slate-600 dark:!text-slate-300"
                        />
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
                          className="!size-5"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <line x1="19" x2="19" y1="8" y2="14" />
                          <line x1="22" x2="16" y1="11" y2="11" />
                        </svg>
                      )
                    }
                    className="!px-4 !py-1.5 !bg-slate-400/30 dark:!bg-slate-500/50 !transition !duration-250 !shadow-[0_0_5px] !shadow-slate-400/30 dark:!shadow-slate-400/70 !rounded-xl !text-slate-600/80 dark:!text-slate-300 hover:!bg-slate-400/40 dark:hover:!bg-slate-600/70"
                  >
                    <span className="font-semibold capitalize">Add</span>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Collapse>
      </div>
      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        message={toastData.message}
        severity={toastData.severity}
      />
    </>
  );
};

export default React.memo(ProductsPageHeader);
