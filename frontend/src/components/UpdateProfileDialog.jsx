import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../../redux/authSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.bio,
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || "",
    });
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
        finally {
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }

    return (
        <>
            <div>
                <Dialog open={open}>
                    <DialogContent className='w-[95vw] sm:max-w-[425px] bg-white rounded-lg shadow-xl border' onInteractOutside={() => setOpen(false)}>
                        <DialogHeader>
                            <DialogTitle>Update Profile</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={submitHandler}>
                            <div className='grid gap-4 py-4'>
                                <div className='grid sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                    <Label htmlFor='name' className='text-right'>Name</Label>
                                    <input id="name" name="fullName" value={input.fullName} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500' />
                                </div>
                                <div className='grid sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                    <Label htmlFor='email' className='text-right'>Email</Label>
                                    <input id="email" name="email" value={input.email} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500' />
                                </div>
                                <div className='grid sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                    <Label htmlFor='phoneNumber' className='text-right'>Number</Label>
                                    <input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500' />
                                </div>
                                <div className='grid sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                    <Label htmlFor='bio' className='text-right'>Bio</Label>
                                    <input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500' />
                                </div>
                                <div className='grid sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                    <Label htmlFor='skills' className='text-right'>Skills</Label>
                                    <input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500' />
                                </div>
                                <div className='grid sm:grid-cols-4 items-start sm:items-center gap-2 sm:gap-4'>
                                    <Label htmlFor='file' className='text-right'>Resume</Label>
                                    <input type='file' id="file" name="file" onChange={fileChangeHandler} className='col-span-3 border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500' />
                                </div>
                            </div>
                            <DialogFooter>
                                {
                                    loading ? <Button className='w-full my-4 bg-black text-white'>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Please Wait
                                    </Button> : <Button className='bg-black text-white' type='submit'>Update</Button>
                                }
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default UpdateProfileDialog