import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import { BiFemale } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import "./Styles/signup.scss";
import axiosInstance from "../Api/axiosInstance";

const Signup = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleinpouts = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log([name],value)
    setuser({ ...user, [name]: value });
  };

  const NewUser = async (e) => {
    try {
      e.preventDefault();

      const { name, email, password, role } = user;
      if (!name && !email && !password && !role) {
        toast.error("Please Fill All Field", {
          position: "top-center",
        });
      } else {
        const response = await axiosInstance.post("/api/signup", user);

        const userlist = response.config.data;
        console.log(userlist);
        if (response.status === 201) {
          {
            toast.success("Registration Successsful !", {
              position: "top-center",
            });
          }
        }
      }
    } catch (err) {
      toast.error("Server error, please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-center w-full min-h-screen ">
        {/*  main div section  */}
        <div className=" rounded-2xl shadow-2xl flex w-2/3 ">
          {/*  Login Account  */}
          <div className="w-3/5 ">
            <span className="text-left font-bold">
              Study<span className="text-green-600">Pay</span>
            </span>
            <div className="py-10">
              <h2 className="text-3xl font-bold text-center  ">
                Register Account
              </h2>
              <span className="border-2 border-white  inline-block w-10 ml-[15rem] "></span>
              <div>
                <form className="mt-5 flex flex-col gap-4 items-center">
                  {/*  username  */}
                  <div className="p-2 w-64 flex items-center bg-gray-200 gap-1">
                    <BiFemale />
                    <input
                      type="text"
                      placeholder="username"
                      name="name"
                      autoComplete="off"
                      className="bg-gray-200 outline-none text-sm"
                      value={user.name}
                      onChange={handleinpouts}
                    ></input>
                  </div>
                  <div className="p-2 w-64 flex items-center bg-gray-200 gap-3">
                    <select
                      name="role"
                      onChange={handleinpouts}
                      value={user.role}
                      className="bg-gray-200 outline-none text-sm w-64 cursor-pointer"
                    >
                      <option value="student">student</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>
                  {/* email input filed   */}

                  <div className="p-2 w-64 flex items-center bg-gray-200 gap-1">
                    <AiOutlineMail />

                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      className="bg-gray-200 outline-none text-sm"
                      value={user.email}
                      onChange={handleinpouts}
                      autoComplete="off"
                    ></input>
                  </div>

                  {/* password  */}

                  <div className="p-2 w-64 flex items-center bg-gray-200 gap-1">
                    <GrSecure />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="bg-gray-200 outline-none text-sm"
                      value={user.password}
                      onChange={handleinpouts}
                    ></input>
                  </div>
                  <div className=" ml-4 cursor-pointer text-white bg-green-500 rounded-full px-12 py-2">
                    <input
                      type="submit"
                      className="cursor-pointer"
                      value="Register"
                      onClick={NewUser}
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/*  register Design code  */}
          <div className="w-2/5 bg-green-600 rounded-br-2xl rounded-tr-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Digital, Service</h2>
            <span className="border-2 border-white  w-[13rem] block mb-2"></span>
            <p className="mb-2 text-white">Fill Basic information</p>
            <NavLink
              to="/login"
              className="border-2 ml-4 text-white border-white rounded-full px-12 py-2"
            >
              <button>Sign In</button>
            </NavLink>
            <ToastContainer />
          </div>
        </div>
      </section>

      {/* <ToastContainer /> */}
    </>
  );
};

export default Signup;
