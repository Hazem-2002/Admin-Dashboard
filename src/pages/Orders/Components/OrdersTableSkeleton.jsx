import React from "react";
import { Skeleton } from "@mui/material";

const OrdersTableSkeleton = ({ children, numberOfItems }) => {
  return (
    <table className="min-w-[620px] sm:min-w-full border-separate border-spacing-0">
      <thead className="sticky top-0 z-10 bg-bg-main text-text-primary/85">
        <tr className="bg-secondary/13 dark:bg-secondary/20">
          {Array.from({ length: 6 }).map((_, index) => (
            <th key={index} className="py-4 px-6">
              <Skeleton
                variant="text"
                width={60}
                height={16}
                className="mx-auto !bg-secondary/30"
              />
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="bg-secondary/[0.01] dark:bg-bg-card">
        {Array.from({
          length: numberOfItems ? numberOfItems : 5,
        }).map((_, rowIndex, array) => (
          <tr key={rowIndex}>
            {/* Order */}
            <td
              className={`py-4 px-6 ${array.length - 1 !== rowIndex ? "border-b" : ""} border-secondary/15 dark:border-secondary/20`}
            >
              <Skeleton
                variant="text"
                width={60}
                height={18}
                className="!bg-secondary/30"
              />
            </td>

            {/* Customer */}
            <td
              className={`py-4 px-6 ${array.length - 1 !== rowIndex ? "border-b" : ""} border-secondary/15 dark:border-secondary/20`}
            >
              <div className="grid grid-cols-[34px_1.7fr] gap-4 items-center">
                <Skeleton
                  variant="circular"
                  width={34}
                  height={34}
                  className="justify-self-end !bg-secondary/30"
                />

                <div>
                  <Skeleton
                    variant="text"
                    width={90}
                    height={18}
                    className="!bg-secondary/30"
                  />
                  <Skeleton
                    variant="text"
                    width={130}
                    height={14}
                    className="!bg-secondary/30"
                  />
                </div>
              </div>
            </td>

            {/* Date */}
            <td
              className={`py-4 px-6 ${array.length - 1 !== rowIndex ? "border-b" : ""} border-secondary/15 dark:border-secondary/20`}
            >
              <Skeleton
                variant="text"
                width={70}
                height={18}
                className="mx-auto !bg-secondary/30"
              />
            </td>

            {/* Status */}
            <td
              className={`py-4 px-6 ${array.length - 1 !== rowIndex ? "border-b" : ""} border-secondary/15 dark:border-secondary/20`}
            >
              <Skeleton
                variant="rounded"
                width={80}
                height={26}
                className="mx-auto !bg-secondary/30"
              />
            </td>

            {/* Payment */}
            <td
              className={`py-4 px-6 ${array.length - 1 !== rowIndex ? "border-b" : ""} border-secondary/15 dark:border-secondary/20`}
            >
              <div className="flex flex-col items-center gap-1">
                <Skeleton
                  variant="rounded"
                  width={80}
                  height={26}
                  className="!bg-secondary/30"
                />
                <Skeleton
                  variant="text"
                  width={60}
                  height={14}
                  className="!bg-secondary/30"
                />
              </div>
            </td>

            {/* Total */}
            <td
              className={`py-4 px-6 ${array.length - 1 !== rowIndex ? "border-b" : ""} border-secondary/15 dark:border-secondary/20`}
            >
              <Skeleton
                variant="text"
                width={80}
                height={20}
                className="mx-auto !bg-secondary/30"
              />
            </td>
          </tr>
        ))}
      </tbody>
      {!children ? (
        <tfoot className="sticky bottom-0 z-10 bg-bg-main">
          <tr className="bg-secondary/5 dark:bg-secondary/15">
            <td colSpan={6} className="py-3 px-6">
              <div className="flex justify-end">
                <Skeleton
                  variant="rounded"
                  width={250}
                  height={32}
                  className="!bg-secondary/30"
                />
              </div>
            </td>
          </tr>
        </tfoot>
      ) : (
        children
      )}
    </table>
  );
};

export default React.memo(OrdersTableSkeleton);
