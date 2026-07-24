import { createSlice } from "@reduxjs/toolkit";
import { getProductByIdThunk } from "./Thunks/GetSingleProductThunk.js";
import { addProductThunk } from "./Thunks/AddProductThunk.js";
import { updateProductThunk } from "./Thunks/UpdateProductThunk.js";
import { getProductsThunk } from "./Thunks/getAllProductsThunk.js";
// =================== INITIAL STATE ===================
const initialState = {
  products: [],
  product: null,
  filteredProducts: [],
  paginationProducts: [],
  filters: {
    inputSearch: "",
    category: "All Categories",
    subcategory: "",
  },
  loading: false,
  error: null,
  success: false,
  limit: 2,
  totalPages: 1,
  currentPage: 1,
  totalProducts: 0,
};

const filterProducts = (products = [], filters) => {
  const { inputSearch, category, subcategory } = filters;

  return products.filter((product) => {
    const categoryMatch =
      category === "All Categories" ||
      product.category?.toLowerCase() === category.toLowerCase();

    const subcategoryMatch =
      !subcategory ||
      product.subcategory
        ?.toLowerCase()
        .includes(subcategory.trim().toLowerCase());

    const inputSearchMatch =
      !inputSearch ||
      product.name?.toLowerCase().includes(inputSearch.trim().toLowerCase());

    return categoryMatch && subcategoryMatch && inputSearchMatch;
  });
};

const productsPaginationCalc = (products, page, limit = 10) => {
  const paginationOrders = [];

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  for (let i = startIndex; i < endIndex && i < products.length; i++) {
    paginationOrders.push(products[i]);
  }

  return paginationOrders;
};

const pagesCount = (count, limit = 10) => {
  return Math.ceil(count / limit);
};

// =================== SLICE ===================
const productsSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    clearStatus(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },

    setFiltersProducts(state, action) {
      state.filters = action.payload;
      state.filteredProducts = filterProducts(state.products, action.payload);
      state.paginationProducts = productsPaginationCalc(
        state.filteredProducts,
        1,
        state.limit,
      );
      state.currentPage = 1;
      state.totalPages = pagesCount(state.filteredProducts.length, state.limit);
    },

    setPage(state, action) {
      state.currentPage = action.payload;
      state.paginationProducts = productsPaginationCalc(
        state.filteredProducts,
        state.currentPage,
        state.limit,
      );
    },

    resetFilteredProducts(state) {
      state.filteredOrders = state.orders;
    },
  },

  extraReducers: (builder) => {
    builder

      // ========== GET ALL Products ==========
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.error = null;
        state.success = true;
        state.loading = false;
        state.limit = action.payload.productsPerPage;
        state.products = action.payload?.products;
        state.filteredProducts = filterProducts(
          action.payload?.products,
          state.filters,
        );
        state.paginationProducts = productsPaginationCalc(
          state.filteredProducts,
          state.currentPage,
          state.limit,
        );
        state.totalPages = pagesCount(
          state.filteredProducts?.length,
          state.limit,
        );
        state.totalProducts = action.payload?.totalProducts;
      })
      .addCase(getProductsThunk.rejected, (state) => {
        state.success = false;
        state.loading = false;
      })

      // ================= GET PRODUCT BY ID =================
      .addCase(getProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.product = action.payload.product;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // ========== Add ==========
      .addCase(addProductThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.filteredProducts = filterProducts(
          [...state.products, action.payload.product],
          state.filters,
        );
        state.products.push(action.payload.product);
      })
      .addCase(addProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ========== DELETE ==========

      // ========== EDIT ==========
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const products = state.products.map((product) =>
          product._id === action.payload.product._id
            ? action.payload.product
            : product,
        );

        state.products = products;

        state.filteredProducts = filterProducts(products, state.filters);
      })

      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearStatus,
  setFiltersProducts,
  setPage,
  resetFilteredProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
