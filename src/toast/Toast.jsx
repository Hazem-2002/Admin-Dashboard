import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { hideToast } from "../features/Toast/toastSlice.js";
import { useDispatch } from "react-redux";

const Toast = ({ open, message, severity }) => {
  const toastDispatch = useDispatch();

  const closeHandler = () => {
    toastDispatch(hideToast());
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeHandler}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={closeHandler}
        severity={severity}
        variant="filled"
        className={`!bg-bg-active !text-text-primary !shadow ${
          severity === "success"
            ? "[&_.MuiAlert-icon]:!text-green-500"
            : "[&_.MuiAlert-icon]:!text-red-500"
        }`}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default React.memo(Toast);
