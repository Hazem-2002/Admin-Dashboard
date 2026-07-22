import React from "react";
import { InputBase, InputAdornment } from "@mui/material";
import { setFiltersOrders } from "../../../features/orders/orderSlice";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Select from "../../../components/Select";

const OrdersPageHeader = () => {
  const { count } = useSelector((store) => store.orders);
  const filteredOrdersDispatch = useDispatch();
  const [searchFormData, setSearchFormData] = useState({
    input: "",
    status: "All Statuses",
    payment: "All Payments",
    method: "All Methods",
  });

  const searchOrderHandler = (value) => {
    setSearchFormData(value);
    console.log(value);
    filteredOrdersDispatch(setFiltersOrders(value));
  };

  return (
    <div className="flex flex-col gap-4 bg-white/75 dark:bg-bg-card p-4 rounded-lg shadow">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-xs uppercase text-secondary font-bold">
            Admin • Management
          </h1>
          <h3 className="capitalize text-2xl font-bold">orders</h3>
        </div>
        <div className="flex items-center gap-2 border border-border bg-secondary/2 dark:bg-info-bg/35 shadow dark:bg-bg-card rounded-md px-3 py-2">
          <h2 className="font-bold text-2xl">{count}</h2>
          <p className="text-xs text-secondary capitalize">total orders</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <InputBase
          type="text"
          id="search"
          value={searchFormData.input}
          onChange={(e) =>
            searchOrderHandler({ ...searchFormData, input: e.target.value })
          }
          placeholder="Search ID, Customer..."
          className="w-full !grow !h-10.5 !bg-info-bg/25 !py-2.5 !px-3 !text-sm !text-text-primary !border !border-border !rounded-md !outline-none focus-within:!ring-2 focus-within:!ring-primary/30 dark:focus-within:!ring-primary/70"
          slotProps={{ input: { className: "placeholder:!text-secondary" } }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon className="!text-text-muted !text-xl" />
            </InputAdornment>
          }
        />

        <div className="w-full flex flex-col sm:flex-row gap-4 grow md:grow-0">
          <Select
            id="status"
            value={searchFormData.status}
            onChange={(e) =>
              searchOrderHandler({ ...searchFormData, status: e.target.value })
            }
            menuItems={[
              "All Statuses",
              "Pending",
              "Confirmed",
              "Processing",
              "Shipped",
              "Delivered",
              "Cancelled",
              "Returned",
            ]}
          ></Select>

          <Select
            id="payment"
            value={searchFormData.payment}
            onChange={(e) =>
              searchOrderHandler({ ...searchFormData, payment: e.target.value })
            }
            menuItems={["All Payments", "Pending", "Paid", "Failed"]}
          ></Select>

          <Select
            id="method"
            value={searchFormData.method}
            onChange={(e) =>
              searchOrderHandler({ ...searchFormData, method: e.target.value })
            }
            menuItems={["All Methods", "Cash", "Stripe"]}
          ></Select>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrdersPageHeader);
