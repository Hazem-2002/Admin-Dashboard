import React from "react";
import {
  Drawer,
  IconButton,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { updateOrderStatusThunk } from "../../../features/orders/Thunks/UpdateOrderStatusThunk";
import { useSelector } from "react-redux";

const OrderDetailsDrawer = ({ open, onClose, order }) => {
  const changeOrderStatusDispatch = useDispatch();
  const { loading } = useSelector((store) => store.orders);
  const [formData, setFormData] = useState({
    status: order.status,
    adminNote: "",
  });

  const changeOrderStatusHandler = async (data) => {
    await changeOrderStatusDispatch(updateOrderStatusThunk(data));
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          className: "!bg-bg-card !w-screen sm:!w-[380px] p-4 hide-scrollbar",
        },
      }}
    >
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <h2 className="capitalize text-text-primary/95 text-[14px] font-bold">
              Order details
            </h2>
          </div>
          <IconButton
            onClick={onClose}
            className="!text-secondary/80 hover:!text-secondary !transition"
            size="small"
          >
            <CloseIcon className="!text-[22px]" />
          </IconButton>
        </div>

        {/* divider */}
        <hr className="border-0 border-t border-secondary/15" />

        <div className="flex justify-between items-center">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
              order.status === "pending"
                ? "border-yellow-500/30 bg-yellow-500/15 text-yellow-600 dark:border-yellow-500/20 dark:bg-yellow-500/10 dark:text-yellow-400"
                : order.status === "processing"
                  ? "border-sky-500/30 bg-sky-500/15 text-sky-600 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-400"
                  : order.status === "confirmed"
                    ? "border-indigo-500/30 bg-indigo-500/15 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400"
                    : order.status === "shipped"
                      ? "border-violet-500/30 bg-violet-500/15 text-violet-600 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400"
                      : order.status === "delivered"
                        ? "border-green-500/30 bg-green-500/15 text-green-600 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-400"
                        : order.status === "cancelled"
                          ? "border-red-500/30 bg-red-500/15 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                          : order.status === "returned"
                            ? "border-orange-500/30 bg-orange-500/15 text-orange-600 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400"
                            : "border-gray-500/30 bg-gray-500/15 text-gray-600 dark:border-gray-500/20 dark:bg-gray-500/10 dark:text-gray-400"
            }`}
          >
            {order.status}
          </span>

          <div className="flex items-center gap-4">
            <span className="text-[10px] text-secondary/90 capitalize">
              {order.paymentMethod}
            </span>

            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                order.paymentStatus === "pending"
                  ? "border-yellow-500/30 bg-yellow-500/15 text-yellow-600 dark:text-yellow-400"
                  : order.paymentStatus === "paid"
                    ? "border-green-500/30 bg-green-500/15 text-green-600 dark:text-green-400"
                    : order.paymentStatus === "failed"
                      ? "border-red-500/30 bg-red-500/15 text-red-600 dark:text-red-400"
                      : order.paymentStatus === "refunded"
                        ? "border-orange-500/30 bg-orange-500/15 text-orange-600 dark:text-orange-400"
                        : order.paymentStatus === "partially_refunded"
                          ? "border-blue-500/30 bg-blue-500/15 text-blue-600 dark:text-blue-400"
                          : order.paymentStatus === "cancelled"
                            ? "border-gray-500/30 bg-gray-500/15 text-gray-600 dark:text-gray-400"
                            : "border-gray-500/30 bg-gray-500/15 text-gray-600 dark:text-gray-400"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* INFO */}
        <div>
          <p className="text-xs text-text-primary/85 font-bold mb-1.5">info</p>

          <div className="flex flex-col gap-4 border border-secondary/15 rounded-md p-4">
            {/* placed */}
            <div className="flex justify-between items-center">
              <p className="text-secondary text-xs capitalize">Placed</p>
              <p className="text-xs text-text-primary/95">
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>

            <hr className="border-0 border-t border-secondary/15" />

            {/* Customer */}
            <div className="flex justify-between items-center">
              <p className="text-secondary text-xs capitalize">Customer</p>
              <p className="text-xs text-text-primary/95">
                {order.user?.username}
              </p>
            </div>

            <hr className="border-0 border-t border-secondary/15" />

            {/* Email */}
            <div className="flex justify-between items-center">
              <p className="text-secondary text-xs capitalize">Email</p>
              <p className="text-xs text-text-primary/95">
                {order.user?.email}
              </p>
            </div>

            <hr className="border-0 border-t border-secondary/15" />

            {/* Ship to */}
            <div className="flex justify-between items-center">
              <p className="text-secondary text-xs capitalize">Ship to</p>
              <p className="text-xs text-text-primary/95">{`${order?.shippingAddress?.city}, ${order?.shippingAddress?.country}`}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <p className="text-xs text-text-primary/85 font-bold mb-1.5">items</p>

          <div className="flex flex-col gap-4 border border-secondary/15 rounded-md p-3">
            {order?.items?.map((item, index, array) => (
              <div key={item} className="flex flex-col gap-2">
                <div
                  className={`flex justify-between items-center ${array.length - 1 !== index ? "border-b border-secondary/15 pb-4" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={`Item ${index + 1}`}
                      className="size-10 rounded-md object-cover"
                    />

                    <div className="flex flex-col gap-0.75">
                      <h3 className="text-text-primary text-[12px] font-semibold">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-secondary">
                        {item.quantity} ×{" "}
                        {new Intl.NumberFormat("en-EG", {
                          style: "currency",
                          currency: "EGP",
                        }).format(item.price)}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-text-primary/95 font-bold">
                    {new Intl.NumberFormat("en-EG", {
                      style: "currency",
                      currency: "EGP",
                    }).format(item.quantity * item.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex flex-col gap-4 border border-secondary/15 rounded-md p-4">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <p className="text-secondary text-xs capitalize">subtotal</p>
            <p className="text-xs text-text-primary/95">
              {new Intl.NumberFormat("en-EG", {
                style: "currency",
                currency: "EGP",
              }).format(order?.subtotal)}
            </p>
          </div>

          <hr className="border-0 border-t border-secondary/15" />

          {/* Shipping */}
          <div className="flex justify-between items-center">
            <p className="text-secondary text-xs capitalize">Shipping</p>
            <p className="text-xs text-text-primary/95">
              {new Intl.NumberFormat("en-EG", {
                style: "currency",
                currency: "EGP",
              }).format(order?.shippingFee)}
            </p>
          </div>

          <hr className="border-0 border-t border-secondary/15" />

          {/* Tax */}
          <div className="flex justify-between items-center">
            <p className="text-secondary text-xs capitalize">Tax (14%)</p>
            <p className="text-xs text-text-primary/95">
              {new Intl.NumberFormat("en-EG", {
                style: "currency",
                currency: "EGP",
              }).format(order?.tax)}
            </p>
          </div>

          <hr className="border-0 border-t border-secondary/15" />

          {/* Total */}
          <div className="flex justify-between items-center">
            <p className="text-text-primary/95 font-semibold text-xs capitalize">
              total
            </p>
            <p className="text-[13px] text-text-primary font-bold">
              {new Intl.NumberFormat("en-EG", {
                style: "currency",
                currency: "EGP",
              }).format(order?.totalPrice)}
            </p>
          </div>
        </div>

        {/* Update status */}
        <div className="flex flex-col gap-4 border border-secondary/15 rounded-md p-4">
          <Select
            id="category"
            value={formData.status || order.status}
            onChange={(e) => {
              setFormData({ ...formData, status: e.target.value });
            }}
            displayEmpty
            className={`!w-full !h-10.5 !bg-info-bg/25 !text-sm !text-text-primary/85 capitalize !rounded-md !outline-none !transition-all !duration-200 [&_.MuiOutlinedInput-notchedOutline]:!border [&_.MuiOutlinedInput-notchedOutline]:!border-border [&.Mui-focused]:!ring-2 [&.Mui-focused]:!ring-primary/30 dark:[&.Mui-focused]:!ring-primary/70 [&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!border-0 [&_.MuiSelect-icon]:!text-text-primary/60`}
            MenuProps={{
              slotProps: {
                paper: {
                  className:
                    "hide-scrollbar !bg-bg-hover !text-text-primary !border !border-primary/15 !rounded-lg",
                },
              },
            }}
          >
            <MenuItem
              value="pending"
              className={`hover:!bg-secondary/4 !transition !duration-100 !text-[12px] !py-1 capitalize [&.Mui-selected]:!bg-primary/70 [&.Mui-selected:hover]:!bg-primary/70`}
            >
              pending
            </MenuItem>

            <MenuItem
              value="confirmed"
              className={`hover:!bg-secondary/4 !transition !duration-100 !text-[12px] !py-1 capitalize [&.Mui-selected]:!bg-primary/70 [&.Mui-selected:hover]:!bg-primary/70`}
            >
              confirmed
            </MenuItem>

            <MenuItem
              value="processing"
              className={`hover:!bg-secondary/4 !transition !duration-100 !text-[12px] !py-1 capitalize [&.Mui-selected]:!bg-primary/70 [&.Mui-selected:hover]:!bg-primary/70`}
            >
              processing
            </MenuItem>

            <MenuItem
              value="shipped"
              className={`hover:!bg-secondary/4 !transition !duration-100 !text-[12px] !py-1 capitalize [&.Mui-selected]:!bg-primary/70 [&.Mui-selected:hover]:!bg-primary/70`}
            >
              shipped
            </MenuItem>

            <MenuItem
              value="delivered"
              className={`hover:!bg-secondary/4 !transition !duration-100 !text-[12px] !py-1 capitalize [&.Mui-selected]:!bg-primary/70 [&.Mui-selected:hover]:!bg-primary/70`}
            >
              delivered
            </MenuItem>

            <MenuItem
              value="cancelled"
              className={`hover:!bg-secondary/4 !transition !duration-100 !text-[12px] !py-1 capitalize [&.Mui-selected]:!bg-primary/70 [&.Mui-selected:hover]:!bg-primary/70`}
            >
              cancelled
            </MenuItem>

            <MenuItem
              value="returned"
              className={`hover:!bg-secondary/4 !transition !duration-100 !text-[12px] !py-1 capitalize [&.Mui-selected]:!bg-primary/70 [&.Mui-selected:hover]:!bg-primary/70`}
            >
              returned
            </MenuItem>
          </Select>

          <textarea
            rows={3}
            placeholder="Admin note (optional)..."
            value={formData.adminNote}
            onChange={(e) =>
              setFormData({ ...formData, adminNote: e.target.value })
            }
            className="resize-none py-2 px-2.5 text-text-primary/85 !bg-info-bg/25 !text-sm border border-border outline-0 !rounded-md !outline-0 !transition-all !duration-200 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 placeholder:text-text-muted/60"
          ></textarea>

          <Button
            variant="contained"
            disabled={loading}
            className="!bg-primary/80 hover:!bg-primary/65 !capitalize !rounded-md !text-white/90 !font-semibold"
            onClick={() =>
              changeOrderStatusHandler({
                id: order._id,
                status: formData.status || order.status,
                adminNote: formData.adminNote,
              })
            }
          >
            <div className="flex gap-2 items-center">
              {loading && (
                <CircularProgress size={16} className="!text-white" />
              )}

              {loading ? "saving" : "save changes"}
            </div>
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default React.memo(OrderDetailsDrawer);
