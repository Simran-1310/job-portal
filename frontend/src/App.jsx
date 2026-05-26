import React from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";


const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

const approuter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/jobs",
        element: <Jobs/>
      },
      {
        path:"/description/:id",
        element:<JobDescription/>
      },
      {
        path: "/browse",
        element: <Browse/>
      },
      {
        path: "/profile",
        element: <Profile/>
      },
     // for Admin
     {
        path: "/admin/companies",
        element: <ProtectedRoute><Companies/></ProtectedRoute> 
      },
      {
        path: "/admin/companies/create",
        element: <ProtectedRoute> <CompanyCreate/></ProtectedRoute> 
      },
      {
        path: "/admin/companies/:id",
        element: <ProtectedRoute><CompanySetup/></ProtectedRoute>  
      },
      {
        path: "/admin/jobs",
        element: <ProtectedRoute><AdminJobs/></ProtectedRoute>  
      },
      {
        path: "/admin/jobs/create",
        element: <ProtectedRoute><PostJob/></ProtectedRoute> 
      },
      {
        path: "/admin/jobs/:id/applicants",
        element:<ProtectedRoute><Applicants/></ProtectedRoute>
      },
      
      
    ]
  }
]);

let App = () => {
  return <RouterProvider router={approuter} />;
};

export default App;