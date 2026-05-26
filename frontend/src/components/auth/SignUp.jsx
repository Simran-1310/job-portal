
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";

function SignUp() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const { user } = useSelector((store) => store.auth);
  async function onSubmit(data) {
    try {

      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("role", data.role);
      formData.append("profile", data.profile[0]);

      const res = await axios.post(
        `${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      toast.success("Account created  successfully!", { onClose: () => navigate("/login"),});
    } catch (err) {
      console.log(err.response?.data?.message);
      toast.error (err.response?.data?.message || "Registration Failed!") ;
    }
  }
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[user, navigate])

  return (
    <div className="flex items-center justify-center max-w-7xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 w-[400px]">

        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Full Name */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("fullName", { required: "Full name is required" })}
              className="border border-gray-300 rounded-md p-2"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
              className="border border-gray-300 rounded-md p-2"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              })}
              className="border border-gray-300 rounded-md p-2"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum length is 6" },
              })}
              className="border border-gray-300 rounded-md p-2"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col mb-4">
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

          {/* Profile Image */}
          <div className="flex flex-col mb-4">
            <label className="mb-1 font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("profile")}
              className="cursor-pointer border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Sign Up
          </button>

          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </span>

        </form>
      </div>
    
    </div>
  );
}

export default SignUp;