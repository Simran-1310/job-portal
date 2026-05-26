const mongoose= require("mongoose");

const companySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    logo:{
    type:String
    }
},{timestamps:true});

const CompanyModel = mongoose.model("Company", companySchema);

module.exports = CompanyModel;


