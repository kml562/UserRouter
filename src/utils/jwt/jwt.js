import  Jwt  from "jsonwebtoken";

export const jwttoken=(id, email)=>
{
  try{
    const { JWT_SECRET, JWT_EXPIRY } = process.env;
    const token = Jwt.sign(
        { userId:id.toString(), emailId:email },
        JWT_SECRET,
        { expiresIn:  JWT_EXPIRY}
      );
     
      return token
  }
  catch(error)
    {
        
       return res.status(500).send({status:false,message:error.message})
    }

}


