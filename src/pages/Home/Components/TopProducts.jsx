import React from "react";
import { CurrencyFormat } from "../../../utils/CurrencyFormat";

const TopProducts = ({ data }) => {
  return (
    <div className="flex flex-col gap-6 rounded-3xl p-6 border border-border bg-bg-card shadow">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[14px] font-semibold text-primary tracking-[0.15rem] uppercase">
          Top Products
        </h2>
        <p className="text-xs tracking-[0.04rem] text-text-muted">
          Most popular products in the last 30 days
        </p>
      </div>

      {/* Top products list */}
      <div className="flex flex-col gap-4">
        {data.dashboard?.topProducts?.map((product) => (
          <div
            key={product._id}
            className="group flex items-center gap-4 p-3 rounded-2xl bg-secondary/2 dark:bg-secondary/5 hover:bg-secondary/5 dark:hover:bg-secondary/10 border border-secondary/5 transition-all duration-300 will-change-transform"
          >
            <div className="size-14 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="size-14 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300 will-change-transform"
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary capitalize">
                {product.name}
              </h3>
              <p className="text-xs text-text-muted/90 mt-1 tracking-[0.03rem]">
                {product.totalSold} units sold • {""}
                {CurrencyFormat(product.revenue)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TopProducts);
