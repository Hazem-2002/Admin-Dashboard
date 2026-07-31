import React from "react";
import { Skeleton } from "@mui/material";

const OrderStatusSkeleton = () => {
  return (
    <div className="md:sticky left-0 top-24 flex flex-col gap-6 rounded-3xl border border-border bg-bg-card p-6 shadow">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <Skeleton
            animation="wave"
            variant="text"
            width={120}
            height={24}
            className="!bg-secondary/30"
          />

          <Skeleton
            animation="wave"
            variant="rounded"
            width={70}
            height={24}
            className="!rounded-full !bg-secondary/30"
          />
        </div>

        <Skeleton
          animation="wave"
          variant="text"
          width="100%"
          height={18}
          className="!bg-secondary/30"
        />

        <Skeleton
          animation="wave"
          variant="text"
          width="75%"
          height={18}
          className="!bg-secondary/30"
        />
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border bg-secondary/10 p-3"
          >
            <Skeleton
              animation="wave"
              variant="text"
              width={70}
              height={16}
              className="!bg-secondary/30"
            />

            <Skeleton
              animation="wave"
              variant="text"
              width={40}
              height={34}
              className="!mt-2 !bg-secondary/30"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(OrderStatusSkeleton);
