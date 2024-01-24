import React from "react";
import { Users } from "../../data";
import { FaEye } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Admin = () => {
  return (
    <div className="px-5">
      <h2 className="text-2xl font-semibold py-3">Admin</h2>
      {Users.map((user) => (
        <div>
          <div key={user.name} className="my-4 flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={user.image}
                alt={user.name}
                className="h-[50px] w-[50px] object-cover rounded-full"
              />
              <div className="ps-2">
                <span className="text-sm font-bold">{user.name}</span>
                <br />
                <span className="text-sm text-slate">{user.location}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <span className="text-purple cursor-pointer">
                <FaEye />
              </span>
              <span>
                <BsThreeDotsVertical />
              </span>
            </div>
          </div>
          <hr className="bg-slate" />
        </div>
      ))}
      <div className="p-5 text-center flex justify-center">
        <button className="text-purple font-bold text-lg text-center flex justify-center items-center">
          View All{" "}
          <span className="ms-2">
            <MdOutlineKeyboardDoubleArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Admin;
