import { cn } from "@/lib/utils";
import React from "react";

interface InputLabelProps {
  value: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
export const InputLabel = ({ value, setValue, label }: InputLabelProps) => {
  return (
    <div className="relative w-[100%]  rounded-xl  h-[55px] flex items-center group">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={cn(
          "peer absolute pl-[11px] pt-4 w-full h-full rounded-xl bg-[#252527]/50 text-white focus:border-2 focus:border-[#0071E3] outline-none border-[#6E6E73] border z-[999]"
        )}
      />
      <label
        className={cn(
          "text-gray-300 absolute top-1/2 transform -translate-y-1/2 left-4 peer-focus:-translate-y-5 transition-all peer-focus:text-[13px] peer-focus:-translate-x-1",
          value && "text-[13px] -translate-y-5 -translate-x-1"
        )}
      >
        {label}
      </label>
    </div>
  );
};
