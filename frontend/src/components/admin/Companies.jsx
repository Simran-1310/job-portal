import { Button } from '../ui/button'
import React, { useEffect, useState } from 'react'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '../../hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../../../redux/companySlice'

const Companies = () => {
  useGetAllCompanies();
  const[input,setInput]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])
  return (
    <>
      <div className='max-w-6xl mx-auto my-10'>
        
        <div className='flex items-center justify-between'>
          <input className='w-fit border p-2 rounded' placeholder='Filter by name' onChange={(e)=>setInput(e.target.value)}/>
          <Button onClick={()=>navigate("/admin/companies/create")} className='bg-black text-white'>New Company</Button>
        </div>

        <CompaniesTable/>

      </div>
    </>
  )
}

export default Companies