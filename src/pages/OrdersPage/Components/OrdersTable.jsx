import React from "react";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Pagination, PaginationItem } from "@mui/material";
import OrdersTableSkeleton from "./OrdersTableSkeleton";
import { getAllOrdersThunk } from "../../../features/orders/Thunks/GetAllOrdersThunk";
import OrderDetialsDrawer from "./OrderDetialsDrawer";

const OrdersTable = ({ maxHeight, numberOfItems }) => {
  const getOrdersDispatch = useDispatch();
  const [isPagination, setIsPagination] = useState(false);
  const { filteredOrders, totalPages, currentPage, loading } = useSelector(
    (store) => store.orders,
  );

  const [openOrderDetialsDrawer, setOpenOrderDetialsDrawer] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const paginationHandler = (_, value) => {
    const fetchOrders = async () => {
      setIsPagination(true);
      await getOrdersDispatch(
        getAllOrdersThunk({
          limit: numberOfItems * 2,
          page: value,
        }),
      );
      setIsPagination(false);
    };
    fetchOrders();
  };

  const orderClickHandler = (order) => {
    setSelectedOrder(order);
    setOpenOrderDetialsDrawer(true);
  };

  const closeDrawerHandler = useCallback(() => {
    setOpenOrderDetialsDrawer(false);
  }, []);

  return (
    <>
      <div
        className="overflow-auto rounded-2xl border border-border shadow-lg hide-scrollbar dark:border-secondary/30"
        style={{ maxHeight: maxHeight ? `${maxHeight}px` : "auto" }}
      >
        {!loading ? (
          <table
            className={`min-w-[800px] xl:min-w-full w-full border-separate border-spacing-0`}
          >
            <thead className="!h-[48px] sticky top-0 z-10 bg-bg-main text-text-primary/85">
              <tr className="bg-secondary/13 dark:bg-secondary/20">
                <th className="uppercase py-4 px-6 text-start text-xs">
                  order
                </th>
                <th className="uppercase py-4 px-6 text-center text-xs">
                  Customer
                </th>
                <th className="uppercase py-4 px-6 text-center text-xs">
                  Date
                </th>
                <th className="uppercase py-4 px-6 text-center text-xs">
                  Status
                </th>
                <th className="uppercase py-4 px-6 text-center text-xs">
                  Payment
                </th>
                <th className="uppercase py-4 px-6 text-center text-xs">
                  Total
                </th>
              </tr>
            </thead>

            <tbody className="bg-secondary/1 dark:bg-bg-card">
              {filteredOrders?.length > 0 ? (
                filteredOrders?.map((order, index, array) => (
                  <tr
                    key={order._id}
                    className="!h-[77px] hover:bg-secondary/3 transition cursor-pointer"
                    onClick={() => orderClickHandler(order)}
                  >
                    {/* Order */}
                    <td
                      className={`py-4 px-6 ${
                        index === array.length - 1 ? "" : "border-b"
                      } border-secondary/15 dark:border-secondary/20 text-[12px] text-secondary/85 uppercase font-semibold`}
                    >
                      #{order._id?.slice(-8)}
                    </td>

                    {/* Customer */}
                    <td
                      className={`py-4 px-6 ${
                        index === array.length - 1 ? "" : "border-b"
                      } border-secondary/15 dark:border-secondary/20`}
                    >
                      <div className="grid grid-cols-[1fr_1.7fr] gap-4 items-center">
                        <Avatar
                          alt={order.user?.username}
                          className="!size-[34px] !justify-self-end !bg-primary/60 !text-sm !uppercase !leading-none"
                        >
                          {/^[A-Za-z\u0600-\u06FF]$/.test(
                            order.user?.username?.charAt(0) || "",
                          )
                            ? order.user.username.charAt(0)
                            : ""}
                        </Avatar>

                        <div className="min-w-0">
                          <h3 className="truncate text-left text-[13px] font-semibold capitalize text-text-primary/95">
                            {order.user?.username || "ــــــــــــ"}
                          </h3>

                          <p className="truncate text-left text-[11px] text-secondary/75">
                            {order.user?.email || "ــــــــــــ"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td
                      className={`py-4 px-6 text-center text-[11px] text-secondary/90 ${
                        index === array.length - 1 ? "" : "border-b"
                      } border-secondary/15 dark:border-secondary/20`}
                    >
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Status */}
                    <td
                      className={`py-4 px-6 text-center ${
                        index === array.length - 1 ? "" : "border-b"
                      } border-secondary/15 dark:border-secondary/20`}
                    >
                      <span
                        className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
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
                    </td>

                    {/* Payment */}
                    <td
                      className={`py-4 px-6 text-center ${
                        index === array.length - 1 ? "" : "border-b"
                      } border-secondary/15 dark:border-secondary/20`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
                            order.paymentStatus === "pending"
                              ? "border-yellow-500/30 bg-yellow-500/15 text-yellow-600 dark:text-yellow-400"
                              : order.paymentStatus === "paid"
                                ? "border-green-500/30 bg-green-500/15 text-green-600 dark:text-green-400"
                                : order.paymentStatus === "failed"
                                  ? "border-red-500/30 bg-red-500/15 text-red-600 dark:text-red-400"
                                  : order.paymentStatus === "refunded"
                                    ? "border-orange-500/30 bg-orange-500/15 text-orange-600 dark:text-orange-400"
                                    : order.paymentStatus ===
                                        "partially_refunded"
                                      ? "border-blue-500/30 bg-blue-500/15 text-blue-600 dark:text-blue-400"
                                      : order.paymentStatus === "cancelled"
                                        ? "border-gray-500/30 bg-gray-500/15 text-gray-600 dark:text-gray-400"
                                        : "border-gray-500/30 bg-gray-500/15 text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>

                        <span className="text-[10px] text-secondary/90 capitalize">
                          {order.paymentMethod}
                        </span>
                      </div>
                    </td>

                    {/* Total */}
                    <td
                      className={`py-4 px-6 text-center text-[12px] font-bold text-text-primary/95 ${
                        index === array.length - 1 ? "" : "border-b"
                      } border-secondary/15 dark:border-secondary/20`}
                    >
                      {new Intl.NumberFormat("en-EG", {
                        style: "currency",
                        currency: "EGP",
                      }).format(order.totalPrice)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-slate-500/90 dark:text-slate-400/75 text-center p-8"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>

            <tfoot className="!h-[52px] sticky bottom-0 z-10 !bg-bg-main">
              <tr className="bg-secondary/8 dark:bg-secondary/16">
                <td colSpan={6} className="py-2.5 px-6">
                  {/* {filteredOrders.length > 0 ? ( */}
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-text-primary/80">{`Page ${currentPage} of ${totalPages}`}</p>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={paginationHandler}
                      renderItem={(item) => (
                        <PaginationItem
                          {...item}
                          className={`!rounded-lg !border !border-secondary/20 !text-text-primary/90  dark:!border-secondary/20 ${item.selected ? "!bg-primary/85 !text-white !border-primary hover:!bg-primary" : "hover:!bg-secondary/10"}`}
                        />
                      )}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        ) : isPagination && loading ? (
          <OrdersTableSkeleton numberOfItems={numberOfItems}>
            <tfoot className="sticky bottom-0 z-10 !bg-bg-main">
              <tr className="bg-secondary/8 dark:bg-secondary/16">
                <td colSpan={6} className="py-2.5 px-6">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-text-primary/80">{`Page ${currentPage} of ${totalPages}`}</p>
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={paginationHandler}
                      renderItem={(item) => (
                        <PaginationItem
                          {...item}
                          className={`!rounded-lg !border !border-secondary/20 !text-text-primary/90  dark:!border-secondary/20 ${item.selected ? "!bg-primary/85 !text-white !border-primary hover:!bg-primary" : "hover:!bg-secondary/10"}`}
                        />
                      )}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </OrdersTableSkeleton>
        ) : (
          <OrdersTableSkeleton numberOfItems={numberOfItems} />
        )}
      </div>

      <OrderDetialsDrawer
        open={openOrderDetialsDrawer}
        onClose={closeDrawerHandler}
        order={selectedOrder}
      />
    </>
  );
};

export default React.memo(OrdersTable);
