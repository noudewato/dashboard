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
