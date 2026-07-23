import React from "react";
import { useState } from "react";

import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Label from "../../../components/Label";

import CloseIcon from "@mui/icons-material/Close";

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
        <DialogTitle className="!p-0 !text-2xl !font-bold !text-text-primary">
          {title}
        </DialogTitle>

        <IconButton
          onClick={closeHandler}
          disabled={loading}
          className="!text-text-primary/35 hover:!text-text-primary/50 transition"
        >
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent className="!px-6 !pb-6">
        <form onSubmit={confirmHandler}>
          {/* Username */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="username" value="Username" />
            <Input
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              id="username"
              name="username"
              type="text"
            />

            <p className="mt-1 text-sm text-red-400 min-h-[20px]">
              {errors.username || ""}
            </p>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="phone"
              value="Phone"
              className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500/80 dark:text-slate-400"
            />
            <Input
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              id="phone"
              name="phone"
              type="text"
            />
            <p className="mt-1 text-sm text-red-400 min-h-[20px]">
              {errors.phone || ""}
            </p>
          </div>

          {/* Avatar */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="avatar" value="Avatar URL" />
            <Input
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              id="avatar"
              name="avatar"
              type="url"
            />
            <p className="mt-1 text-sm text-red-400 min-h-[20px]">
              {errors.avatar || ""}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="secondary"
              text="Cancel"
              onClick={closeHandler}
              loading={loading}
            />

            <Button
              type="submit"
              text="Save Changes"
              loadingText="Saving"
              variant="primary"
              loading={loading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(EditUserDialog);
