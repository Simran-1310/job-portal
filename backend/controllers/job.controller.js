const Job =require("../models/job.model")
const company = require("../models/company.model");
const mongoose = require("mongoose");
const postJob = async(req,res)=>{
    try{
        const{title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;
        if(!title || !description || !requirements || !salary || !location|| !jobType ||!experience || !position || !companyId){
            return res.status(400).json({
                message:"Something is miising",
                success:false,
            })
        };
        const userId = req.id;
        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId
            
        });
        return res.status(201).json({
                message:"New Job created successfully",
                job,
                success:true,
            })
    }
    catch(err){
        console.log(err);
    }
}


const getAllJobs= async(req,res)=>{
    try{
        const keyword =req.query.keyword || "";
        const query= {
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        };
        const jobs= await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
             return res.status(404).json({
                message:"Job not found",
                success:false
            })
        };
        return res.status(200).json({
                jobs,
                success:true,
            })

    }
    catch(error){
        console.log(error);
        
    }
}


const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate({
                path: "applications",
                populate: {
                    path: "applicant"
                }
            })
            .populate("company");

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (err) {
        console.log(err);
    }
};


const getAdminJobs= async(req,res)=>{
    try{
        const adminId= req.id;
        const jobs= await Job.find({created_by:adminId}).
        populate({
            path:"company",
            createdAt:-1
        })
        if(!jobs){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        };
        return res.status(200).json({
            jobs,
            success:true
        })
    }
    catch(err){
        console.log(err);
        
    }
}
module.exports={postJob, getAllJobs, getJobById, getAdminJobs}