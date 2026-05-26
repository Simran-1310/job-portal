const jwt = require("jsonwebtoken");

const isAuthenticated= async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"user not authenticated",
                success:false
            })
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"invalid token",
                success:false
            })
        }
        req.id=decode.userId;
        next();

    }
    catch (err) {
    console.error(err);
    return res.status(401).json({
        message: err.message, 
        success: false
    });
}
}

module.exports= isAuthenticated;