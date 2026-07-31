import React from "react";

const OrderStatus = ({ data }) => {
  return (
    <div className="md:sticky left-0 top-24 flex flex-col gap-6 rounded-3xl p-6 border border-border bg-bg-card shadow">
      {/* Header (Title && Subtitle && Updated badge) */}
      <div className="flex flex-col gap-2">
        {/* Title && Updated badge*/}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[14px] font-semibold text-primary tracking-[0.15rem] uppercase">
            Order status
          </h2>
          {/* Updated badge */}
          <h2 className="text-[11px] font-semibold capitalize px-2.5 py-0.5 bg-primary/8 text-primary/90 border border-primary/15 rounded-full">
            updated
          </h2>
        </div>
        {/* Subtitle */}
        <p className="text-xs tracking-[0.04rem] text-text-muted">
          Monitor the current distribution of orders across each fulfillment
          stage
        </p>
      </div>

      {/* Order status chart */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Pending */}
        <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-sm dark:border-orange-500/20 dark:bg-orange-500/10 will-change-transform leading-none">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-300">
            Pending
          </h2>

          <p className="mt-2 text-lg font-bold text-orange-500 dark:text-orange-300">
            {data?.dashboard?.orders?.pending}
          </p>
        </div>

        {/* Processing */}
        <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-sm dark:border-sky-500/20 dark:bg-sky-500/10 will-change-transform leading-none">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-300">
            Processing
          </h2>

          <p className="mt-2 text-lg font-bold text-sky-600 dark:text-sky-300">
            {data?.dashboard?.orders?.processing}
          </p>
        </div>

        {/* Confirmed */}
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 will-change-transform leading-none">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
            Confirmed
          </h2>

          <p className="mt-2 text-lg font-bold text-indigo-500 dark:text-indigo-300">
            {data?.dashboard?.orders?.confirmed}
          </p>
        </div>

        {/* Shipped */}
        <div className="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-sm dark:border-cyan-500/20 dark:bg-cyan-500/10 will-change-transform leading-none">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
            Shipped
          </h2>

          <p className="mt-2 text-lg font-bold text-cyan-500 dark:text-cyan-300">
            {data?.dashboard?.orders?.shipped}
          </p>
        </div>

        {/* Delivered */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 will-change-transform leading-none">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">
            Delivered
          </h2>

          <p className="mt-2 text-lg font-bold text-emerald-500 dark:text-emerald-300">
            {data?.dashboard?.orders?.delivered}
          </p>
        </div>

        {/* Cancelled */}
        <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-sm dark:border-rose-500/20 dark:bg-rose-500/10 will-change-transform leading-none">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-500 dark:text-rose-300">
            Cancelled
          </h2>

          <p className="mt-2 text-lg font-bold text-rose-600 dark:text-rose-300">
            {data?.dashboard?.orders?.cancelled}
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderStatus);
