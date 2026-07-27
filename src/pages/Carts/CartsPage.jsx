import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAllCartsThunk } from "../../features/carts/Thunks/getAllCartsThunk";
import { setPage } from "../../features/carts/cartsSlice";

import CartCard from "./components/CartCard";
import Pagination from "../../components/Pagination";

const CartsPage = () => {
  const dispatch = useDispatch();

  const { paginationCarts, totalPages, currentPage } = useSelector(
    (store) => store.carts,
  );

  useEffect(() => {
    try {
      const cartsPerPage = 6;
      dispatch(getAllCartsThunk(cartsPerPage));
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const paginationHandler = (_, value) => {
    window.scrollTo(0, 0);
    dispatch(setPage(value));
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {paginationCarts.map((cart) => (
          <CartCard key={cart._id} cart={cart} />
        ))}
      </div>
      {(paginationCarts?.length > 0 || paginationCarts?.length > 0) && (
        <div className="rounded-3xl bg-bg-card p-4 mx-auto w-fit sm:w-full shadow">
          <div className="flex justify-between items-center">
            <p className="hidden sm:block text-xs text-text-primary/80">{`Page ${currentPage} of ${totalPages}`}</p>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              paginationHandler={paginationHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(CartsPage);
