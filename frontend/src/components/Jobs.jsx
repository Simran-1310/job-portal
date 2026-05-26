import React, { useEffect, useState } from 'react'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import useGetAllJobs from '../hooks/useGetAllJobs'
const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8]

const Jobs = () => {
    console.log(" Jobs component render ho raha hai");
    const { allJobs, searchedQuery } = useSelector(store => store.jobs);
    const [filterJobs,setFilterJobs]= useState(allJobs);
     useEffect(()=>{
        if(searchedQuery){
            const filteredJobs= allJobs.filter((job)=>{
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||  job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||  job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        }
        else{
            setFilterJobs(allJobs);
        }
     },[allJobs,searchedQuery])
    useGetAllJobs();
    return (
        <>
            <div className='max-w-6xl mx-auto mt-5  px-4'>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='w-full lg:w-[22%]'>
                        <FilterCard />
                    </div>

  <div className='flex-1'>
                    {
                        allJobs === null ? (
                            <span>Loading jobs...</span>
                        ) : filterJobs.length === 0 ? (
                            <span>Job Not Found</span>
                        ) : (
                            <div className='h-auto lg:h-[88vh] overflow-y-visible lg:overflow-y-auto pb-5'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                                    {filterJobs.map((job) => (
                                        <div key={job?._id}>
                                            <Job job={job} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Jobs