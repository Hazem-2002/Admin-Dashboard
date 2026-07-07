import React from "react";
import { Snackbar, Alert } from "@mui/material";

const Toast = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        className={`!bg-slate-700 ${
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
