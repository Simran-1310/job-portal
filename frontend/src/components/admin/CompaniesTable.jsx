
import { Avatar, AvatarImage } from '../ui/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import React, { useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const CompaniesTable = () => {
    const navigate = useNavigate();
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])
    return (
        <>
            <div>
                <Table>
                    <TableCaption>A list of Your registered companies </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Logo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            companies.length <= 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        You have not registered any company yet
                                    </TableCell>
                                </TableRow>
                            ) : (


                                filterCompany.map((company) => (


                                    <TableRow key={company._id}>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage src={company.logo} />
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>{company.name}</TableCell>
                                        <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                        <TableCell>
                                            <Popover>
                                                <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                <PopoverContent className='w-32'>
                                                    <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                        <Edit2 className='w-4' />
                                                        <span>Edit</span>
                                                    </div>

                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                    </TableRow>

                                )
                                )


                            )


                        }

                    </TableBody>

                </Table>
            </div>
        </>
    )
}

export default CompaniesTable