import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardDataThunk } from "../../features/dashboard/Thunks/getDashboardDataThunk";

import { getDashboardStats } from "./Components/statsData";

import HomePageHeader from "./Components/HomePageHeader";
import StatsCard from "./Components/StatsCard";
import OrderStatus from "./Components/OrderStatus";
import TopProducts from "./Components/TopProducts";
import RecentOrders from "./Components/RecentOrders";
import StatsCardSkeleton from "./Components/StatsCardSkeleton";
import OrderStatusSkeleton from "./Components/OrderStatusSkeleton";
import TopProductsSkeleton from "./Components/TopProductsSkeleton";
import RecentOrdersSkeleton from "./Components/RecentOrdersSkeleton";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((store) => store.dashboard);
  useEffect(() => {
    try {
      dispatch(getDashboardDataThunk());
    } catch (error) {
      console.log(error);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    <div className="flex flex-col justify-center h-full gap-10 py-6 px-4 sm:p-6">
      {/* Admin overview */}
      <HomePageHeader />

      {/* Stats Cards */}
      {!loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid-rows-2 justify-items-stretch gap-6 rounded-3xl">
          {getDashboardStats(data).map((stat) => (
            <StatsCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              icon={stat.icon}
              gradient={stat.gradient}
            />
          ))}
        </div>
      ) : (
        <StatsCardSkeleton />
      )}

      {/* Order status && Top products */}
      <div className="grid sm:grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-1 xl:grid-cols-[1.3fr_1fr] items-start gap-6">
        {/* Order status */}
        {!loading ? <OrderStatus data={data} /> : <OrderStatusSkeleton />}
        {/* Top products */}
        {!loading ? <TopProducts data={data} /> : <TopProductsSkeleton />}
      </div>

      {/* Recent orders */}
      {!loading ? <RecentOrders data={data} /> : <RecentOrdersSkeleton />}
    </div>
  );
};

export default React.memo(DashboardPage);
