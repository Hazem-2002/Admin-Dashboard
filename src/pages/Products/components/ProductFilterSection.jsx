import React from "react";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFiltersProducts } from "../../../features/products/productsSlice";
import { getProductsThunk } from "../../../features/products/Thunks/getAllProductsThunk";
import { Button, Collapse } from "@mui/material";

import Select from "../../../components/Select";
import Input from "../../../components/Input";

const ProductFilterSection = ({ searchData, setSearchData }) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const { products } = useSelector((store) => store.products);
  const searchDispatch = useDispatch();
  const getProductsDispatch = useDispatch();

  const selectCategoryHandler = (event) => {
    const value = {
      ...searchData,
      category: event.target.value,
    };

    setSearchData(value);
    searchDispatch(setFiltersProducts(value));
  };

  const changeSubcategoryHandler = (event) => {
    const value = {
      ...searchData,
      subcategory: event.target.value,
    };

    setSearchData(value);
    searchDispatch(setFiltersProducts(value));
  };

  const SearchHandler = () => {
    try {
      getProductsDispatch(
        getProductsThunk({
          page: 1,
          category:
            searchData.category === "All Categories" ? "" : searchData.category,
          //   brand: params.brand,
          search: searchData.inputSearch,
        }),
      ).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const categories = useMemo(() => {
    return [
      ...new Set([
        ...products.map((product) => product.category),
        "fashion",
        "electronics",
        "accessories",
        "jewelry",
        "watches",
        "bags",
        "shoes",
        "sports",
        "mobile",
        "laptops",
      ]),
    ];
  }, [products]);

  return (
    <div className="p-6 bg-bg-card border border-border rounded-xl shadow-sm">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch lg:items-center gap-4">
        <Input
          type="text"
          id="search"
          icon={true}
          value={searchData.inputSearch}
          onChange={(e) => {
            const value = { ...searchData, inputSearch: e.target.value };
            setSearchData(value);
            searchDispatch(setFiltersProducts(value));
          }}
          placeholder="Search Product..."
        />

        <div className="flex gap-3 shrink-0">
          {/* Filters */}
          <Button
            variant="contained"
            onClick={() => setOpenCollapse((prev) => !prev)}
            className={`!min-w-[120px] !grow sm:!grow-0 !h-11 !rounded-md !border ${openCollapse ? "!bg-primary/10 !text-primary !border-primary/40" : "!bg-primary/4 !text-text-primary !border-border"} !shadow-none hover:!shadow !capitalize !font-semibold`}
            startIcon={
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
                className="!size-4.5"
              >
                <path d="M10 5H3" />
                <path d="M12 19H3" />
                <path d="M14 3v4" />
                <path d="M16 17v4" />
                <path d="M21 12h-9" />
                <path d="M21 19h-5" />
                <path d="M21 5h-7" />
                <path d="M8 10v4" />
                <path d="M8 12H3" />
              </svg>
            }
          >
            Filters
          </Button>

          {/* Search */}
          <Button
            variant="contained"
            className="!min-w-[120px] !grow sm:!grow-0 !h-11 !rounded-md !bg-primary hover:!bg-primary-hover !text-white !shadow-none hover:!shadow !capitalize !font-semibold"
            onClick={SearchHandler}
            startIcon={
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
                className="!size-4.5"
              >
                <path d="m21 21-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            }
          >
            Search
          </Button>
        </div>
      </div>

      {/* Filters Collapse */}
      <Collapse
        in={openCollapse}
        // unmountOnExit
        easing="linear"
        timeout={120}
      >
        <hr className="border-0 border-t border-border mb-4 mt-8" />

        {/* Category && Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 justify-between">
          {/* Category */}
          <div className="flex flex-col gap-3 grow">
            <label
              htmlFor="category"
              className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
            >
              Category
            </label>

            <Select
              id="category"
              value={searchData.category}
              onChange={selectCategoryHandler}
              menuItems={["All Categories", ...categories]}
            />
          </div>

          {/* Subcategory */}
          <div className="flex flex-col gap-3 grow">
            <label
              htmlFor="subcategory"
              className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
            >
              Subcategory
            </label>
            <Input
              type="text"
              id="subcategory"
              value={searchData.subcategory}
              onChange={changeSubcategoryHandler}
              placeholder="Search by subcategory..."
              icon={false}
            />
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default React.memo(ProductFilterSection);
