import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import { useState } from "react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-zinc min-h-[100vh]">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="w-full lg:w-3/4 p-5">
        <Navbar toggleSidebar={toggleSidebar} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
