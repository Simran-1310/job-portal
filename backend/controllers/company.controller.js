const Company = require("../models/company.model");
const cloudinary = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");

const registerCompany = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({
                message: "Company name required",
                success: false
            });
        }
        let company = await Company.findOne({ name: name });

        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            });
        }
        company = await Company.create({
            name: name
        });

        return res.status(200).json({
            message: "company registered successfully",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


const getCompany = async (req, res) => {
    try {
        const companies = await Company.find({});
        if (!companies) {
            return res.status(404).json({
                message: "companies not found",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "company not found",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};


const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        let cloudResponse;

        // Upload logo
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        const updateData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(website && { website }),
            ...(location && { location }),
            ...(cloudResponse && { logo: cloudResponse.secure_url })
        };

        const company = await Company.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Information updated successfully",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
    }
};

module.exports = { registerCompany, getCompany, getCompanyById, updateCompany }