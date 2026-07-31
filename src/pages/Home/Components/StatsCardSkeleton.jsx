import React from "react";
import { Skeleton } from "@mui/material";

const DashboardStatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid-rows-2 justify-items-stretch gap-6 rounded-3xl">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="rounded-3xl pb-[2px]">
          <article className="relative overflow-hidden rounded-3xl bg-bg-card p-6 shadow">
            {/* Top Line */}
            <div className="absolute left-0 top-0 h-1 w-full bg-secondary/30" />

            {/* Glow */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-secondary/30 blur-3xl opacity-30" />

            <div className="relative flex items-start justify-between gap-4">
              <div className="flex w-full flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Skeleton
                    animation="wave"
                    variant="text"
                    width={110}
                    height={20}
                    className="!bg-secondary/30"
                  />

                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={48}
                    height={48}
                    className="!rounded-2xl !bg-secondary/30"
                  />
                </div>

                <Skeleton
                  animation="wave"
                  variant="text"
                  width="60%"
                  height={34}
                  className="!-mt-2 !bg-secondary/30"
                />

                <Skeleton
                  animation="wave"
                  variant="text"
                  width="85%"
                  height={18}
                  className="!bg-secondary/30"
                />
              </div>
            </div>

            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
          </article>
        </div>
      ))}
    </div>
  );
};

export default React.memo(DashboardStatsSkeleton);
