import React from "react";

type Props = {};

function SideBar({}: Props) {
  return <div className="w-full p-2 rounded-2xl border-[1px] border-gray-200 max-md:hidden">
    <span>فیلتر</span>
  </div>;
}

export default SideBar;
