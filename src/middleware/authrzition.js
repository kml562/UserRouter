import jwt from 'jsonwebtoken'




export const isLoggedIn = async(req,res,next)=>{
    try {
        const token = req.headers["x-api-key"];

        if(!token) return res.status(404).json({status : false, messsage : "No Token Found"})

        jwt.verify(token, process.env.JWT_SECRET, async(err, decodedToken) => {
            if (err) {
                return res.status(401).json({
                    msg: err.message
                })
            } else {
                const user = await userModel.findById(decodedToken.id)
                if(!user) res.status(401).json({status : false, message : "Please Logged In First."})
                req.decodedToken = decodedToken
                console.log(decodedToken)
                next()
            }
        });
    } catch (error) {
        res.status(500).json({status : false, message : error.message})
    }
}



export const auth = async (req, res, next) => {
    try {
        // const token = req.headers["x-api-key"];
        // console.log(token)
        // if(!token) return res.status(404).json({status : false, messsage : "No Token Found"})

        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        

        if (req.decodedToken.id === req.params.userId) {
            console.log("kml")
            next()
        } else {
            res.status(403).json({ status: false, messsage: "You are not authorized to do this action." })
        }
        
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
};