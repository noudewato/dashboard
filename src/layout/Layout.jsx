import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <Sidebar  />
      {/* isOpen={isSidebarOpen} */}
      <div className="w-full p-5 bg-zinc min-h-[100vh] ml-[300px]">
        <Navbar  />
        {/* toggleSidebar={toggleSidebar} */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
