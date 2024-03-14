import React from "react";
import './sidebar.css';
import {
  MdOutlineDashboard,
  MdOutlineAnalytics,
  MdInventory2,
  MdDiscount,
  MdLogout,
  MdOutlineSettings,
} from "react-icons/md";
import { FaShop, FaUsers, FaProductHunt } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { GiShop } from "react-icons/gi";
import SidebarItem from "./SidebarItem";

const Sidebar = ({isOpen}) => {
  const links = [
    {
      name: "Dashboard",
      icon: <MdOutlineDashboard />,
      url: "/",
    },
    {
      name: "Stores",
      icon: <FaShop />,
      url: "/stores",
    },
    {
      name: "Analytics",
      icon: <MdOutlineAnalytics />,
      url: "/analytics",
    },
    {
      name: "Drivers",
      icon: <TbTruckDelivery />,
      url: "/drivers",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      url: "/users",
    },
    {
      name: "Customers",
      icon: <FaUsers />,
      url: "/customers",
    },
    {
      name: "Orders",
      icon: <GiShop />,
      url: "/orders",
    },
    {
      name: "Products",
      icon: <FaProductHunt />,
      url: "/products",
    },
    {
      name: "Inventory",
      icon: <MdInventory2 />,
      url: "/inventory",
    },
    {
      name: "Discounts",
      icon: <MdDiscount />,
      url: "/discounts",
    },
    {
      name: "Settings",
      icon: <MdOutlineSettings />,
      url: "/settings",
    },
    {
      name: "Logout",
      icon: <MdLogout />,
    },
  ];

  return (
    <div
      className={`custom-scrollbar-style fixed lg:flex w-[300px] overflow-y-scroll inset-0 top-0 left-0 bottom-0 z-50 bg-gray-300 transition-transform transform `}
      // ${
      //   // isOpen ? "lg:hidden translate-x-0 bg-slates opacity-95" : "-translate-x-full"
      // }
    >
      <div
        // className={`${
        //   isOpen
        //     ? "w-[300px] bg-zinc h-[100%] overflow-y-auto"
        //     : ""
        // }`}
        className="" // Apply custom scrollbar style here
      >
        <div>
          <h1 className="text-xl text-purple font-bold ps-10 pt-3 mb-10">
            CSMS
          </h1>
        </div>
        <div>
          {links.slice(0, 4).map((link, index) => (
            <SidebarItem key={index} {...link} />
          ))}
        </div>
        <hr className="ms-5 my-5 w-[250px] h-[2px] bg-slate-200" />
        <div>
          {links.slice(4, 9).map((link, index) => (
            <SidebarItem key={index} {...link} />
          ))}
        </div>
        <hr className="ms-5 my-5 w-[250px] h-[2px] bg-slate-200" />
        <div>
          {links.slice(9, 11).map((link, index) => (
            <SidebarItem key={index} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
