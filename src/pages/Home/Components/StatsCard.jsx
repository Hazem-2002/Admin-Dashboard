import React from "react";

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  gradient = "from-emerald-400 to-teal-500",
}) => {
  return (
    <div
      className={`group rounded-3xl hover:bg-gradient-to-br ${gradient} pb-[2px] transition-all duration-300 hover:-translate-y-1.5 will-change-transform`}
    >
      <article className="relative overflow-hidden rounded-3xl bg-bg-card p-6 shadow">
        {/* Top Line */}
        <div
          className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${gradient}`}
        />

        {/* Glow */}
        <div
          className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${gradient} opacity-0 blur-3xl transition-all duration-300 group-hover:opacity-40`}
        />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between items-center w-full">
              <p className="text-sm font-semibold text-text-muted/90 tracking-[0.045rem]">
                {title}
              </p>

              {/* Icon */}
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow transition-all duration-300 group-hover:scale-105 group-hover:rotate-12`}
              >
                <Icon className="size-6 text-white" />
              </div>
            </div>

            <h3
              className={`text-[15px] sm:text-[16px] font-bold text-text-primary tracking-[0.04rem] -mt-2`}
            >
              {value}
            </h3>

            <p className="text-xs text-text-muted tracking-[0.03rem]">{description}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />
      </article>
    </div>
  );
};

export default React.memo(StatsCard);
