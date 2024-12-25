import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../Api/axiosInstance";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";
const Login = ({ setUserRole }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //  assign navigation variable
  const navigate = useNavigate();

  // axios.defaults.withCredentials = true;

  const LoginHand = async (e) => {
    e.preventDefault();
    try {
      console.log({ email, password });
      const res = await axiosInstance.post("/api/login", {
        email,
        password,
      });
      // .then(res=>{setmsg(res.data.message)
      console.log(res);
      const { token, username } = res.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      console.log(token);
      const decoded = jwtDecode(token);
      console.log(decoded);
      const { role } = decoded;
      setUserRole(role);
      if (role === "admin") {
        toast.success("Login Successful as Admin!");

        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
      if (role === "student") {
        toast.success("Login Successful as Student!");
        setTimeout(() => {
          navigate("/student");
        }, 1000);
      }
    } catch (err) {
      toast.error("Server error, please try again.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen ">
      {/*  main division section start   */}
      <div className=" rounded-2xl shadow-2xl flex w-2/3 ">
        {/*  Login Account  */}
        <div className="w-3/5 ">
          <span className="text-left font-bold">
            Study<span className="text-green-600">Pay</span>
          </span>
          <div className="py-10">
            <h2 className="text-3xl font-bold text-center  ">
              Sign in Account
            </h2>
            <span className="border-2 border-white  inline-block w-10 ml-[15rem] "></span>
            <div>
              <form className="mt-5 flex flex-col gap-4 items-center">
                <div className="p-2 w-64 flex items-center bg-gray-200 gap-1">
                  <AiOutlineMail />

                  <input
                    type="email"
                    className="bg-gray-200 outline-none text-sm"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    autoComplete="off"
                  ></input>
                </div>

                <div className="p-2 w-64 flex items-center bg-gray-200 gap-1">
                  <GrSecure />
                  <input
                    type="password"
                    className="bg-gray-200 outline-none text-sm"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  ></input>
                </div>
                <div className="  ml-4 cursor-pointer text-white hover:bg-green-700 bg-green-500 rounded-full px-12 py-2">
                  <input
                    type="submit"
                    value="Login"
                    onClick={LoginHand}
                    className="cursor-pointer"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/*  register Design code  */}
        <div className="w-2/5 bg-green-600 rounded-br-2xl rounded-tr-2xl py-36 px-12">
          <h2 className="text-3xl font-bold mb-2">Hello, Friends</h2>
          <span className="border-2 border-white  w-[13rem] block mb-2"></span>
          <p className="mb-2 text-white">
            Fill Personal information and start journey.
          </p>
          <NavLink
            to="/signup"
            className="border-2 ml-4 text-white hover:bg-green-700 border-white rounded-full px-12 py-2"
          >
            <button>Sign Up</button>
          </NavLink>
          {/* <ToastContainer /> */}
          <Toaster />
        </div>
      </div>
    </section>
  );
};

export default Login;
