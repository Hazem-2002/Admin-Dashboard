import React from "react";
import { Skeleton } from "@mui/material";

const RecentOrdersSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-border bg-bg-card p-6 shadow">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <Skeleton
            animation="wave"
            variant="text"
            width={150}
            height={22}
            className="!bg-secondary/30"
          />

          <Skeleton
            animation="wave"
            variant="rounded"
            width={80}
            height={28}
            className="!rounded-full !bg-secondary/30"
          />
        </div>

        <Skeleton
          animation="wave"
          variant="text"
          width="80%"
          height={18}
          className="!bg-secondary/30"
        />
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-2xl border border-secondary/5 bg-secondary/2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
          >
            {/* Left */}
            <div className="flex grow flex-col gap-2">
              <Skeleton
                animation="wave"
                variant="text"
                width={140}
                height={20}
                className="!bg-secondary/30"
              />

              <Skeleton
                animation="wave"
                variant="text"
                width="90%"
                height={16}
                className="!bg-secondary/30"
              />
            </div>

            {/* Right */}
            <div className="flex items-center justify-between gap-4 sm:justify-end">
              <Skeleton
                animation="wave"
                variant="rounded"
                width={85}
                height={28}
                className="!rounded-full !bg-secondary/30"
              />

              <Skeleton
                animation="wave"
                variant="text"
                width={70}
                height={22}
                className="!bg-secondary/30"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(RecentOrdersSkeleton);
