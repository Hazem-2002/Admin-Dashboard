import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";

const CheckboxField = ({
  label,
  checked,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`flex items-center rounded-2xl border border-border bg-primary/4 px-3 py-1.5 ${className}`}
    >
      <FormControlLabel
        checked={checked}
        onChange={onChange}
        control={
          <Checkbox
            size="small"
            className="!p-0 !mr-2 !text-primary [&.Mui-checked]:!text-primary [&_.MuiSvgIcon-root]:!text-[16px] sm:[&_.MuiSvgIcon-root]:!text-[18px]"
            {...props}
          />
        }
        label={label}
        slotProps={{
          typography: {
            className: "!text-xs sm:!text-sm !text-text-primary",
          },
        }}
        className="!m-0 flex justify-center"
      />
    </div>
  );
};

export default React.memo(CheckboxField);
