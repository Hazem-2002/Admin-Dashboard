import React from "react";
import { DateFormat } from "../../../utils/DateFormat";
import { CurrencyFormat } from "../../../utils/CurrencyFormat";

const RecentOrders = ({ data }) => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl p-6 border border-border bg-bg-card shadow">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[14px] font-semibold text-primary tracking-[0.15rem] uppercase">
            Recent orders
          </h2>
          <p className="flex items-center justify-center rounded-full bg-primary/8 text-primary border border-primary/10 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold">
            {data.dashboard?.recentOrders?.length} Orders
          </p>
        </div>

        <p className="text-xs tracking-[0.035rem] text-text-muted">
          View the most recent customer orders and their current status
        </p>
      </div>

      {/* Recent orders list */}
      <div className="flex flex-col gap-3">
        {data.dashboard?.recentOrders?.map((order) => (
          <div
            key={order._id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 py-3 rounded-2xl bg-secondary/2 dark:bg-secondary/5 hover:bg-secondary/5 dark:hover:bg-secondary/10 border border-secondary/5 transition-all duration-300 will-change-transform"
          >
            <div className="flex flex-col grow gap-1">
              <h3 className="text-sm font-semibold text-text-primary">
                {order.user?.username}
              </h3>
              <p className="text-[11px] sm:text-xs tracking-[0.03rem] text-text-muted whitespace-pre-wrap">
                {order.items?.map((item) => item.name).join("  •  ")} {" • "}
                <span className="text-primary/65 font-semibold whitespace-nowrap">
                  {DateFormat(order.updatedAt)}
                </span>
              </p>
            </div>

            <div className="flex grow-0 items-center gap-4 max-sm:justify-between">
              <p
                className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] sm:text-xs font-semibold capitalize
    ${
      order.status === "pending"
        ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
        : order.status === "processing"
          ? "bg-sky-500/10 text-sky-300 border border-sky-500/20"
          : order.status === "confirmed"
            ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
            : order.status === "shipped"
              ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
              : order.status === "delivered"
                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                : order.status === "cancelled"
                  ? "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                  : "bg-slate-700/20 text-slate-300 border border-slate-600/20"
    }`}
              >
                {order.status}
              </p>
              <p className="text-xs sm:text-sm font-semibold">
                {CurrencyFormat(order.totalPrice)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(RecentOrders);
