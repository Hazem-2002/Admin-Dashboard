import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Keyboard,
  Virtual,
  Pagination,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductCard = ({ product, openEditProductDialog }) => {
  const Navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4 bg-bg-card border border-border shadow hover:shadow-[0_0_10px] hover:shadow-secondary/35 transition duration rounded-3xl overflow-hidden group">
      <Swiper
        modules={[Virtual, Keyboard, Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        keyboard
        navigation
        pagination={{ clickable: product?.images?.length > 1 }}
        virtual={product?.images?.length > 1}
        slidesPerView={1}
        className={`w-full h-64 [&_.swiper-button-next,&_.swiper-button-prev]:!size-8 [&_.swiper-button-next,&_.swiper-button-prev]:!bg-black/35 [&_.swiper-button-next,&_.swiper-button-prev]:hover:!bg-black/60 [&_.swiper-button-next,&_.swiper-button-prev]:!text-white [&_.swiper-button-next,&_.swiper-button-prev]:!rounded-full [&_.swiper-button-next,&_.swiper-button-prev]:!mx-1.5 [&_.swiper-button-next,&_.swiper-button-prev]:!hidden  ${product?.images?.length > 1 ? "group-hover:[&_.swiper-button-next,&_.swiper-button-prev]:!flex" : "[&_.swiper-button-next,&_.swiper-button-prev]:!hidden"} [&_.swiper-navigation-icon]:!size-4 [&_.swiper-pagination]:!bottom-2 [&_.swiper-pagination-bullet]:!size-2 [&_.swiper-pagination-bullet]:!bg-black/20 [&_.swiper-pagination-bullet-active]:!bg-primary [&_.swiper-pagination-bullet]:!opacity-100`}
      >
        {product.images?.map((image, index) => (
          <SwiperSlide
            key={image.public_id}
            virtualIndex={index}
            className="!overflow-hidden"
          >
            <div className="!w-full !h-full relative overflow-hidden">
              <img
                src={image.url}
                alt={product.name}
                className="w-full h-full object-cover object-center group-hover:scale-104 transition duration-200 will-change-transform"
              />

              {product.featured && (
                <div className="flex items-center gap-1 absolute left-4 top-4 bg-yellow-400 px-2 py-0.5 rounded-2xl text-[12px] font-semibold text-black">
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
                    className="lucide lucide-star-icon lucide-star !size-3"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                  </svg>
                  Featured
                </div>
              )}

              <div
                className={`flex items-center gap-1 absolute right-4 bottom-4 backdrop-blur ${product.stock > 0 ? "bg-success/25 text-success/80 border border-success/20" : "bg-danger/25 text-danger/80 border border-danger/20"} px-2 py-0.5 rounded-2xl text-[13px] font-semibold`}
              >
                {product.stock ? `${product.stock} in stock` : "Out of Stock"}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex flex-col justify-between gap-3 px-6 pb-6 grow">
        {/* Product Name */}
        <h2 className="text-xl xl:text-2xl font-bold capitalize tracking-wide text-text-primary leading-tight break-words">
          {product.name}
        </h2>

        {/* Category • Subcategory • Brand */}
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-text-muted">
          {[product.category, product.subcategory, product.brand]
            .filter(Boolean)
            .join(" • ")}
        </p>

        {/* Short Description */}
        <p className="mt-2 text-sm leading-6 text-text-primary/90 break-words line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {/* Current Price */}
          <p className="text-xl font-bold text-text-primary">
            {new Intl.NumberFormat("en-EG", {
              style: "currency",
              currency: "EGP",
            }).format(product.discountPrice || product.price)}
          </p>

          {/* Original Price */}
          {product.discountPrice > 0 &&
            product.discountPrice < product.price && (
              <>
                <p className="text-lg text-text-muted/50 dark:text-text-muted/65 line-through">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(product.price)}
                </p>

                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-success/10 text-success border border-success/20">
                  {Math.round(
                    ((product.price - product.discountPrice) / product.price) *
                      100,
                  )}
                  % OFF
                </span>
              </>
            )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {product?.tags?.map((tag, index) => (
            <span
              key={tag + index}
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide bg-secondary/10 dark:bg-secondary/20 text-secondary/90 border border-secondary/15 transition-colors duration-200 hover:bg-secondary/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <hr className="my-2 border-0 border-t border-border" />

        <div className="block xl:flex justify-between items-center">
          <div className="grid grid-cols-2 xl:flex gap-3">
            {/* View Button */}
            <Button
              className="!capitalize !bg-primary/65 hover:!bg-primary/55 !rounded-xl !text-xs !duration-200"
              variant="contained"
              onClick={() => Navigate(`/products/view/${product._id}`)}
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
                  className="lucide lucide-eye-icon lucide-eye !size-3.5"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              }
            >
              view
            </Button>

            {/* Edit Button */}
            <Button
              className="!capitalize !bg-primary/65 !py-2 hover:!bg-primary/55 !rounded-xl !text-xs !duration-200"
              variant="contained"
              onClick={() => Navigate(`/products/edit/${product._id}`)}
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
                  className="lucide lucide-pencil-icon lucide-pencil !size-3.5"
                >
                  <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                  <path d="m15 5 4 4" />
                </svg>
              }
            >
              Edit
            </Button>

            {/* Qiuck Edit Button */}
            <Button
              className="!capitalize !bg-primary/65 hover:!bg-primary/55 !rounded-xl !text-xs !duration-200"
              variant="contained"
              onClick={() => {
                openEditProductDialog(product);
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
                  className="lucide lucide-settings2-icon lucide-settings-2 !size-3.5"
                >
                  <path d="M14 17H5" />
                  <path d="M19 7h-9" />
                  <circle cx="17" cy="17" r="3" />
                  <circle cx="7" cy="7" r="3" />
                </svg>
              }
            >
              Quick Edit
            </Button>

            {/* Delete */}
            <Button
              className="!flex xl:!hidden !capitalize !backdrop-blur !bg-danger/10 hover:!bg-danger/20 !text-danger !border !border-danger/30 !rounded-xl !text-xs !duration-200"
              variant="contained"
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
                  className="lucide lucide-trash-icon lucide-trash !size-3.5"
                >
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                  <path d="M3 6h18" />
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              }
            >
              delete
            </Button>
          </div>

          {/* Delete */}
          <Button
            className="!hidden xl:!flex !capitalize !backdrop-blur !bg-danger/10 hover:!bg-danger/15 !text-danger !border !border-danger/30 !rounded-xl !text-xs !duration-200"
            variant="contained"
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
                className="lucide lucide-trash-icon lucide-trash !size-3.5"
              >
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            }
          >
            delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
