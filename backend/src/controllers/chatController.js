import { chatClient } from "../config/stream.js";

export async function tokenGenerater (req, res){
    try{
        const token = await chatClient.createToken(req.user?.clerkId)
        return res.status(200).json({
            token:token,
            userId:req.user.clerkId,
            userName:req.user.name,
            userImage:req.user.profileImage
        })

    }catch(e){
        console.log("Token generation failed !")
        res.status(500).json({
            message:"Inter server error"
        })
    }
}