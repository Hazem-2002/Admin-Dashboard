import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllOrdersThunk } from "../../features/orders/Thunks/GetAllOrdersThunk";
import OrdersTable from "./Components/OrdersTable";
import OrdersPageHeader from "./Components/OrdersPageHeader";

const OrdersPage = () => {
  const getOrdersDispatch = useDispatch();
  const calcTableHeight = () => {
    const rowHeight = 77;
    const headerHeight = 56;
    const footerHeight = 52;

    const itemsCount =
      Math.floor(
        (screen.width < 768
          ? screen.availHeight * 0.8
          : screen.availHeight * 0.7) / rowHeight,
      ) - 1;

    return {
      tableHeight: itemsCount * rowHeight + headerHeight + footerHeight,
      itemsCount,
    };
  };

  useEffect(() => {
    getOrdersDispatch(getAllOrdersThunk(calcTableHeight().itemsCount * 2));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex flex-col gap-8 p-8">
      <OrdersPageHeader />

      <OrdersTable maxHeight={calcTableHeight().tableHeight} />
    </div>
  );
};

export default React.memo(OrdersPage);
