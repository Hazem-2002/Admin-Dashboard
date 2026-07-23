import React from "react";
import { useState } from "react";

import Button from "../../../components/Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = "!bg-blue-500",
}) => {
  const [loading, setLoading] = useState(false);

  const confirmHandler = async () => {
    try {
      setLoading(true);
      await onConfirm?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!loading ? onClose : undefined}
      slotProps={{
        backdrop: {
          className: "!bg-black/75 dark:!bg-black/60",
        },

        paper: {
          className:
            "!bg-bg-card !border !border-border !rounded-2xl !max-h-[80vh] !w-screen sm:!w-[35vw]",
        },
      }}
      disableScrollLock
    >
      <DialogTitle className="!text-text-primary !pb-2 !font-semibold">
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText className="!text-text-primary/85 dark:!text-text-muted/95 !text-sm">
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions className="!px-4 !pb-4">
        <Button
          text={cancelText}
          onClick={onClose}
          loading={loading}
          variant="secondary"
        />

        <Button
          text={confirmText}
          loading={loading}
          variant="contained"
          onClick={confirmHandler}
          className={`${confirmButtonColor} !font-semibold !rounded-md`}
        />

      </DialogActions>
    </Dialog>
  );
};

export default React.memo(ConfirmationDialog);
