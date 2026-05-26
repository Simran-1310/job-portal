
import React, { useEffect } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSingleJob } from '../../redux/jobSlice'
import { toast } from 'react-toastify'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant'

const JobDescription = () => {

    const { singleJob } = useSelector(store => store.jobs)
    const { user } = useSelector(store => store.auth)

    const params = useParams()
    const jobId = params.id

    const dispatch = useDispatch()

    const isApplied =
        singleJob?.applications?.some((application) => {
            const applicantId =
                application?.applicant?._id || application?.applicant

            return applicantId?.toString() === user?._id?.toString()
        }) || false

    const applyJobHandler = async () => {
        try {

            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                {},
                { withCredentials: true }
            )

            if (res.data.success) {

                const updatedSingleJob = {
                    ...singleJob,
                    applications: [
                        ...singleJob.applications,
                        { applicant: user?._id }
                    ]
                }

                dispatch(setSingleJob(updatedSingleJob))

                toast.success(res.data.message)
            }

        } catch (error) {
            toast.error(error.response?.data?.message)
        }
    }

    useEffect(() => {

        const fetchSingleJob = async () => {

            try {

                const res = await axios.get(
                    `${JOB_API_END_POINT}/get/${jobId}`,
                    { withCredentials: true }
                )

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                }

            } catch (error) {
                console.log(error)
            }

        }

        fetchSingleJob()

    }, [jobId, dispatch])

    return (
        <div className='max-w-5xl mx-auto my-10 sm:px-6 lg:px-8 my-6 sm:my-10'>

            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5'>

                <div>

                    <h1 className='font-bold text-xl sm:text-2xl break-words'>
                        {singleJob?.title}
                    </h1>

                    <div className='flex flex-wrap gap-2 mt-2'>

                        <Badge className='text-blue-700 font-bold'>
                            {singleJob?.position} positions
                        </Badge>

                        <Badge className='text-red-600 font-bold'>
                            {singleJob?.jobType}
                        </Badge>

                        <Badge className='text-indigo-600 font-bold'>
                            {singleJob?.salary} LPA
                        </Badge>

                    </div>

                </div>

                 <div className='w-full sm:w-auto'>
                    <Button
                        onClick={!isApplied ? applyJobHandler : null}
                        disabled={isApplied}
                        className={`w-full sm:w-auto rounded-lg px-6 py-2 ${
                            isApplied
                                ? "bg-gray-600 cursor-not-allowed"
                                : "bg-indigo-700 hover:bg-indigo-800 text-white"
                        }`}
                    >
                        {isApplied ? "Already Applied" : "Apply Now"}
                    </Button>
                </div>

            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium py-4 mt-6 text-lg sm:text-xl'>
                Job Description
            </h1>

            <div>

                <h1 className='font-bold my-1'>
                    Role:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.title}
                    </span>
                </h1>

                <h1 className='font-bold my-1'>
                    Location:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.location}
                    </span>
                </h1>

                <h1 className='font-bold my-1'>
                    Description:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.description}
                    </span>
                </h1>

                <h1 className='font-bold my-1'>
                    Experience:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.experienceLevel} yrs
                    </span>
                </h1>

                <h1 className='font-bold my-1'>
                    Salary:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.salary} LPA
                    </span>
                </h1>

                <h1 className='font-bold my-1'>
                    Total Applicants:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.applications?.length}
                    </span>
                </h1>

                <h1 className='font-bold my-1'>
                    Posted Date:
                    <span className='pl-4 font-normal text-gray-800'>
                        {singleJob?.createdAt?.split("T")[0]}
                    </span>
                </h1>

            </div>

        </div>
    )
}

export default JobDescription

