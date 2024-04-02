const announcementModel = require("../models/announcementModel")

const createAnnouncement = async(req,res)=>{
    const {announcement}= req.body
    try {
        const newAnnouncement= announcementModel.create(
            {announcement: announcement}
        )
        return res.status(200).send({success: true, message: "announcement created successfully", newAnnouncement})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `createAnnouncement Controller Error: ${error.message}`,
        });      
    }
}

const fetchAnnouncements = async(req,res)=>{
    try {
        const announcements = await announcementModel.find()
        return res.status(200).send({success: true, message:"Announcements fetched successfully", announcements})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `fetchAnnouncement Controller Error: ${error.message}`,
        }); 
    }
}

const fetchSingleAnnouncement= async(req,res)=>{
    const {announcementId}= req.params
    try {
        const announcement= await announcementModel.findById({_id:announcementId})
        if (!announcement) {
            return res.status(200).send({message:"Announcement not found", success:false})
        }
        return res.status(200).send({success:true, message:"Announcement fetched", announcement})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `fetchSingleAnnouncement Controller Error: ${error.message}`,
        });
    }
}

const editAnnouncement = async(req,res)=>{
    const {announcementId} = req.params
    const {editedAnnouncement} =req.body
    try {
        const announcement = await announcementModel.findById(announcementId)
        if(!announcement){
            return res.status(200).send({success: false, message: "Announcement doesn't exist"})
        }
        announcement.announcement= editedAnnouncement
        await announcement.save()
        return res.status(200).send({success:true, message:"Announcement updated successfully", announcement})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `editAnnouncement Controller Error: ${error.message}`,
        });
    }
}

const deleteAnnouncement= async(req,res)=>{
    const {announcementId} = req.params
    try {
        const del = await announcementModel.deleteOne({_id:announcementId})
        return res.status(200).send({message:"Announcement Deleted Successfully", success: true})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `deleteAnnouncement Controller Error: ${error.message}`,
        });
    }
}

module.exports ={createAnnouncement,editAnnouncement, deleteAnnouncement, fetchAnnouncements, fetchSingleAnnouncement}