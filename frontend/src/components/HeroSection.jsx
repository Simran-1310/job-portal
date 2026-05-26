import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../../redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const searchJobHandler=()=>{
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }

  return (
    <>
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <h1 className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-red-500 font-medium'>No.1 Job Hunt Website</h1>
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900'>
      Discover, Apply & <br />
      Achieve Your <span className='text-purple-600'>Career Goals</span>
    </h1>
         <p className='text-gray-500'>
            Discover opportunities that match your skills and passion.
          </p>
        <div className='flex w-full sm:w-[70%] md:w-[60%] lg:w-[50%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input type='text' placeholder='find your dream jobs' onChange={(e)=>setQuery(e.target.value)} className='outline-none border-none w-full'/>
          <Button onClick={searchJobHandler} className='rounded-r-full bg-purple-600'>
            <Search className='h-5 w-5'/>
          </Button>
        </div>
      </div>
    </div>
    </>
  )
}

export default HeroSection