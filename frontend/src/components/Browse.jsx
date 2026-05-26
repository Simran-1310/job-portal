import React, { useEffect } from 'react'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { setSearchedQuery } from '../../redux/jobSlice'
// const randomJobs=[1,2,3,4,5]

const Browse = () => {
  useGetAllJobs();
    const allJobs = useSelector(store => store.jobs?.allJobs) || [];
    const dispatch=useDispatch();
    useEffect(()=>{
      return()=>(
        dispatch(setSearchedQuery(""))
      )
    },[])
  return (
    <>
    <div className='max-w-6xl mx-auto my-10 px-4'>
        <h1 className='font-bold text-lg sm:text-xl my-6 sm:my-10'>Search Result ({allJobs.length})</h1> 
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {
         allJobs.map((job)=>{
          return(
            <Job key={job._id} job={job}/>
          )
         })
        }
        </div>
    </div>
    </>
)
}

export default Browse