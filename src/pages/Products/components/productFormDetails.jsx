import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Chip } from "@mui/material";

import Label from "../../../components/Label";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import TextArea from "../../../components/TextArea";
import NumericStepper from "../../../components/NumericStepper";
import CheckboxField from "../../../components/CheckboxField";

// icons
import CloseIcon from "@mui/icons-material/Close";

const ProductFormDetails = ({
  loading,
  formData,
  formDataChange,
  errors,
  errorsChange,
  submitHandler,
  mode,
  onClose,
}) => {
  // Tag Input Field
  const [tagsInput, setTagsInput] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col p-5 gap-6 bg-bg-card rounded-3xl shadow border border-border">
      {/* Product Name */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="Product_Name" value="Product Name" />
        <Input
          type="text"
          required={true}
          id="Product_Name"
          placeholder="iphone 16 Pro Max"
          value={formData.name}
          onChange={(e) => {
            formDataChange({ ...formData, name: e.target.value });
            errorsChange({ ...errors, name: "" });
          }}
        />
        {errors.name && (
          <p className="text-red-400 text-xs -mt-2">{errors.name}</p>
        )}
      </div>

      {/* Short Description */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="short_description" value="Short Description" />
        <Input
          type="text"
          id="short_description"
          required={true}
          value={formData.shortDescription}
          onChange={(e) => {
            formDataChange({
              ...formData,
              shortDescription: e.target.value,
            });
            errorsChange({ ...errors, shortDescription: "" });
          }}
          placeholder="Minimum 10 characters"
        />
        {errors.shortDescription && (
          <p className="text-red-400 text-xs -mt-2">
            {errors.shortDescription}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="description" value="Description" />
        <TextArea
          type="text"
          id="description"
          required={true}
          value={formData.description}
          onChange={(e) => {
            formDataChange({ ...formData, description: e.target.value });
            errorsChange({ ...errors, description: "" });
          }}
          placeholder="Minimum 20 characters"
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
          <Label htmlFor="price" value="Price" />
          <NumericStepper
            id=""
            required={true}
            placeholder="e.g. 199.99"
            value={formData.price}
            onChange={(e) => {
              formDataChange({ ...formData, price: e.target.value });
              errorsChange({ ...errors, price: "" });
            }}
            incrementHandler={() =>
              formDataChange({
                ...formData,
                price: Number(formData.price || 0) + 1,
              })
            }
            decrementHandler={() =>
              formDataChange({
                ...formData,
                price: Math.max(0, Number(formData.price || 0) - 1),
              })
            }
          />
          {errors.price && (
            <p className="text-red-400 text-xs -mt-2">{errors.price}</p>
          )}
        </div>

        {/* Discount Price */}
        <div className="flex flex-col gap-3 grow">
          <Label htmlFor="discount_price" value="Discount Price" />
          <NumericStepper
            id="discount_price"
            required={true}
            placeholder="e.g. 99.99"
            value={formData.discountPrice}
            onChange={(e) => {
              formDataChange({
                ...formData,
                discountPrice: e.target.value,
              });
              errorsChange({
                ...errors,
                discountPrice: "",
              });
            }}
            incrementHandler={() =>
              formDataChange({
                ...formData,
                discountPrice: Number(formData.discountPrice || 0) + 1,
              })
            }
            decrementHandler={() =>
              formDataChange({
                ...formData,
                discountPrice: Math.max(
                  0,
                  Number(formData.discountPrice || 0) - 1,
                ),
              })
            }
          />
          {errors.discountPrice && (
            <p className="text-red-400 text-xs -mt-2">{errors.discountPrice}</p>
          )}
        </div>
      </div>

      {/* Stock && SKU */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 justify-between">
        {/* Stock */}
        <div className="flex flex-col gap-3 grow">
          <Label htmlFor="stock" value="Stock" />
          <NumericStepper
            id="stock"
            required={true}
            placeholder="e.g. 50"
            value={formData.stock}
            onChange={(e) => {
              formDataChange({
                ...formData,
                stock: e.target.value,
              });
              errorsChange({
                ...errors,
                stock: "",
              });
            }}
            incrementHandler={() =>
              formDataChange({
                ...formData,
                stock: Number(formData.stock || 0) + 1,
              })
            }
            decrementHandler={() =>
              formDataChange({
                ...formData,
                stock: Math.max(0, Number(formData.stock || 0) - 1),
              })
            }
          />
          {errors.stock && (
            <p className="text-red-400 text-xs -mt-2">{errors.stock}</p>
          )}
        </div>

        {/* SKU */}
        <div className="flex flex-col gap-3 grow">
          <Label htmlFor="sku" value="SKU" />
          <input
            type="text"
            id="sku"
            required
            value={formData.sku}
            onChange={(e) => {
              formDataChange({ ...formData, sku: e.target.value });
              errorsChange({ ...errors, sku: "" });
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
            placeholder="Select category"
            onChange={(e) => {
              formDataChange({
                ...formData,
                category: e.target.value,
              });

              errorsChange({
                ...errors,
                category: "",
              });
            }}
            menuItems={["Electronics", "Fashion", "Accessories"]}
          />

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
          <Input
            type="text"
            id="subcategory"
            required={true}
            value={formData.subcategory}
            onChange={(e) => {
              formDataChange({ ...formData, subcategory: e.target.value });
              errorsChange({ ...errors, subcategory: "" });
            }}
            placeholder="e.g. IPH15-BLK-128"
          />
          {errors.subcategory && (
            <p className="text-red-400 text-xs -mt-2">{errors.subcategory}</p>
          )}
        </div>
      </div>

      {/* Brand */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="brand" value="Brand" />
        <Input
          type="text"
          id="brand"
          required={true}
          value={formData.brand}
          onChange={(e) => {
            formDataChange({ ...formData, brand: e.target.value });
            errorsChange({ ...errors, brand: "" });
          }}
          placeholder="e.g. Apple"
        />
        {errors.brand && (
          <p className="text-red-400 text-xs -mt-2">{errors.brand}</p>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-3 w-full bg-primary/4 py-2.5 px-4 border border-border rounded-md">
        <Label htmlFor="tags" value="Tags" />
        <div className="flex gap-4 justify-between items-center">
          <Input
            type="text"
            id="tags"
            required
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. electronics"
            className="!bg-white/85 dark:!bg-white/3"
          />
          <Button
            variant="primary"
            onClick={() => {
              if (tagsInput.length > 3) {
                formDataChange({
                  ...formData,
                  tags: [...formData.tags, tagsInput],
                });
                setTagsInput("");
                errorsChange({ ...errors, tags: "" });
              }
            }}
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
                className="lucide lucide-plus-icon lucide-plus "
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            }
            className="!h-10.5 !w-15 !px-4"
          />
        </div>

        {formData?.tags?.length > 0 ? (
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
                  formDataChange({
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
        <CheckboxField
          label="Featured"
          checked={formData.featured}
          onChange={(e) =>
            formDataChange({ ...formData, featured: e.target.checked })
          }
        />

        {/* isActive */}
        <CheckboxField
          label="isActive"
          checked={formData.isActive}
          onChange={(e) =>
            formDataChange({ ...formData, isActive: e.target.checked })
          }
        />
      </div>

      <hr className="border-0 border-t border-t-border" />

      <div className="flex justify-end items-center gap-3">
        <Button
          text="Cancel"
          variant="secondary"
          type="button"
          onClick={() => {
            if (mode === "quick-edit") {
              onClose();
            } else {
              Navigate("/products", { replace: true });
            }
          }}
          className="!h-10.5"
        />

        <Button
          text={mode === "add" ? "Create Product" : "Save Change"}
          loadingText={mode === "add" ? "Creating" : "Saving"}
          variant="primary"
          type="submit"
          loading={loading}
          onClick={submitHandler}
          className="!h-10.5"
        />
      </div>
    </div>
  );
};

export default React.memo(ProductFormDetails);
