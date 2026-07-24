import React from "react";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode, Thumbs, Autoplay } from "swiper/modules";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductByIdThunk } from "../../../features/products/Thunks/GetSingleProductThunk";
import ViewProductPageSkeleton from "./ViewProductPageSkeleton";
import { NavLink } from "react-router-dom";

// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const ViewProductPage = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const getProductDispatch = useDispatch();
  const { product } = useSelector((store) => store.products);
  const { loading } = useSelector((store) => store.products);
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getProductDispatch(getProductByIdThunk(id));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  console.log(product);

  return (
    <>
      {loading ? (
        <ViewProductPageSkeleton />
      ) : (
        <div className="flex flex-col gap-8 p-8">
          {/* Header */}
          <div className="flex flex-col gap-5 p-6 rounded-2xl bg-bg-card border border-border">
            <NavLink
              to="/products"
              replace
              className="group flex items-center gap-2 w-fit capitalize text-sm font-medium text-text-muted hover:text-primary transition-colors"
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
                className="size-4 transition-transform group-hover:-translate-x-1"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Back to products
            </NavLink>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 text-primary">
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
                  className="size-6"
                >
                  <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>

              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-text-primary capitalize leading-tight">
                  {product?.name}
                </h2>

                <p className="text-sm text-text-muted/80">
                  Product details overview
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Swiper */}
            <div className="flex flex-col justify-between w-full h-[82vh] sm:h-[76vh]">
              {/* Main Swiper */}
              <div className="grow min-h-0">
                <Swiper
                  modules={[Navigation, Thumbs, Autoplay]}
                  loop
                  navigation
                  // spaceBetween={10}
                  thumbs={{
                    swiper:
                      thumbsSwiper && !thumbsSwiper.destroyed
                        ? thumbsSwiper
                        : null,
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  className={`!w-full !h-full rounded-xl border border-secondary/30 [&_.swiper-button-next,&_.swiper-button-prev]:!size-8 [&_.swiper-button-next,&_.swiper-button-prev]:!bg-bg-main/50 [&_.swiper-button-next,&_.swiper-button-prev]:hover:!bg-bg-main/65 [&_.swiper-button-next,&_.swiper-button-prev]:!text-text-primary [&_.swiper-button-next,&_.swiper-button-prev]:!rounded-full [&_.swiper-button-next,&_.swiper-button-prev]:!mx-1.5 [&_.swiper-button-next,&_.swiper-button-prev]:!hidden  ${product?.images?.length > 1 ? "hover:[&_.swiper-button-next,&_.swiper-button-prev]:!flex" : "[&_.swiper-button-next,&_.swiper-button-prev]:!hidden"} [&_.swiper-navigation-icon]:!size-4`}
                >
                  {product?.images?.map((image) => (
                    <SwiperSlide
                      key={image.public_id + "mainSwiper"}
                      className="!h-full"
                    >
                      <img
                        src={image.url}
                        alt="img"
                        className="!w-full !h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Thumbnails */}
              <div>
                <Swiper
                  modules={[FreeMode, Thumbs]}
                  onSwiper={setThumbsSwiper}
                  loop
                  watchSlidesProgress
                  freeMode
                  spaceBetween={10}
                  slidesPerView={product?.images?.length || 1}
                  className="!grow-0 mt-4"
                >
                  {product?.images?.map((image) => (
                    <SwiperSlide
                      key={image.public_id + "Thumbnails"}
                      className="transition-all duration-300 opacity-60 grow-0 [&.swiper-slide-thumb-active]:opacity-100 border border-secondary/30 [&.swiper-slide-thumb-active]:!border-3 [&.swiper-slide-thumb-active]:!border-primary/80 !cursor-pointer rounded-lg overflow-hidden"
                    >
                      <img
                        src={image.url}
                        alt=""
                        className="w-full h-[90px] object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Overview */}
              <div className="bg-bg-card border border-border p-5 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="uppercase text-xs sm:text-sm tracking-wider font-semibold text-primary">
                    Overview
                  </h2>
                </div>

                <h3 className="capitalize font-bold text-lg sm:text-2xl text-text-primary mb-3 leading-tight">
                  {product?.name}
                </h3>

                <p className="capitalize text-xs sm:text-sm leading-relaxed break-words text-text-muted/70">
                  {product?.description}
                </p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-6 w-full">
                {/* price */}
                <div className="flex flex-col gap-2 bg-bg-card border border-border p-4 rounded-lg">
                  <h2 className="capitalize text-sm font-semibold text-text-primary">
                    price
                  </h2>
                  <p className="text-sm text-secondary/85 font-semibold">
                    {new Intl.NumberFormat("us-EG", {
                      style: "currency",
                      currency: "EGP",
                    }).format(product?.price)}
                  </p>
                </div>

                {/* Discount */}
                <div className="flex flex-col gap-2 bg-bg-card border border-border p-4 rounded-lg">
                  <h2 className="capitalize text-sm font-semibold text-text-primary">
                    Discount
                  </h2>
                  <p className="text-sm text-secondary/85 font-semibold">
                    {new Intl.NumberFormat("us-EG", {
                      style: "currency",
                      currency: "EGP",
                    }).format(product?.discountPrice)}
                  </p>
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-2 bg-bg-card border border-border p-4 rounded-lg">
                  <h2 className="capitalize text-sm font-semibold text-text-primary">
                    Stock
                  </h2>
                  <p className="text-sm text-secondary/85 font-semibold">
                    {product?.stock}
                  </p>
                </div>

                {/* SKU */}
                <div className="flex flex-col gap-2 bg-bg-card border border-border p-4 rounded-lg">
                  <h2 className="capitalize text-sm font-semibold text-text-primary">
                    SKU
                  </h2>
                  <p className="text-sm text-secondary/85 font-semibold uppercase">
                    {product?.sku}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2 bg-bg-card border border-border p-4 rounded-lg col-span-2">
                  <h2 className="flex gap-2 items-center capitalize text-sm font-semibold text-text-primary">
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
                      className="lucide lucide-tags-icon lucide-tags size-4.5 text-text-primary/90"
                    >
                      <path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z" />
                      <path d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193" />
                      <circle cx="10.5" cy="6.5" r=".5" fill="currentColor" />
                    </svg>
                    tags
                  </h2>

                  <p className="flex gap-2 mt-2 text-sm text-secondary/85 font-semibold">
                    {product?.tags.map((tag, index) => (
                      <span
                        className="bg-secondary/10 dark:bg-secondary/20 py-1.5 px-2.5 rounded-full text-text-primary/80 text-xs uppercase"
                        key={tag + index}
                      >
                        {tag}
                      </span>
                    ))}
                  </p>
                </div>

                {/* Category Info */}
                <div className="flex flex-col gap-2 bg-bg-card border border-border p-4 rounded-lg col-span-2">
                  <h2 className="flex gap-2 items-center capitalize text-sm font-semibold text-text-primary">
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
                      className="lucide lucide-shopping-bag-icon lucide-shopping-bag size-4.5 text-text-primary/90"
                    >
                      <path d="M16 10a4 4 0 0 1-8 0" />
                      <path d="M3.103 6.034h17.794" />
                      <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                    </svg>
                    Category Info
                  </h2>
                  <p className="flex gap-2 mt-2 text-sm text-secondary/85 font-semibold capitalize">
                    {product?.category}
                    {" • "}
                    {product?.subcategory}
                    {" • "}
                    {product?.brand}
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-col gap-2 bg-bg-card border border-border p-4 rounded-lg col-span-2">
                  <h2 className="flex gap-2 items-center capitalize text-sm font-semibold text-text-primary">
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
                      className="lucide lucide-spotlight-icon lucide-spotlight size-4.5 text-text-primary/90"
                    >
                      <path d="M15.295 19.562 16 22" />
                      <path d="m17 16 3.758 2.098" />
                      <path d="m19 12.5 3.026-.598" />
                      <path d="M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z" />
                      <path d="M8 9V2" />
                    </svg>
                    Highlights
                  </h2>
                  <p className="flex gap-2 mt-2 text-sm text-secondary/85 font-semibold capitalize">
                    {product?.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ViewProductPage);
