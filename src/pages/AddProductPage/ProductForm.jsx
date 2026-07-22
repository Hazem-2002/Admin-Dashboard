import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Thunks
import { addProductThunk } from "../../features/products/Thunks/AddProductThunk.js";
import { updateProductThunk } from "../../features/products/Thunks/UpdateProductThunk.js";
import { getProductByIdThunk } from "../../features/products/Thunks/GetSingleProductThunk";
import { showToast } from "../../features/Toast/toastSlice.js";

// Components
import ProductGallerySection from "./ProductGallerySection.jsx";
import {
  IconButton,
  Button,
  Checkbox,
  FormControlLabel,
  Chip,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

// icons
import CloseIcon from "@mui/icons-material/Close";

const AddProductPage = ({ product, onClose }) => {
  const createProductDispatch = useDispatch();
  const saveProductChangeDispatch = useDispatch();
  const getProductDispatch = useDispatch();
  const toastDispatch = useDispatch();
  const Navigate = useNavigate();

  // Loading Indicator
  const [loading, setLoading] = useState(false);

  // Initial Values
  const FormDataInitial = {
    name: "",
    shortDescription: "",
    description: "",
    price: 0,
    discountPrice: 0,
    stock: 0,
    sku: "",
    category: "",
    subcategory: "",
    brand: "",
    tags: [],
    featured: false,
    isActive: false,
    images: [],
  };

  // Tag Input Field
  const [tagsInput, setTagsInput] = useState("");

  // Form State
  const [formData, setFormData] = useState(FormDataInitial);

  // Form Fields Validation Errors
  const [errors, setErrors] = useState({
    name: "",
    shortDescription: "",
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    category: "",
    subcategory: "",
    brand: "",
    tags: "",
    images: "",
  });

  // contain public_ids for Deleted Image
  const removedImages = useRef([]);

  const { id } = useParams();
  const isEditMode = Boolean(id) || Boolean(product);

  useEffect(() => {
    if (!isEditMode) return;

    const setProductData = (productData) => {
      setFormData({
        name: productData.name,
        shortDescription: productData.shortDescription,
        description: productData.description,
        price: productData.price,
        discountPrice: productData.discountPrice,
        stock: productData.stock,
        sku: productData.sku,
        category: productData.category,
        subcategory: productData.subcategory,
        brand: productData.brand,
        tags: productData.tags,
        featured: productData.featured,
        isActive: productData.isActive,
        images: productData.images.map((image) => ({
          ...image,
          id: uuidv4(),
          isNew: false,
        })),
      });
    };

    if (product) {
      setProductData(product);
      return;
    }

    const fetchProduct = async () => {
      try {
        const data = await getProductDispatch(getProductByIdThunk(id)).unwrap();
        setProductData(data.product);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    const imageFiles = files.map((file) => ({
      id: uuidv4(),
      file,
      url: URL.createObjectURL(file),
      isNew: true,
    }));

    setFormData({
      ...formData,
      images: [...formData.images, ...imageFiles],
    });

    setErrors({ ...errors, images: "" });
  };

  const handleRemoveImage = (id) => {
    const image = formData.images.find((image) => image.id === id);

    if (isEditMode && image && !image.isNew) {
      removedImages.current.push(image.public_id);
    }

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image.id !== id),
    }));
  };

  const regex = {
    name: /^[\p{L}\p{N}\s\-&()'",.]{3,100}$/u,

    shortDescription: /^.{10,200}$/s,

    description: /^.{20,5000}$/s,

    price: /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/,

    discountPrice: /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/,

    stock: /^(?:0|[1-9]\d{0,5})$/,

    sku: /^[A-Za-z0-9_-]{3,50}$/,

    category: /^[\p{L}\p{N}\s&-]{2,50}$/u,

    subcategory: /^[\p{L}\p{N}\s&-]{2,50}$/u,

    brand: /^[\p{L}\p{N}\s&-]{2,50}$/u,

    tags: /^([\p{L}\p{N}\s-]{2,30})(,\s*[\p{L}\p{N}\s-]{2,30})*$/u,
  };

  const validate = () => {
    const newErrors = {};

    if (!regex.name.test(formData.name?.trim())) {
      newErrors.name = "Product name must be 3-100 valid characters.";
    }

    if (!regex.shortDescription.test(formData.shortDescription?.trim())) {
      newErrors.shortDescription =
        "Short description must be 10-200 characters.";
    }

    if (!regex.description.test(formData.description?.trim())) {
      newErrors.description = "Description must be 20-5000 characters.";
    }

    if (!regex.price.test(formData.price?.toString().trim())) {
      newErrors.price = "Please enter a valid price.";
    } else if (+formData.price <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    if (formData.discountPrice) {
      if (!regex.discountPrice.test(formData.discountPrice?.toString().trim())) {
        newErrors.discountPrice = "Please enter a valid discount price.";
      } else if (+formData.discountPrice >= +formData.price) {
        newErrors.discountPrice = "Discount price must be less than price.";
      }
    }

    if (!regex.stock.test(formData.stock?.toString().trim())) {
      newErrors.stock = "Please enter a valid stock quantity.";
    }

    if (!regex.sku.test(formData.sku?.trim())) {
      newErrors.sku = "SKU must be 3-50 letters, numbers, _ or -.";
    }

    if (!regex.category.test(formData.category?.trim())) {
      newErrors.category = "Please enter a valid category.";
    }

    if (!regex.subcategory.test(formData.subcategory?.trim())) {
      newErrors.subcategory = "Please enter a valid subcategory.";
    }

    if (!regex.brand.test(formData.brand?.trim())) {
      newErrors.brand = "Please enter a valid brand.";
    }

    if (
      !Array.isArray(formData.tags) ||
      formData.tags.length === 0 ||
      formData.tags.some((tag) => !regex.tags.test(tag.trim()))
    ) {
      newErrors.tags = "Tags must contain valid values.";
    }

    if (!isEditMode) {
      if (!Array.isArray(formData.images) || formData.images.length === 0) {
        newErrors.images = "Please upload at least one image.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const saveProductHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      if (isEditMode) {
        await saveProductChangeDispatch(
          updateProductThunk({
            productData: {
              ...formData,
              deletedImages: removedImages.current,
            },
            id: id ? id : product._id,
          }),
        ).unwrap();

        toastDispatch(
          showToast({
            message: "Product Updated Successfully",
            severity: "success",
          }),
        );

        if (id) {
          Navigate("/products");
        } else {
          onClose();
        }
      } else {
        await createProductDispatch(addProductThunk(formData)).unwrap();
        setFormData(FormDataInitial);

        toastDispatch(
          showToast({
            message: "Product Added Successfully",
            severity: "success",
          }),
        );
      }
    } catch (error) {
      if (error?.message?.includes("duplicate key")) {
        toastDispatch(
          showToast({
            message: "This product already exists",
            severity: "error",
          }),
        );
      } else if (error?.errors?.includes('"tags" must be an array')) {
        toastDispatch(
          showToast({
            message: "Please add at least 2 tags.",
            severity: "error",
          }),
        );
      } else {
        toastDispatch(
          showToast({
            message: error?.message || "Something went wrong",
            severity: "error",
          }),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col ${product?.name ? "p-4" : "p-4 sm:p-8"} text-text-primary`}
    >
      <form
        className={`grid grid-cols-1 ${
          product?.name ? "lg:grid-cols-2" : "md:grid-cols-2"
        } items-start gap-8`}
      >
        <ProductGallerySection
          formData={formData}
          errors={errors}
          handleRemoveImage={handleRemoveImage}
          handleImagesChange={handleImagesChange}
        />

        <div className="flex flex-col p-5 gap-6 bg-bg-card rounded-3xl shadow border border-border">
          {/* Product Name */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="Product_Name"
              className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
            >
              Product Name
            </label>
            <input
              type="text"
              required
              id="Product_Name"
              placeholder="iphone 16 Pro Max"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                setErrors({ ...errors, name: "" });
              }}
              className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
            />
            {errors.name && (
              <p className="text-red-400 text-xs -mt-2">{errors.name}</p>
            )}
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="short_description"
              className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
            >
              Short Description
            </label>
            <input
              type="text"
              id="short_description"
              required
              value={formData.shortDescription}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  shortDescription: e.target.value,
                });
                setErrors({ ...errors, shortDescription: "" });
              }}
              placeholder="Minimum 10 characters"
              className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
            />
            {errors.shortDescription && (
              <p className="text-red-400 text-xs -mt-2">
                {errors.shortDescription}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="description"
              className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              required
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                setErrors({ ...errors, description: "" });
              }}
              placeholder="Minimum 20 characters"
              className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
              rows={5}
            />
            {errors.description && (
              <p className="text-red-400 text-xs -mt-2">{errors.description}</p>
            )}
          </div>

          {/* Price && Discount Price */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 justify-between">
            {/* Price */}
            <div className="flex flex-col gap-3 grow">
              <label
                htmlFor="price"
                className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
              >
                Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="price"
                  required
                  value={formData.price}
                  onChange={(e) => {
                    setFormData({ ...formData, price: e.target.value });
                    setErrors({ ...errors, price: "" });
                  }}
                  placeholder="e.g. 199.99"
                  className="w-full bg-primary/4 py-2.5 pl-3 pr-10 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration- [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
                />

                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        price: Number(formData.price || 0) + 1,
                      })
                    }
                    className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
                  >
                    ▲
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        price: Math.max(0, Number(formData.price || 0) - 1),
                      })
                    }
                    className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
                  >
                    ▼
                  </button>
                </div>
              </div>
              {errors.price && (
                <p className="text-red-400 text-xs -mt-2">{errors.price}</p>
              )}
            </div>

            {/* Discount Price */}
            <div className="flex flex-col gap-3 grow">
              <label
                htmlFor="discount_price"
                className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
              >
                Discount Price
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="discount_price"
                  required
                  value={formData.discountPrice}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      discountPrice: e.target.value,
                    });
                    setErrors({
                      ...errors,
                      discountPrice: "",
                    });
                  }}
                  placeholder="e.g. 99.99"
                  className="w-full bg-primary/4 py-2.5 pl-3 pr-10 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200              [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
                />

                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        discountPrice: Number(formData.discountPrice || 0) + 1,
                      })
                    }
                    className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
                  >
                    ▲
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        discountPrice: Math.max(
                          0,
                          Number(formData.discountPrice || 0) - 1,
                        ),
                      })
                    }
                    className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
                  >
                    ▼
                  </button>
                </div>
              </div>
              {errors.discountPrice && (
                <p className="text-red-400 text-xs -mt-2">
                  {errors.discountPrice}
                </p>
              )}
            </div>
          </div>

          {/* Stock && SKU */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 justify-between">
            {/* Stock */}
            <div className="flex flex-col gap-3 grow">
              <label
                htmlFor="stock"
                className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
              >
                Stock
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="stock"
                  required
                  value={formData.stock}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      stock: e.target.value,
                    });
                    setErrors({
                      ...errors,
                      stock: "",
                    });
                  }}
                  placeholder="e.g. 50"
                  className="w-full bg-primary/4 py-2.5 pl-3 pr-10 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]"
                />

                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex flex-col">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        stock: Number(formData.stock || 0) + 1,
                      })
                    }
                    className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
                  >
                    ▲
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        stock: Math.max(0, Number(formData.stock || 0) - 1),
                      })
                    }
                    className="flex h-3 w-6 sm:h-4 text-[11px] sm:text-xs items-center justify-center text-text-muted hover:text-primary transition-colors"
                  >
                    ▼
                  </button>
                </div>
              </div>
              {errors.stock && (
                <p className="text-red-400 text-xs -mt-2">{errors.stock}</p>
              )}
            </div>

            {/* SKU */}
            <div className="flex flex-col gap-3 grow">
              <label
                htmlFor="sku"
                className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
              >
                SKU
              </label>
              <input
                type="text"
                id="sku"
                required
                value={formData.sku}
                onChange={(e) => {
                  setFormData({ ...formData, sku: e.target.value });
                  setErrors({ ...errors, sku: "" });
                }}
                placeholder="e.g. IPH15-BLK-128"
                className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
              />
              {errors.sku && (
                <p className="text-red-400 text-xs -mt-2">{errors.sku}</p>
              )}
            </div>
          </div>

          {/* Category && Subcategory */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 justify-between">
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
                value={formData.category}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  });

                  setErrors({
                    ...errors,
                    category: "",
                  });
                }}
                displayEmpty
                className={`!w-full !h-10.5 !bg-primary/4 !text-sm ${formData.category ? "!text-text-primary" : "!text-text-muted/50"} !rounded-md !outline-0 !transition-all !duration-200 [&_.MuiOutlinedInput-notchedOutline]:!border-1 [&_.MuiOutlinedInput-notchedOutline]:!border-border [&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!border-0 [&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!ring-2 [&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!ring-primary/30 dark:[&.Mui-focused_.MuiOutlinedInput-notchedOutline]:!ring-primary/70 [&_.MuiSelect-icon]:!text-text-primary/60`}
                MenuProps={{
                  slotProps: {
                    paper: {
                      className:
                        "!bg-bg-hover !text-text-primary !border !border-border !rounded-lg",
                    },
                  },
                }}
              >
                <MenuItem
                  value=""
                  disabled
                  className="!text-text-muted/50 !text-sm"
                >
                  Select category
                </MenuItem>

                <MenuItem
                  value="electronics"
                  className="hover:!bg-bg-card/25 !transition !duration-100 !text-sm"
                >
                  Electronics
                </MenuItem>

                <MenuItem
                  value="fashion"
                  className="hover:!bg-bg-card/25 !transition !duration-100 !text-sm"
                >
                  Fashion
                </MenuItem>

                <MenuItem
                  value="accessories"
                  className="hover:!bg-bg-card/25 !transition !duration-100 !text-sm"
                >
                  Accessories
                </MenuItem>
              </Select>

              {errors.category && (
                <p className="text-red-400 text-xs -mt-2">{errors.category}</p>
              )}
            </div>

            {/* Subcategory */}
            <div className="flex flex-col gap-3 grow">
              <label
                htmlFor="subcategory"
                className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
              >
                Subcategory
              </label>
              <input
                type="text"
                id="subcategory"
                required
                value={formData.subcategory}
                onChange={(e) => {
                  setFormData({ ...formData, subcategory: e.target.value });
                  setErrors({ ...errors, subcategory: "" });
                }}
                placeholder="e.g. IPH15-BLK-128"
                className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
              />
              {errors.subcategory && (
                <p className="text-red-400 text-xs -mt-2">
                  {errors.subcategory}
                </p>
              )}
            </div>
          </div>

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="brand"
              className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              required
              value={formData.brand}
              onChange={(e) => {
                setFormData({ ...formData, brand: e.target.value });
                setErrors({ ...errors, brand: "" });
              }}
              placeholder="e.g. Apple"
              className="w-full bg-primary/4 py-2.5 px-3 text-xs sm:text-sm text-text-primary placeholder:text-text-muted/50 border border-border rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
            />
            {errors.brand && (
              <p className="text-red-400 text-xs -mt-2">{errors.brand}</p>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-3 w-full bg-primary/4 py-2.5 px-4 border border-border rounded-md">
            <label
              htmlFor="tags"
              className="text-text-primary/60 dark:text-text-primary/90 text-xs sm:text-sm font-semibold"
            >
              Tags
            </label>
            <div className="flex gap-4 justify-between items-center">
              <input
                type="text"
                id="tags"
                required
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="e.g. electronics"
                className="w-full bg-white/40 dark:bg-white/3 py-2 sm:py-3.5 px-3 text-sm text-text-primary placeholder:text-text-muted/50 border border-border/70 rounded-md outline-0 focus:ring-2 focus:ring-primary/30 dark:focus:ring-primary/70 transition-all duration-200"
              />
              <Button
                variant="contained"
                onClick={() => {
                  if (tagsInput.length > 3) {
                    setFormData({
                      ...formData,
                      tags: [...formData.tags, tagsInput],
                    });
                    setTagsInput("");
                    setErrors({ ...errors, tags: "" });
                  }
                }}
                className=" !min-w-0 !rounded-md !px-2.5 sm:!px-3.5 !py-1.5 sm:!py-3 !bg-primary/80 hover:!bg-primary-hover/70 isActive:!bg-primary-isActive !text-white"
              >
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
                  className="lucide lucide-plus-icon lucide-plus "
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </Button>
            </div>

            {formData.tags.length > 0 ? (
              <div className="flex gap-2 flex-wrap mt-2">
                {formData.tags.map((tag, index) => (
                  <Chip
                    key={tag + index}
                    // sx={{ boxShadow: "0 0 0" }}
                    deleteIcon={
                      <IconButton className="!flex !items-center !justify-center !bg-secondary/12 dark:!bg-secondary/22 hover:!bg-secondary/20 !text-white !size-3 sm:!size-4.75">
                        <CloseIcon className="!text-[11px] sm:!text-[14px] !text-white" />
                      </IconButton>
                    }
                    className="!bg-secondary/8 !text-[11px] max-sm:!h-6.5 sm:!text-xs dark:!bg-secondary/15 !font-semibold !text-text-primary/85 backdrop-blur-xl border border-white/30 shadow-[1px_1px_2px] shadow-secondary/25"
                    label={tag}
                    onDelete={() =>
                      setFormData({
                        ...formData,
                        tags: formData.tags.filter((e) => tag !== e),
                      })
                    }
                  />
                ))}
              </div>
            ) : (
              <span className="text-xs text-text-primary/60">
                Add one or more tags to organize the product.
              </span>
            )}
            {errors.tags && (
              <p className="text-red-400 text-xs -mt-2">{errors.tags}</p>
            )}
          </div>

          {/* Featured && isActive */}
          <div className="flex justify-center md:justify-start gap-4">
            {/* Featured */}
            <div className="flex items-center rounded-2xl border border-border bg-primary/4 px-3 py-1.5">
              <FormControlLabel
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                control={
                  <Checkbox
                    size="small"
                    className="!text-primary [&.Mui-checked]:!text-primary [&_.MuiSvgIcon-root]:!text-[16px] sm:[&_.MuiSvgIcon-root]:!text-[18px] !p-0 !mr-2"
                  />
                }
                label="Featured"
                slotProps={{
                  typography: {
                    className: "!text-xs sm:!text-sm !text-text-primary",
                  },
                }}
                className="!m-0 flex justify-center"
              />
            </div>

            {/* isActive */}
            <div className="flex items-center rounded-2xl border border-border bg-primary/4 px-3 py-1.5">
              <FormControlLabel
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                control={
                  <Checkbox
                    size="small"
                    className="!text-primary [&.Mui-checked]:!text-primary [&_.MuiSvgIcon-root]:!text-[16px] sm:[&_.MuiSvgIcon-root]:!text-[18px] !p-0 !mr-2"
                  />
                }
                label="isActive"
                slotProps={{
                  typography: {
                    className: "!text-xs sm:!text-sm !text-text-primary",
                  },
                }}
                className="!m-0 flex justify-center"
              />
            </div>
          </div>

          <hr className="border-0 border-t border-t-border" />

          <div className="flex justify-end items-center gap-3">
            <Button
              variant="outlined"
              type="button"
              className="!text-xs sm:!text-sm !capitalize !rounded-md !px-2 sm:!px-4 !py-2 sm:!py-2.5 !border-border !text-text-secondary hover:!bg-bg-hover hover:!border-secondary/40 transition-all"
              onClick={() => {
                if (product?.name) {
                  onClose();
                } else {
                  Navigate("/products", { replace: true });
                }
              }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              onClick={saveProductHandler}
              className="!text-xs sm:!text-sm !capitalize !font-semibold !rounded-md !px-2 sm:!px-4 !py-2 sm:!py-2.5 !bg-primary/80 hover:!bg-primary-hover/70 disabled:!opacity-70 !text-white !flex !items-center !gap-2"
            >
              {loading && (
                <CircularProgress size={15} className="!text-white" />
              )}

              {!isEditMode
                ? loading
                  ? "Creating..."
                  : "Create Product"
                : loading
                  ? "Saving..."
                  : "Save Change"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default React.memo(AddProductPage);
