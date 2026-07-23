import Skeleton from "@mui/material/Skeleton";

const ProductCardsSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-10">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 p-6 rounded-xl bg-bg-card border border-border shadow"
            >
              {/* Image */}
              <Skeleton
                variant="rounded"
                height={220}
                className="!rounded-xl !bg-secondary/30"
              />

              {/* Title */}
              <Skeleton
                variant="text"
                height={32}
                width="75%"
                className="!bg-secondary/30"
              />

              {/* Description */}
              <Skeleton
                variant="text"
                height={20}
                width="100%"
                className="!bg-secondary/30"
              />

              <Skeleton
                variant="text"
                height={20}
                width="60%"
                className="!bg-secondary/30"
              />

              {/* Footer */}
              <div className="flex justify-between items-center mt-2">
                <Skeleton
                  variant="text"
                  width={100}
                  height={35}
                  className="!bg-secondary/30"
                />

                <Skeleton
                  variant="rounded"
                  width={90}
                  height={38}
                  className="!rounded-xl !bg-secondary/30"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mx-auto rounded-3xl bg-bg-card p-4 w-fit shadow">
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                width={40}
                height={40}
                className="!rounded-lg !bg-secondary/30"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardsSkeleton;
