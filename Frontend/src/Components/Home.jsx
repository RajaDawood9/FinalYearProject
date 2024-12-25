import React from "react";
import CountUp from "react-countup";
import { BiRightArrowCircle } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="flex w-[90%]   justify-between items-center ">
        <div className="w-1/2 flex flex-col justify-between p-4">
          <div>
            <h1 className="text-headingColor font-semibold text-[46px] ">
              Your Trusted Solution for Fast, Efficient Fee Management{" "}
            </h1>
            <p className="text-textColor">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
              eveniet eum amet quaerat quas nam dolor ab nostrum optio odit
              temporibus pariatur natus nesciunt quos, maxime quasi corporis
              distinctio repudiandae?
            </p>
            <div className="flex space-x-[6rem]">
              <div>
                <h1 className="text-blue-600">
                  <CountUp end={100} duration={5} delay={1} />%
                </h1>
                <span className="border-t-4 border-solid border-indigo-700 w-[6rem] h-2 block "></span>
                <p>Secure</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex gap-4  justify-end">
          <div className="py-4">
            <img
              className=" w-full"
              src="https://wpschoolpress.com/wp-content/uploads/2023/03/fee.png"
            ></img>
          </div>
          <div className="mt-10">
            <img
              className="py-5"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8Ee4MDdbAvi1xgrQWFV0-_EyxUoH9FsAxGg&s"
            ></img>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXN1I7AH32KGPqtw6yjdrbL_RjXRst4TTLaA&s"></img>
          </div>
        </div>
      </div>

      {/*  Three Card Show  summary as About Section  */}

      <div className="flex flex-col text-center">
        <div className="">
          <h1 className="text-headingColor font-semibold text-[46px]">
            Fee Management System
          </h1>
          <p>Fee Management, focusing on security and verifying from NCBA&E</p>
        </div>

        <div className="flex justify-center space-x-7 mb-2">
          <div className="shadow-lg pb-3 cursor-pointer border-b-4 border-solid border-blue-600  block">
            <img
              className="rounded-md w-[25rem] h-[20vh]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRydlc9gdCRFT9bU5oFec6I6kdRw1EvQpz6jg&s"
            ></img>
            <h2 className="text-[20px] font-bold mt-3 text-headingColor">
              Group ID : 105
            </h2>
            <div className="mt-5 space-4 flex flex-col items-center">
              {/* User 1 */}
              <div className="flex items-center space-x-3">
                <img
                  className="w-[2.5rem] h-[2.5rem] rounded-full border-2 border-blue-500"
                  src="https://randomuser.me/api/portraits/men/45.jpg"
                  alt="User 1"
                />
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">
                    Raja M. Dawood
                  </h3>
                  <p className="text-xs text-gray-500">Team Leader</p>
                </div>
              </div>

              {/* User 2 */}
              <div className="flex items-center space-x-3">
                <img
                  className="w-[2.5rem] h-[2.5rem] rounded-full border-2 border-green-500"
                  src="https://randomuser.me/api/portraits/men/94.jpg"
                  alt="User 2"
                />
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">
                    M. Mudassir Khan
                  </h3>
                  <p className="text-xs text-gray-500">Developer</p>
                </div>
              </div>
              {/* for user 2  */}
              <div className="flex items-center space-x-3">
                <img
                  className="w-[2.5rem] h-[2.5rem] rounded-full border-2 border-green-500"
                  src="https://randomuser.me/api/portraits/women/22.jpg"
                  alt="User 3"
                />
                <div>
                  <h3 className="font-semibold text-sm text-gray-800">
                    Mahnoor Rasheed
                  </h3>
                  <p className="text-xs text-gray-500">Developer</p>
                </div>
              </div>
            </div>
            {/* https://randomuser.me/api/portraits/men/94.jpg */}
            {/* <NavLink to="/" className=" ">
              <BiRightArrowCircle className="w-[44px] hover:text-purple-700 rounded h-[44px] mx-auto" />
            </NavLink> */}
          </div>
        </div>
      </div>
      {/* End Here About Section */}

      {/* ------------------------------------------------------------- */}
    </div>
  );
};

export default Home;
