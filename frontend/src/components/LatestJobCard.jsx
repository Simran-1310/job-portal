import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'


const LatestJobCard = ({job}) => {
    const navigate=useNavigate();
    
  return (
    <>
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer flex flex-col justify-between h-full'>
        <div> 
            <h1 className='font-medium text-base sm:text-lg '>{job?.company?.name}</h1>
            <p className='text-sm text-gray-500'>India</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2 line-clamp-1'>{job?.title}</h1>
            <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
        </div>
        <div className='flex flex-wrap items-center gap-2 mt-5'>
            <Badge className={'text-blue-700 font-bold'}>{job?.position} Positions</Badge>
            <Badge className={'text-red-700 font-bold'}>{job?.jobType}</Badge>
            <Badge className={'text-purple-700 font-bold'}>{job?.salary}LPA</Badge>
        </div>

    </div>
    </>
  )
}

export default LatestJobCard