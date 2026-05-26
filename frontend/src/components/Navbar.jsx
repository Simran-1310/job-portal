import React, { useState } from "react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { LogOut, Menu, User2, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { toast } from "react-toastify";
import { setUser } from "../../redux/authSlice";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";

const Navbar = () => {
    // const [user, setUser] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`, {}, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/");
                toast.success(res.data.message)
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="bg-white/70 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">

                <div>
                    <h1 className="text-3xl font-bold">
                        Job<span className="text-red-600">Portal</span>
                    </h1>
                </div>

                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setOpen(!open)}
                    >
                        {
                            open ? <X size={24} /> : <Menu size={24} />
                        }
                    </Button>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role === "employer" ? (
                                <>
                                    <Link to="/admin/companies">Companies</Link>
                                    <Link to="/admin/jobs">Jobs</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/">Home</Link>
                                    <Link to="/jobs">Jobs</Link>
                                    <Link to="/browse">Browse</Link>
                                </>
                            )
                        }

                    </ul>

                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login">
                                    <Button variant="outline">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-purple-600 text-white hover:bg-purple-700">
                                        SignUp
                                    </Button>
                                </Link>
                            </div>
                        ) : (

                            <Popover>
                                <PopoverTrigger className="cursor-pointer">
                                    <Avatar>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto || "/default_image.png"}
                                            alt="profile"
                                        />
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-fit p-4">
                                    <div className="flex gap-2 space-y-2">
                                        <Avatar>
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto || "/default_image.png"}
                                                alt="profile"
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium">{user?.fullName}</h4>
                                            <p className="text-sm foreground">{user?.profile?.bio || "No bio added"}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-gray-600">
                                        {
                                            user && user.role === "jobseeker" && (
                                                <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                    <User2 />
                                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }

                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>

                        )
                    }
                </div>
            </div>
            {
    open && (
        <div className="md:hidden bg-white border-t shadow-md px-4 py-5 space-y-4">
            <div className="flex flex-col gap-4 font-medium">

                {
                    user && user.role === "employer" ? (
                        <>
                            <Link
                                to="/admin/companies"
                                onClick={() => setOpen(false)}
                            >
                                Companies
                            </Link>

                            <Link
                                to="/admin/jobs"
                                onClick={() => setOpen(false)}
                            >
                                Jobs
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/"
                                onClick={() => setOpen(false)}
                            >
                                Home
                            </Link>

                            <Link
                                to="/jobs"
                                onClick={() => setOpen(false)}
                            >
                                Jobs
                            </Link>

                            <Link
                                to="/browse"
                                onClick={() => setOpen(false)}
                            >
                                Browse
                            </Link>
                        </>
                    )
                }

                {
                    !user ? (
                        <div className="flex flex-col gap-3 pt-3">

                            <Link to="/login">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                >
                                    Login
                                </Button>
                            </Link>

                            <Link to="/signup">
                                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                    SignUp
                                </Button>
                            </Link>

                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 pt-3">

                            {
                                user.role === "jobseeker" && (
                                    <Link to="/profile">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                        >
                                            View Profile
                                        </Button>
                                    </Link>
                                )
                            }

                            <Button
                                onClick={logoutHandler}
                                className="w-full"
                            >
                                Logout
                            </Button>

                        </div>
                    )
                }

            </div>
        </div>
    )
}
        </div>
        
    );
};

export default Navbar;