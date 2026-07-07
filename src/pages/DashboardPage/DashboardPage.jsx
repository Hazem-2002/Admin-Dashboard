import React from "react";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://e-commerce-api-3wara.vercel.app/orders/admin/dashboard",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzQ1MzgxNCwiZXhwIjoxNzgzODg1ODE0fQ.sEKU3pOYCPuKG06CUT4A2fegt3GzeugQ711DgGL7XEo`,
          },
        },
      );
      const products = await res.json();
      console.log(products);
      setData(products);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center h-full gap-10 p-6">
      {/* Admin overview */}
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2 rounded-3xl p-6 border border-slate-200 bg-slate-100/30 dark:bg-slate-900 shadow-md shadow-slate-900/5 dark:border-slate-800">
          <h2 className="text-md text-cyan-500 tracking-[0.25rem] uppercase font-semibold">
            Admin Overview
          </h2>

          <p className="text-xl capitalize font-medium text-slate-900 dark:text-white/90">
            Real-time commerce health
          </p>

          <p className="text-sm text-slate-600 dark:text-gray-400">
            Monitor your storefront with AI-style clarity and live API metrics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 grid-rows-2 justify-items-stretch gap-6 rounded-3xl">
          <article className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/50 dark:bg-slate-900 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800 hover:-translate-y-1.5 will-change-transform">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r bg-gradient-to-br from-emerald-400 to-teal-500"></div>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 opacity-0 blur-3xl transition-all duration-300 group-hover:opacity-40"></div>
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-200/80">
                  Total Orders
                </p>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {data?.dashboard?.orders?.total}
                </h3>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-300/70">
                  All orders received
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg hover:rotate-12 transition-all duration-300 group-hover:scale-105 will-change-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-bag h-7 w-7 text-white"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                  <path d="M3 6h18"></path>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/50 dark:bg-slate-900 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800 hover:-translate-y-1.5 will-change-transform">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r bg-gradient-to-br from-amber-400 to-orange-500"></div>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 opacity-0 blur-3xl transition-all duration-300 group-hover:opacity-40"></div>
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-200/80">
                  Pending Orders
                </p>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {data?.dashboard?.orders?.pending}
                </h3>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-300/70">
                  Awaiting action
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg hover:rotate-12 transition-all duration-300 group-hover:scale-105 will-change-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-clock3-icon lucide-clock-3 h-7 w-7 text-white"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6h4" />
                </svg>
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/50 dark:bg-slate-900 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800 hover:-translate-y-1.5 will-change-transform">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r bg-gradient-to-br from-pink-400 to-rose-500"></div>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 opacity-0 blur-3xl transition-all duration-300 group-hover:opacity-40"></div>
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-200/80">
                  Revenue
                </p>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(data?.dashboard?.revenue?.total || 0)}
                </h3>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-300/70">
                  Total gross revenue
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 shadow-lg hover:rotate-12 transition-all duration-300 group-hover:scale-105 will-change-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-dollar-sign-icon lucide-dollar-sign h-7 w-7 text-white"
                >
                  <line x1="12" x2="12" y1="2" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/50 dark:bg-slate-900 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800 hover:-translate-y-1.5 will-change-transform">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r bg-gradient-to-br from-cyan-400 to-sky-500"></div>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-cyan-400 to-sky-500 opacity-0 blur-3xl transition-all duration-300 group-hover:opacity-40"></div>
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-200/80">
                  This Month
                </p>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(data?.dashboard?.revenue?.thisMonth || 0)}
                </h3>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-300/70">
                  Monthly sales target
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-500 shadow-lg hover:rotate-12 transition-all duration-300 group-hover:scale-105 will-change-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-cart-icon lucide-shopping-cart h-7 w-7 text-white"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/50 dark:bg-slate-900 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800 hover:-translate-y-1.5 will-change-transform">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r bg-gradient-to-br from-violet-400 to-fuchsia-500"></div>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 opacity-0 blur-3xl transition-all duration-300 group-hover:opacity-40"></div>
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-200/80">
                  Top Product
                </p>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white text-clip">
                  {data?.dashboard?.topProducts[0]?.name}
                </h3>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-300/70">
                  4 sold
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-lg hover:rotate-12 transition-all duration-300 group-hover:scale-105 will-change-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-package-icon lucide-package h-7 w-7 text-white"
                >
                  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z" />
                  <path d="M12 22V12" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <path d="m7.5 4.27 9 5.15" />
                </svg>
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/50 dark:bg-slate-900 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-slate-800 hover:-translate-y-1.5 will-change-transform">
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-br from-slate-400 to-slate-600"></div>
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 opacity-0 blur-3xl transition-all duration-300 group-hover:opacity-40"></div>
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-200/80">
                  Users
                </p>
                <h3 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {data?.dashboard?.totalCustomers}
                </h3>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-300/70">
                  Registered customers
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 shadow-lg hover:rotate-12 transition-all duration-300 group-hover:scale-105 will-change-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users-icon lucide-users h-7 w-7 text-white"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
          </article>
        </div>
      </div>

      {/* Order status && Top products */}
      <div className="grid sm:grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-1 xl:grid-cols-[1.3fr_1fr] items-start gap-6">
        {/* Order status */}
        <div className="flex flex-col gap-6 rounded-3xl p-6 border border-slate-200 bg-slate-100/30 dark:bg-slate-900 shadow-xl shadow-slate-900/5 dark:border-slate-800">
          {/* Header (Title && Subtitle && Updated badge) */}
          <div className="flex flex-col gap-2">
            {/* Title && Updated badge*/}
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-md font-semibold text-cyan-500 tracking-[0.25rem] uppercase">
                Order status
              </h2>
              {/* Updated badge */}
              <h2 className="text-xs font-semibold capitalize px-2.5 py-2 bg-green-400/10 text-green-400/90 dark:bg-green-400/20 dark:text-green-400/80 rounded-full">
                updated
              </h2>
            </div>
            {/* Subtitle */}
            <p className="text-sm font-semibold text-slate-400">
              Monitor the current distribution of orders across each fulfillment
              stage
            </p>
          </div>

          {/* Order status chart */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Pending */}
            <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-orange-500/20 dark:bg-orange-500/10 will-change-transform">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-600 dark:text-orange-300">
                Pending
              </h2>

              <p className="mt-2 text-3xl font-bold text-orange-500 dark:text-orange-300">
                {data?.dashboard?.orders?.pending}
              </p>
            </div>

            {/* Processing */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-sky-500/20 dark:bg-sky-500/10 will-change-transform">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-600 dark:text-sky-300">
                Processing
              </h2>

              <p className="mt-2 text-3xl font-bold text-sky-600 dark:text-sky-300">
                {data?.dashboard?.orders?.processing}
              </p>
            </div>

            {/* Confirmed */}
            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-indigo-500/20 dark:bg-indigo-500/10 will-change-transform">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-300">
                Confirmed
              </h2>

              <p className="mt-2 text-3xl font-bold text-indigo-500 dark:text-indigo-300">
                {data?.dashboard?.orders?.confirmed}
              </p>
            </div>

            {/* Shipped */}
            <div className="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-cyan-500/20 dark:bg-cyan-500/10 will-change-transform">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600 dark:text-cyan-300">
                Shipped
              </h2>

              <p className="mt-2 text-3xl font-bold text-cyan-500 dark:text-cyan-300">
                {data?.dashboard?.orders?.shipped}
              </p>
            </div>

            {/* Delivered */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-emerald-500/20 dark:bg-emerald-500/10 will-change-transform">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-300">
                Delivered
              </h2>

              <p className="mt-2 text-3xl font-bold text-emerald-500 dark:text-emerald-300">
                {data?.dashboard?.orders?.delivered}
              </p>
            </div>

            {/* Cancelled */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-rose-500/20 dark:bg-rose-500/10 will-change-transform">
              <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-500 dark:text-rose-300">
                Cancelled
              </h2>

              <p className="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-300">
                {data?.dashboard?.orders?.cancelled}
              </p>
            </div>
          </div>
        </div>

        {/* Top products */}
        <div className="flex flex-col gap-6 rounded-3xl p-6 border border-slate-200 bg-slate-100/30 dark:bg-slate-900 shadow-lg shadow-slate-900/5 dark:border-slate-800">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h2 className="text-md font-semibold text-cyan-500 tracking-[0.25rem] uppercase">
              Top Products
            </h2>
            <p className="text-sm font-semibold text-slate-400">
              Most popular products in the last 30 days
            </p>
          </div>

          {/* Top products list */}
          <div className="flex flex-col gap-4">
            {data.dashboard?.topProducts?.map((product) => (
              <div
                key={product._id}
                className="group flex items-center gap-4 p-3 rounded-2xl bg-white/80 dark:bg-slate-800 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 will-change-transform"
              >
                <div className="w-16 h-16 overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300 will-change-transform"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {product.totalSold} units sold • {""}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="flex flex-col gap-6 rounded-3xl p-6 border border-slate-200 bg-slate-100/30 dark:bg-slate-900 shadow-xl shadow-slate-900/5 dark:border-slate-800">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-md font-semibold text-cyan-500 tracking-[0.25rem] uppercase">
              Recent orders
            </h2>
            <p className="inline-flex items-center rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300 border border-slate-700">
              {data.dashboard?.recentOrders?.length} Orders
            </p>
          </div>

          <p className="text-sm font-semibold text-slate-400">
            View the most recent customer orders and their current status
          </p>
        </div>

        {/* Recent orders list */}
        <div className="flex flex-col gap-3">
          {data.dashboard?.recentOrders?.map((order) => (
            <div
              key={order._id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-4 py-3 rounded-2xl bg-white/80 dark:bg-slate-800 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700/80 will-change-transform"
            >
              <div className="flex flex-col grow gap-1">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                  {order.user?.username}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                  {order.items?.map((item) => item.name).join("  •  ")}
                  {"  •  "}
                  {new Date(order.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="flex grow-0 items-center gap-4">
                <p
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize
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
                <p className="text-sm font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(order.totalPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(DashboardPage);
