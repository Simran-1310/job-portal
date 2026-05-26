
import React, { useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { USER_API_END_POINT } from "../../utils/constant";
function Login() {
  const navigate = useNavigate();
 const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 const { user } = useSelector((store) => store.auth);
 async function onSubmit(data) {
  try {
    const res = await axios.post(
      `${USER_API_END_POINT}/login`,
      data,
      { withCredentials: true }
    );

    if (res.data.success) {

      dispatch(setUser(res.data.user)); // redux mein user save
      toast.success("Login successful!", { onClose: () => navigate("/"),});
    }

  } catch (err) {
    toast.error (err.response?.data?.message || "Login Failed!") ;
  }
}
useEffect(()=>{
  if(user){
    navigate("/")
  }
},[user, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-[400px]">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", { required: "Password is required" })}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Select Role</label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="jobseeker"
                  {...register("role", { required: "Role is required" })}
                />
                Jobseeker
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="employer"
                  {...register("role")}
                />
                Employer
              </label>
            </div>

            {errors.role && (
              <span className="text-red-500 text-sm">
                {errors.role.message}
              </span>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
          <span className="text-sm">
            Don't have an account ?{" "}
            <Link to="/signup" className="text-blue-600">
              SignUp
            </Link>
          </span>

        </form>
      </div>
      
    </div>
  );
}

export default Login;