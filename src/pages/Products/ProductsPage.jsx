import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsThunk } from "../../features/products/Thunks/getAllProductsThunk";
import QuickEditProductDialog from "./quick-edit/QuickEditProduct";
import { Pagination, PaginationItem } from "@mui/material";

import ProductFilterSection from "./components/ProductFilterSection";
import ProductCard from "./components/ProductCard";
import ProductCardsSkeleton from "./components/ProductCardsSkeleton";

const ProductsPage = () => {
  const { products, filteredProducts, currentPage, totalPages, loading } =
    useSelector((store) => store.products);
  const [open, setOpen] = useState(false);
  const productsDispatch = useDispatch();
  const [product, setProduct] = useState({});

  const [searchData, setSearchData] = useState({
    inputSearch: "",
    category: "All Categories",
    subcategory: "",
  });

  const openEditProductDialog = (product) => {
    setProduct(product);
    setOpen(true);
  };

  // Fetch products from API and set state on mount
  useEffect(() => {
    try {
      productsDispatch(
        getProductsThunk({
          page: 1,
        }),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const paginationHandler = (_, value) => {
    const fetchOrders = async () => {
      await productsDispatch(
        getProductsThunk({
          page: value,
          // category:
          //   searchData.category === "All Categories" ? "" : searchData.category,
          // //   brand: params.brand,
          // search: searchData.inputSearch,
        }),
      );
    };
    fetchOrders();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="flex flex-col gap-8 p-8">
        <ProductFilterSection
          searchData={searchData}
          setSearchData={setSearchData}
        />

        {/* cards */}
        {!loading ? (
          <div className="flex flex-col gap-8">
            {filteredProducts?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    openEditProductDialog={openEditProductDialog}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full flex justify-center items-center">
                <div className="w-full py-12 flex flex-col justify-center items-center text-center border border-border rounded-3xl bg-bg-card shadow">
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
                    className="lucide lucide-package2-icon lucide-package-2 !size-12 text-primary/70"
                  >
                    <path d="M12 3v6" />
                    <path d="M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z" />
                    <path d="M3.054 9.013h17.893" />
                  </svg>

                  <p className="capitalize text-xl font-bold text-text-primary m-4 mb-2">
                    no products found
                  </p>

                  <p className="capitalize text-sm font-bold text-text-muted/60">
                    Try adjusting your search or filters
                  </p>
                </div>
              </div>
            )}

            {(filteredProducts?.length > 0 || products?.length > 0) && (
              <div className="mx-auto rounded-3xl bg-bg-card p-4 w-fit shadow">
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
            )}
          </div>
        ) : (
          <ProductCardsSkeleton />
        )}
      </div>

      <QuickEditProductDialog
        open={open}
        onClose={() => setOpen(false)}
        product={product}
      />
    </>
  );
};

export default React.memo(ProductsPage);
