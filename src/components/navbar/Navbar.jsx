import React, { useEffect, useState } from "react";
import {
  MdArrowDropDown,
  MdOutlineSupervisedUserCircle,
  MdFilterList,
  MdSearch,
} from "react-icons/md";
import { HiMiniBellAlert } from "react-icons/hi2";
import { LuMenuSquare } from "react-icons/lu";


const Navbar = ({ toggleSidebar }) => {

  const [dateTime, setDateTime] = useState(new Date()) 

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date())

    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])


  return (
    <div>
      <div className="bg-neutral rounded-lg p-3 w-full flex justify-between items-center mb-5">
        <span
          className="text-3xl md:hidden cursor-pointer"
          onClick={toggleSidebar}
        >
          <LuMenuSquare />
        </span>
        {/* <div className="flex gap-3">
          <div>
            <button className="flex text-lg text-neutral align-middle px-8 py-2 rounded-md bg-primary hover:bg-primry">
              <span className="pr-1"> Maranata, New York</span>
              <span className="pt-2">
                <MdArrowDropDown />
              </span>
            </button>
          </div>
          <div>
            <button className="flex text-lg text-neutral align-middle px-8 py-2 rounded-md bg-primary hover:bg-primry">
              + Add Product
            </button>
          </div>
        </div> */}
        <div>
           <h1 className="text-2xl font-semibold">
              Admin Dashboard
           </h1>
        </div>

        <div>
          <span>
            {dateTime.toLocaleString()}
          </span>
        </div>
        <div className="flex mr-4 cursor-pointer">
          <span className="relative text-primry text-2xl mr-2">
            <HiMiniBellAlert />
            <span className="absolute p-1 bg-purple rounded-full text-neutral top-[-18px] right-0 text-sm ">
              3
            </span>
          </span>
          <span className="text-2xl cursor-pointer">
            <MdOutlineSupervisedUserCircle />
          </span>
        </div>
      </div>
      {/* <div className="w-[400px] my-7 flex align-middle bg-neutral rounded-lg shadow-xl">
        <span className="pt-3 text-purple text-lg ps-1">
          <MdSearch />
        </span>

        <input
          className="p-2 w-[300px] rounded-lg outline-none border-none bg-neutral"
          placeholder="Search"
          type="text"
        />
        <span className="p-2 bg-primary flex align-middle text-neutral rounded-lg">
          <span className="pt-1 text-neutral pr-1">
            <MdFilterList />
          </span>{" "}
          filter{" "}
          <span className="pt-1 text-lg text-neutral ps-1">
            <MdArrowDropDown />
          </span>
        </span>
      </div> */}
    </div>
  );
};

export default Navbar;
