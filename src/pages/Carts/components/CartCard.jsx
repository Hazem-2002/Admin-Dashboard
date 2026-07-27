import React from "react";
import { Avatar, AvatarGroup, Chip, Tooltip } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import Button from "../../../components/Button";

const CartCard = ({ cart, onView }) => {
  const { user, items, subtotal, createdAt, updatedAt } = cart;

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-bg-card transition-all duration-300 hover:-translate-y-1 will-change-transform hover:border-primary/30 shadow hover:ring-2 hover:ring-primary/10 dark:hover:ring-primary/15">
      {/* Header */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-4">
        <div className="absolute -right-10 -top-10 h-18 w-18 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="!h-11 !w-11 !bg-primary !text-base !font-bold">
              {user?.username?.slice(0, 2).toUpperCase()}
            </Avatar>

            <div>
              <h3 className="text-base font-semibold text-text-primary">
                {user?.username}
              </h3>

              <p className="text-xs text-text-muted">{user?.email}</p>
            </div>
          </div>

          <Chip
            label="Active Cart"
            size="small"
            className="!h-7 !rounded-full !bg-primary/10 !text-primary !border !border-primary/25 !font-semibold !text-xs !tracking-wide !px-1"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-5 p-5">
        <div className="flex flex-col gap-2 justify-between rounded-2xl bg-secondary/5 dark:bg-secondary/10 p-4 shadow">
          <div className="flex items-center gap-2 text-text-muted">
            <ShoppingCartRoundedIcon className="!size-4 sm:!size-5" />
            <span className="text-[11px] sm:text-xs uppercase">Items</span>
          </div>

          <h4 className="text-[13px] sm:text-[15px] font-semibold leading-none">
            {items.length}
          </h4>
        </div>

        <div className="flex flex-col gap-2 justify-between rounded-2xl bg-secondary/5 dark:bg-secondary/10 p-4 shadow">
          <div className="flex items-center gap-2 text-text-muted">
            <PaidRoundedIcon className="!size-4 sm:!size-5" />
            <span className="text-[11px] sm:text-xs uppercase">Subtotal</span>
          </div>

          <h4 className="text-[13px] sm:text-[15px] font-semibold leading-none">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "EGP",
            }).format(subtotal)}
          </h4>
        </div>

        <div className="flex flex-col gap-2 justify-between rounded-2xl bg-secondary/5 dark:bg-secondary/10 p-4 shadow">
          <div className="flex items-center gap-2 text-text-muted">
            <CalendarMonthRoundedIcon className="!size-4 sm:!size-5" />
            <span className="text-[11px] sm:text-xs uppercase">Created</span>
          </div>

          <h4 className="text-[13px] sm:text-[15px] font-semibold leading-none">
            {new Date(createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </h4>
        </div>

        <div className="flex flex-col gap-2 justify-between rounded-2xl bg-secondary/5 dark:bg-secondary/10 p-4 shadow">
          <div className="flex items-center gap-2 text-text-muted">
            <AccessTimeRoundedIcon className="!size-4 sm:!size-5" />
            <span className="text-[11px] sm:text-xs uppercase">Updated</span>
          </div>

          <h4 className="text-[13px] sm:text-[15px] font-semibold leading-none">
            {new Date(updatedAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </h4>
        </div>
      </div>

      {/* Products Preview */}
      <div className="border-t border-border px-5 py-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold">Products</p>

          <span className="text-xs text-text-muted">
            {items.length} Products
          </span>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row lg:items-center gap-4 justify-between">
          <AvatarGroup
            max={4}
            spacing="small"
            className="!mx-auto sm:!m-0 md:!mx-auto lg:!m-0"
            renderSurplus={(surplus) => (
              <Avatar className="!bg-primary/60">+{surplus}</Avatar>
            )}
          >
            {items.map((item) => (
              <Tooltip
                key={item._id}
                title={item.name}
                slotProps={{
                  tooltip: {
                    className:
                      "!bg-bg-card !border !border-border !text-text-primary",
                  },
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -5],
                        },
                      },
                    ],
                  },
                }}
              >
                <Avatar src={item.image} alt={item.name} />
              </Tooltip>
            ))}
          </AvatarGroup>

          <Button
            variant="primary"
            className="!px-4"
            startIcon={<VisibilityRoundedIcon />}
            endIcon={
              <ArrowForwardRoundedIcon className="transition-transform duration-300 group-hover:translate-x-1" />
            }
            text="View Details"
            onClick={() => onView(cart)}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CartCard);
