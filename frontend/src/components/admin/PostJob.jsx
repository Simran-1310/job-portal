
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button'
import { Label } from '../../components/ui/label'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import useGetAllCompanies from '../../hooks/useGetAllCompanies';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';


const PostJob = () => {
   useGetAllCompanies();
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  })
  const navigate= useNavigate();
  const [loading,setLoading]= useState(false);
  const {companies} = useSelector(store=> store.company)
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const selectChangeHandler = (value) => {
  if (!value) return;
  setInput({ ...input, companyId: value });
};

  const submitHandler = async(e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const res= await axios.post(`${JOB_API_END_POINT}/post`,input,{
        headers:{
          "Content-Type":"application/json",
        },
        withCredentials:true
      })
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/jobs")
      }
    }catch(error){
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
      
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <>
      <div className='flex items-center justify-center w-screen my-5'>
        <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md overflow-visible'>
          <div className='grid grid-cols-2 gap-2'>

            <div>
              <Label>Title</Label>
              <input type='text' name='title' value={input.title}
                onChange={changeEventHandler}
                className="w-full border border-gray-300 rounded px-3 py-2 my-1 focus:outline-none" />
            </div>
            <div>
              <Label>Description</Label>
              <input type='text' name='description' value={input.description}
                onChange={changeEventHandler}
                className="w-full border border-gray-300 rounded px-3 py-2 my-1 focus:outline-none" />
            </div>
            <div>
              <Label>Requirements</Label>
              <input type='text' name='requirements' value={input.requirements}
                onChange={changeEventHandler}
                className="w-full border border-gray-300 rounded px-3 py-2 my-1 focus:outline-none" />
            </div>
            <div>
              <Label>Salary</Label>
              <input type='text' name='salary' value={input.salary}
                onChange={changeEventHandler}
                className="w-full border border-gray-300 rounded px-3 py-2 my-1 focus:outline-none" />
            </div>
            <div>
              <Label>Location</Label>
              <input type='text' name='location' value={input.location}
                onChange={changeEventHandler}
                className="w-full border border-gray-300 rounded px-3 py-2 my-1 focus:outline-none" />
            </div>
            <div>
              <Label>Job Type</Label>
              <input type='text' name='jobType' value={input.jobType}
                onChange={changeEventHandler}
                className="w-full border border-gray-300 rounded px-3 py-2 my-1 focus:outline-none" />
            </div>
            <div>
              <Label>Experience Level</Label>
              <input type='text' name='experience' value={input.experience}
                onChange={changeEventHandler}
                className="w-full border border-gray-300 rounded px-3 py-2 my-1 focus:outline-none" />
            </div>
            <div>
              <Label>No of Positions</Label>
              <input type='number' name='position' value={input.position}
                onChange={changeEventHandler}
                className="w-full border border-gray-300 rounded px-3 py-2 my-1 focus:outline-none" />
            </div>

          {
            (
              <Select onValueChange={selectChangeHandler} value={input.companyId || ""}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder="Select a Company"/>
              </SelectTrigger>
              <SelectContent className="w-[180px] z-50 bg-white">
                <SelectGroup>
                  {
                    companies.map((company)=>{
                      return(
                        <SelectItem key={company._id} value={company._id}>{company.name}</SelectItem>
                      )
                    })
                  }
                </SelectGroup>
              </SelectContent>
              </Select>
            )
          }
          </div>
          
          {
            loading? <Button className='text-white bg-black w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin'/>Please wait</Button>:<Button type='submit' className='text-white bg-black w-full mt-4'>Post New Job</Button>
          }
          {
            companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>please register a company, before posting a job</p>
          }
        </form>
      </div>
    </>
  )
}

export default PostJob