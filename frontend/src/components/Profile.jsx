import { Avatar, AvatarImage } from "./ui/avatar";
import React, { useState } from 'react'
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

// const skills = ["HTML", "CSS", "JAVASCRIPT", "REACT.JS"];

const Profile = () => {

    useGetAppliedJobs()
    const { user } = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    const isResume = user?.profile?.resume;

    return (
        <>
            <div>
                <div className="max-w-5xl mx-auto bg-white border border-gray-500 rounded-2xl my-5 p-8">
                    <div className="flex justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src='https://d1csarkz8obe9u.cloudfront.net/posterpreviews/corporate-company-logo-design-template-2402e0689677112e3b2b6e0f399d7dc3_screen.jpg?ts=1561532453' />
                            </Avatar>
                            <div>
                                <h1 className="font-medium text-xl">{user?.fullName}</h1>
                                <p>{user?.profile?.bio}</p>
                            </div>
                            <Button onClick={() => setOpen(true)} variant="outline"><Pen /></Button>
                        </div>
                    </div>
                    <div className="my-5">
                        <div className="flex items-center gap-3 my-2">
                            <Mail />
                            <span>{user?.email}</span>
                        </div>
                        <div className="flex items-center gap-3 my-2">
                            <Contact />
                            <span>{user?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className="my-5">
                        <h1>Skills</h1>
                        <div className="flex items-center gap-1">
                            {
                                user?.profile?.skills?.length > 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>N/A</span>
                            }
                        </div>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label className="text-md font-bold">Resume</Label>
                        {
                            user?.profile?.resume ? (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={user?.profile?.resume}
                                    className="text-blue-500 hover:underline cursor-pointer"
                                >
                                    {user?.profile?.resumeOriginalName}
                                </a>
                            ) : (
                                <span>N/A</span>
                            )
                        }
                    </div>
                </div>
                <div className="max-w-4xl mx-auto bg-white rounded-2xl">
                    <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
                    <AppliedJobTable />
                </div>
                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
        </>
    )
}

export default Profile