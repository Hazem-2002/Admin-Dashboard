// import React from 'react';
import "./Loader.css";
import { DotWave } from "ldrs/react";
import "ldrs/react/DotWave.css";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-bg-main">
      <div className="flex flex-col justify-center items-center gap-8">
        {/* Ring */}
        <div className="loader border-3 border-secondary/30">
          <div className="loader-ring">
            <div className="loader-core" />
          </div>
        </div>
        <div>
          {/* Loading Session */}
          <h2 className="text-text-primary text-2xl text-center font-bold">
            Loading Session
          </h2>
          {/* verifying authentication */}
          <p className="capitalize text-text-muted/80 text-center mt-3">
            verifying authentication
          </p>
        </div>
        <DotWave size={47} speed={1} color="var(--primary)" />
      </div>
    </div>
  );
};

export default Loader;
