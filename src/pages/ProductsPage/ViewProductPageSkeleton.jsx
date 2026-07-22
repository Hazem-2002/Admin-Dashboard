import React from "react";
import { Skeleton } from "@mui/material";

const ViewProductPageSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-5 p-6 rounded-2xl bg-bg-card border border-border">
        <Skeleton variant="text" width={120} height={24} className="!bg-secondary/30" />

        <div className="flex items-center gap-4">
          <Skeleton variant="rounded" width={48} height={48} className="!bg-secondary/30" />

          <div className="flex flex-col gap-2 flex-1">
            <Skeleton variant="text" width="45%" height={36} className="!bg-secondary/30" />
            <Skeleton variant="text" width="30%" height={20} className="!bg-secondary/30" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Left */}
        <div className="flex flex-col justify-between h-[82vh] sm:h-[76vh]">
          <Skeleton variant="rounded" className="!w-full !grow !bg-secondary/30" />

          <div className="grid grid-cols-5 gap-2 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} variant="rounded" height={90} className="!bg-secondary/30" />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-6">
          {/* Overview */}
          <div className="bg-bg-card border border-border p-5 rounded-2xl">
            <Skeleton width={100} height={18} className="!bg-secondary/30" />

            <Skeleton width="70%" height={40} className="mt-3 !bg-secondary/30" />

            <Skeleton height={18} className="mt-3 !bg-secondary/30" />
            <Skeleton height={18} width="90%" className="!bg-secondary/30" />
            <Skeleton height={18} width="75%" className="!bg-secondary/30" />
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-bg-card border border-border p-4 rounded-lg"
              >
                <Skeleton width={70} height={18} className="!bg-secondary/30" />
                <Skeleton width="60%" height={28} className="!bg-secondary/30" />
              </div>
            ))}

            <div className="col-span-2 bg-bg-card border border-border p-4 rounded-lg">
              <Skeleton width={90} height={18} className="!bg-secondary/30" />

              <div className="flex gap-2 mt-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} variant="rounded" width={70} height={28} className="!bg-secondary/30" />
                ))}
              </div>
            </div>

            <div className="col-span-2 bg-bg-card border border-border p-4 rounded-lg">
              <Skeleton width={130} height={18} className="!bg-secondary/30" />
              <Skeleton width="65%" height={24} className="!bg-secondary/30" />
            </div>

            <div className="col-span-2 bg-bg-card border border-border p-4 rounded-lg">
              <Skeleton width={100} height={18} className="!bg-secondary/30" />
              <Skeleton height={18} className="mt-3" className="!bg-secondary/30" />
              <Skeleton height={18} width="90%" className="!bg-secondary/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ViewProductPageSkeleton);
