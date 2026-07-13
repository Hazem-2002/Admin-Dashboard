import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = "!bg-success",
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
            "!bg-bg-card !border !border-border !rounded-3xl !max-h-[80vh] !w-screen sm:!w-[35vw]",
        },
      }}
      disableScrollLock
    >
      <DialogTitle className="!text-text-primary !pb-2 !font-semibold">
        {title}
      </DialogTitle>

      <DialogContent>
        <DialogContentText className="!text-text-primary/70 !text-sm">
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions className="!px-4 !pb-4">
        <Button
          onClick={onClose}
          disabled={loading}
          variant="text"
          className="!text-black dark:!text-white/80 hover:!bg-transparent !rounded-md"
        >
          {cancelText}
        </Button>

        <Button
          loading={loading}
          variant="contained"
          onClick={confirmHandler}
          className={`${confirmButtonColor} !font-semibold !rounded-md`}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
