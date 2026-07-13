import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersThunk } from "../../features/orders/Thunks/GetAllOrdersThunk";
import OrdersTable from "./Components/OrdersTable";

const OrdersPage = () => {
  const getOrdersDispatch = useDispatch();
  const { currentPage } = useSelector((store) => store.orders);
  const [numberOfItems, setNumberOfItems] = useState(5);

  const changeOrdersNumber = (value) => {
    setNumberOfItems(value);
  };

  useEffect(() => {
    getOrdersDispatch(
      getAllOrdersThunk({ limit: numberOfItems * 2, page: currentPage }),
    );
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [numberOfItems]);

  return (
    <div className="flex flex-col gap-8 p-8">
      <OrdersTable
        changeOrdersNumber={changeOrdersNumber}
        numberOfItems={numberOfItems}
      />
    </div>
  );
};

export default React.memo(OrdersPage);
