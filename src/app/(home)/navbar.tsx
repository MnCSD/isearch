import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PanelLeftIcon,
  PlusIcon,
  ShareIcon,
} from "lucide-react";
import React from "react";
import {
  IoCopyOutline,
  IoShareOutline,
  IoShieldHalfOutline,
} from "react-icons/io5";
import { SearchInput } from "./search-input";

export const Navbar = () => {
  return (
    <nav className="absolute top-0 z-[999] w-full h-[45px] bg-[#3f3d3f]/85">
      <div className="w-full flex items-center justify-between py-4 pt-2 px-4">
        <div className=" items-center gap-x-4 hidden md:flex">
          <PanelLeftIcon className="size-5" color="white" />
          <div className="flex items-center gap-x-[4px]">
            <ChevronLeftIcon
              className="size-6 cursor-pointer"
              color="#636163"
              strokeWidth={2}
            />
            <ChevronRightIcon
              className="size-6 cursor-pointer"
              color="#636163"
              strokeWidth={2}
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-x-2 max-w-screen-lg w-full">
          <SearchInput />
        </div>

        <div className="flex items-center gap-x-4">
          <IoShareOutline
            className="size-[22px] cursor-pointer"
            color="#636163"
            strokeWidth={2}
          />
          <PlusIcon
            className="size-[20px] cursor-pointer"
            color="#B9B7B9"
            strokeWidth={2}
          />
          <IoCopyOutline
            className="size-[20px] cursor-pointer"
            color="#B9B7B9"
            strokeWidth={2}
          />
        </div>
      </div>
    </nav>
  );
};
