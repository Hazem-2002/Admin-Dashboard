import React from "react";

const HomePageHeader = () => {
  return (
    <div className="flex flex-col gap-3 rounded-3xl p-6 border border-border bg-bg-card shadow">
      <h2 className="text-xs sm:text-sm text-primary tracking-[0.25rem] uppercase font-semibold leading-none">
        Admin Overview
      </h2>

      <p className="text-lg sm:text-xl capitalize font-semibold text-text-primary leading-none">
        Real-time commerce health
      </p>

      <p className="text-xs sm:text-sm text-text-muted leading-none">
        Monitor your storefront with AI-style clarity and live API metrics
      </p>
    </div>
  );
};

export default React.memo(HomePageHeader);
