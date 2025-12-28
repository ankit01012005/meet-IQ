import { chatClient, streamClient } from "../config/stream.js"
import  Session  from "../models/Session.js"

export async function createSession(req,res){
    try{
        const {problem , difficulty} = req.body
        const userId = req.user._id
        const clerkId = req.user.clerkId

        if(!problem || !difficulty){
            return res.status(400).json({message:"problem or difficulty is missing"})
        }

        //generate a unique call id for stream video
        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`

        //create session in DB
        const session = await Session.create({problem,difficulty,host:userId,callId})

        //create stream video call
        await streamClient.video.call("default",callId).getOrCreate({
            data:{
                created_by_id:clerkId,
                custom:{problem,difficulty,sessionId:session._id.toString()},
            },
        })

        //chat messaging

        const channel = chatClient.channel("messaging",callId,{
            name:`${problem} Session`,
            created_by_id:clerkId,
            members:[clerkId]
        })
        return res.status(200).json({session:session})

    }catch(error){
        console.log("Error in creating the session")
        return res.status(500).json({
            success:false,
            message:"Internal Server Failure"
        })
    }
}

export async function getActiveSession(_,res){
    try{
        const session = await Session.find({status:"active"})
            .populate("host","name profileImage , email , clerkId")
            .sort({createdAt:-1})
            .limit(20)

            res.status(200).json({session});

    }catch(error){
        console.log("Error in getActivesessions controllers :",error.message)
        res.status(500).json({
            message:"Internal server Error"
        })
    }
}

export async function getRecentSession(req,res){
    try{
        const userId = req.user._id;

        //get sessions where user is either host or participants
        const sessions = await Session.find({
            status:"completed",
            $or:[{host:userId},{participant:userId}]
        })
            .sort({createdAt:-1})
            .limit(20)
        res.status(200).json({sessions})
    }catch(error){
        console.log("Error in getMyRecentSessions controller",error.message)
        res.status(500).json({message:"Internal Server Error"})

    }
}

export async function getSessionbyId(req , res){
    try{
        const {id} = req.params
        const session = await Session.findById(id)
            .populate("host","name email profileImage clerkId")
            .populate("participant","name email profileImage clerkId")

        if(!session) return res.status(404).json({
            message:"session not found"
        })
        res.status(200).json({
            session
        })


    }catch(error){
        console.log("Error in getSessionId controller",error.message)
        res.status(500).json({message:"Internal Server Error"})

    }
}
export async function joinSession(req , res){
    try{
        const {id} = req.params
        const userId = req.user._id
        const clerkId = req.user.clerkId

        const session = await Session.findById(id)

        if(!session) return res.status(404).json({message:"session not found"})

        //cheack if session is already full -has a participant 
        if(session.participant) return res.status(409).json({message:"Session is full"})
        
        const channel = chatClient.channel("messaging",session.callId)
        await channel.addMembers([clerkId])
        
        session.participant = userId
        await session.save()

        res.status(200).json({session})

    }catch(error){
        console.log("Error in joinSession controlller",error.message)
        res.status(500).json({message:"Inter Server Failure"})
    }
}

export async function endSession(req , res){
    try{
        const {id} = req.params
        const userId = req.user._id

        const session = await Session.findById(id)

        if(!session) return res.status(404).json({message:"Session not found"})
        
        //check if user is the host
        if(session.host.toString() != userId.toString()){
            return res.status(403).json({message:"Only the host can end the session"})
        }
        if(session.status === "completed"){
            return res.status(409).json({message:"The session has been terminated already"})
        }
    
        //delete stream video call
        const call = streamClient.video.call("default",session.callId)
        await call.delete({hard:true})

        //delete stream chat channel
        const channel = chatClient.channel("messaging",session.callId)
        await channel.delete()

        session.status = "completed"
        await session.save()

        res.status(200).json({message:"Session Completed"})

    }catch(error){
        console.log("Error in endingSession controlller",error.message)
        res.status(500).json({message:"Inter Server Failure"})

    }
}