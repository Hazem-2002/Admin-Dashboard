import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Button from "../components/Button";

const EditUserDialog = ({
  open,
  onClose,
  onConfirm,
  values,
  title = "Edit User",
}) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(values);

  const [errors, setErrors] = useState({
    username: "",
    phone: "",
    avatar: "",
  });

  const closeHandler = () => {
    onClose();
    setErrors({ username: "", phone: "", avatar: "" });
    setFormData(values);
  };

  const regex = {
    username: /^[\p{L}\s]{3,30}$/u,
    phone: /^01[0125][0-9]{8}$/,
    avatar: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))(?:\?.*)?$/i,
  };

  const validate = () => {
    const newErrors = {};

    if (!regex.username.test(formData.username.trim())) {
      newErrors.username = "Username must be 3-30 letters only.";
    }

    if (!regex.phone.test(formData.phone.trim())) {
      newErrors.phone = "Invalid Egyptian phone number.";
    }

    if (!regex.avatar.test(formData.avatar.trim())) {
      newErrors.avatar = "Please enter a valid image URL.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const confirmHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      await onConfirm(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!loading ? closeHandler : undefined}
      fullWidth
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
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6">
        <DialogTitle className="!p-0 !text-2xl !font-bold !text-secondary dark:!text-text-primary/95">
          {title}
        </DialogTitle>

        <IconButton
          onClick={closeHandler}
          disabled={loading}
          className="!text-secondary/80 hover:!text-secondary"
        >
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent className="!px-6 !pb-6">
        <form onSubmit={confirmHandler}>
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/75 dark:text-secondary/90"
            >
              Username
            </label>

            <input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              id="username"
              name="username"
              type="text"
              className="w-full bg-info-bg/25 py-3 px-4 text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-full outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
            />

            <p className="mt-1 text-sm text-red-400 min-h-[20px]">
              {errors.username || ""}
            </p>
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/75 dark:text-secondary/90"
            >
              Phone
            </label>

            <input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              id="phone"
              name="phone"
              type="text"
              className="w-full bg-info-bg/25 py-3 px-4 text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-full outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
            />

            <p className="mt-1 text-sm text-red-400 min-h-[20px]">
              {errors.phone || ""}
            </p>
          </div>

          {/* Avatar */}
          <div>
            <label
              htmlFor="avatar"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-secondary/75 dark:text-secondary/90"
            >
              Avatar URL
            </label>

            <input
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              id="avatar"
              name="avatar"
              type="url"
              className="w-full bg-info-bg/25 py-3 px-4 text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-full outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
            />

            <p className="mt-1 text-sm text-red-400 min-h-[20px]">
              {errors.avatar || ""}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              text="Cancel"
              onClick={closeHandler}
              variant="secondary"
              className="!bg-red-500 !text-white"
            />

            <Button
              type="submit"
              disabled={loading}
              className="!capitalize !font-semibold !rounded-full !px-4 !py-2.5 !bg-primary/80 hover:!bg-primary-hover/70 disabled:!opacity-70 !text-white !flex !items-center !gap-2"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
