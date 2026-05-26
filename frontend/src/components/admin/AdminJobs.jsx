import { Button } from '../../components/ui/button';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '../../../redux/jobSlice';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';


const AdminJobs = () => {
  useGetAllAdminJobs();
  useGetAllCompanies();
  const[input,setInput]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setSearchJobByText(input))
  },[input])
  return (
    <>
      <div className='max-w-6xl mx-auto my-10'>
        
        <div className='flex items-center justify-between'>
          <input className='w-fit border p-2 rounded' placeholder='Filter by name' onChange={(e)=>setInput(e.target.value)}/>
          <Button onClick={()=>navigate("/admin/jobs/create")} className='bg-black text-white'>New Jobs</Button>
        </div>

        <AdminJobsTable/>

      </div>
    </>
  )
}

export default AdminJobs