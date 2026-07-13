import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../../features/products/productsSlice";
import { Button } from "@mui/material";

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

const ProductsPage = () => {
  const products = useSelector((store) => store.products);
  const productsDispatch = useDispatch();

  // Fetch users from API and set state on mount
  useEffect(() => {
    productsDispatch(getAllProducts());
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="p-8">
      {products.products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {products.products.map((product) => {
            return (
              <div
                key={product._id}
                className="max-h-80vh flex flex-col gap-4 bg-slate-100/80 dark:bg-slate-900 border border-slate-200/25 dark:border-slate-700/50 shadow hover:shadow-[0_0_10px] hover:shadow-slate-300/80 dark:hover:shadow-slate-600 transition duration rounded-3xl overflow-hidden group"
              >
                <Swiper
                  modules={[
                    Virtual,
                    Keyboard,
                    Navigation,
                    Pagination,
                    Autoplay,
                  ]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  keyboard
                  navigation
                  pagination={{ clickable: product.images.length > 1 }}
                  virtual={product.images.length > 1}
                  slidesPerView={1}
                  className={`
                      w-full h-64

                      [&_.swiper-button-next,&_.swiper-button-prev]:!size-8
                      [&_.swiper-button-next,&_.swiper-button-prev]:!bg-black/35
                      [&_.swiper-button-next,&_.swiper-button-prev]:hover:!bg-black/60
                      [&_.swiper-button-next,&_.swiper-button-prev]:!text-slate-100/90
                      [&_.swiper-button-next,&_.swiper-button-prev]:!rounded-full
                      [&_.swiper-button-next,&_.swiper-button-prev]:!mx-1.5
                      [&_.swiper-button-next,&_.swiper-button-prev]:!hidden
                       ${
                         product.images.length > 1
                           ? "group-hover:[&_.swiper-button-next,&_.swiper-button-prev]:!flex"
                           : "[&_.swiper-button-next,&_.swiper-button-prev]:!hidden"
                       }
                      
                      [&_.swiper-navigation-icon]:!size-4
                      [&_.swiper-pagination]:!bottom-2
                      [&_.swiper-pagination-bullet]:!size-2
                      [&_.swiper-pagination-bullet]:!bg-black/20
                      [&_.swiper-pagination-bullet-active]:!bg-cyan-500
                      [&_.swiper-pagination-bullet]:!opacity-100
                    `}
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
                          className={`flex items-center gap-1 absolute right-4 bottom-4 backdrop-blur ${product.stock > 0 ? "bg-emerald-100/75 text-emerald-600/80 dark:bg-emerald-500/25 dark:text-emerald-500 border border-emerald-300/30 dark:border-emerald-500/30" : "bg-rose-100/90 text-rose-500/75 dark:bg-rose-500/20 dark:text-rose-400/80 border border-rose-500/10 dark:border-rose-500/30"} px-2 py-0.5 rounded-2xl text-[14px] font-semibold`}
                        >
                          {product.stock
                            ? `${product.stock} in stock`
                            : "Out of Stock"}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <div className="flex flex-col gap-3 px-6 pb-6">
                  {/* Product Name */}
                  <h2 className="font-bold text-lg capitalize tracking-[0.1rem] text-slate-600/90 dark:text-slate-100/95">
                    {product.name}
                  </h2>

                  {/* Category && Subcategory && Brand */}
                  <p className="uppercase text-xs font-semibold text-slate-600/50 dark:text-slate-300/70">
                    {product.category}
                    {" • "}
                    {product.subcategory}
                    {" • "}
                    {product.brand}
                  </p>

                  {/* Short Description */}
                  <p className="capitalize text-slate-500/60 dark:text-slate-200/90">
                    {product.shortDescription}
                  </p>

                  {/* price */}
                  <div className="flex gap-3 mt-2 items-center">
                    <p className="font-bold text-3xl text-slate-500 dark:text-slate-100">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(product.price)}
                    </p>

                    {/* Discount Price */}
                    <p className="text-green-500/90 dark:text-green-500/90">
                      -
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(product.discountPrice)}
                    </p>
                  </div>

                  {/* tags */}
                  <div className="flex gap-2 items-center">
                    {product.tags.map((tag) => (
                      <div
                        key={tag}
                        className="text-slate-600/80 dark:text-slate-100/75 mt-2 font-semibold uppercase px-2.5 py-1 bg-slate-200 dark:bg-slate-800 border border-slate-300/90 dark:border-slate-700/70 text-[12px] rounded-xl"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <hr className="my-2 border-0 border-t border-slate-200/80 dark:border-slate-700/50" />

                  <div className="block xl:flex justify-between items-center">
                    <div className="grid grid-cols-2 xl:flex gap-3">
                      {/* View Button */}
                      <Button
                        className="!capitalize !bg-slate-700/75 dark:!bg-slate-700/50 hover:!bg-slate-700/85 dark:hover:!bg-slate-700/80 !border !border-slate-500/50 dark:!border-slate-600/50 !rounded-xl !text-xs !duration-200"
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
                        className="!capitalize !bg-slate-700/75 dark:!bg-slate-700/50 hover:!bg-slate-700/85 dark:hover:!bg-slate-700/80 !border !border-slate-500/50 dark:!border-slate-600/50 !rounded-xl !text-xs !duration-200"
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
                        className="!capitalize !bg-slate-700/75 dark:!bg-slate-700/50 hover:!bg-slate-700/85 dark:hover:!bg-slate-700/80 !border !border-slate-500/50 dark:!border-slate-600/50 !rounded-xl !text-xs !duration-200"
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
                        className="!flex xl:!hidden !capitalize !backdrop-blur !bg-rose-100/90 !text-rose-600 dark:!bg-rose-400/15 dark:hover:!bg-rose-400/25 dark:!text-rose-300 !border dark:!border-rose-500/8 !rounded-xl !text-xs !duration-200"
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
                      className="!hidden xl:!flex !capitalize !backdrop-blur !bg-rose-100/90 dark:!bg-rose-400/15 hover:!bg-rose-400/25 !text-rose-600 dark:!text-rose-300 !border !border-rose-400/40 dark:!border-rose-500/8 !rounded-xl !text-xs !duration-200"
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
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <div className="w-full py-20 flex flex-col justify-center items-center text-center border border-slate-200/60 dark:border-slate-700/80 rounded-3xl bg-slate-100/30 dark:!bg-transparent shadow">
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
              className="lucide lucide-package2-icon lucide-package-2 !size-12 text-slate-500/60 dark:text-slate-600/60"
            >
              <path d="M12 3v6" />
              <path d="M16.76 3a2 2 0 0 1 1.8 1.1l2.23 4.479a2 2 0 0 1 .21.891V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.472a2 2 0 0 1 .211-.894L5.45 4.1A2 2 0 0 1 7.24 3z" />
              <path d="M3.054 9.013h17.893" />
            </svg>

            <p className="capitalize text-xl font-bold text-slate-500/70 dark:text-slate-500 mt-4 mb-2">
              no products found
            </p>

            <p className="capitalize text-sm font-bold text-slate-500/85 dark:text-slate-600">
              Try adjusting your search or filters
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductsPage);
