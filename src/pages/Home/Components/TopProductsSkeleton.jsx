import React from "react";
import { Skeleton } from "@mui/material";

const TopProductsSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-border bg-bg-card p-6 shadow">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Skeleton
          animation="wave"
          variant="text"
          width={140}
          height={22}
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

      {/* Products */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl border border-secondary/5 bg-secondary/2 p-3"
          >
            {/* Image */}
            <Skeleton
              animation="wave"
              variant="rounded"
              width={56}
              height={56}
              className="!rounded-lg !bg-secondary/30"
            />

            {/* Text */}
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton
                animation="wave"
                variant="text"
                width="55%"
                height={20}
                className="!bg-secondary/30"
              />

              <Skeleton
                animation="wave"
                variant="text"
                width="80%"
                height={16}
                className="!bg-secondary/30"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TopProductsSkeleton);
