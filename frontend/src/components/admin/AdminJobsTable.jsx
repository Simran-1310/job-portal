
import { Avatar, AvatarImage } from '../ui/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import React, { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import store from '../../../redux/store'
import { setAllAdminJobs } from '../../../redux/jobSlice'


const AdminJobsTable = () => {
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);
    const { allAdminJobs, searchJobByText } = useSelector(store => store.jobs);
    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        if (allAdminJobs) {
            const filteredJobs = allAdminJobs.filter((job) => {
                if (!searchJobByText) return true;

                return (
                    job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                    job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
                );
            });
            setFilterJobs(filteredJobs);
        }

    }, [allAdminJobs, searchJobByText])
    return (
        <>
            <div>
                <Table>
                    <TableCaption>A list of Your recent posted jobs </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {companies.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    You have not registered any company yet
                                </TableCell>
                            </TableRow>
                        ) : filterJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No jobs found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterJobs.map((job) => (
                                <TableRow key={job._id}>
                                    <TableCell>{job?.company?.name}</TableCell>
                                    <TableCell>{job?.title}</TableCell>
                                    <TableCell>
                                        {job?.createdAt ? job.createdAt.split("T")[0] : "-"}
                                    </TableCell>
                                    <TableCell>
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div
                                                    onClick={() => navigate(`/admin/jobs/${job._id}`)}
                                                    className="flex items-center gap-2 cursor-pointer"
                                                >
                                                    <Edit2 className="w-4" />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                    <Eye className='w-4'/>
                                                    <span>Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

export default AdminJobsTable;