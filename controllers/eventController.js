const courseModel = require("../models/courseModel");
const eventModel = require("../models/eventModel");
const userModel = require("../models/userModel");
const transporter = require("./nodeMailer");

const createEvent = async (req, res) => {
  const { courseId } = req.params;
  const { eventName, eventDescription, startTime, deadLine } = req.body;
  try {
    const course = await courseModel.findById(courseId).populate('studentsEnrolled');
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
    const enrolledStudentsEmails = course.studentsEnrolled.map(student => student.email);
    const mailOptions = {
      from: 'simardeepsinghdua@gmail.com',
      to: enrolledStudentsEmails.join(', '),
      subject: `LMS-${course.coursecode} ${course.coursename}-New Event Created`,
      text: `A new event has been created:\n\n` +
        `Course: ${course.coursecode} ${course.coursename}\n` +
        `Event Name: ${eventName}\n` +
        `Event Description: ${eventDescription}\n` +
        `Start Time: ${new Date(startTime).toLocaleString()}\n` +
        `Deadline: ${new Date(deadLine).toLocaleString()}\n` +
        `For more details, please login to your account.`
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    const event = await eventModel.create({ ...req.body, courseId: courseId });
    res.status(201).json({ success: true, data: event, message: "Event created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




const fetchEvents=async(req,res)=>{
    const {courseId}=req.params;
    try{
        const events=await eventModel.find({courseId:courseId})
        if(!events){
            return res.status(400).send({success:false,message:'no events found'})
        }
        return res.status(200).send({success:true,message:'Events fetched successfully',events})
        
    }catch(error){
        console.log(error.message)
        return res.status(500).send({success:false,error:error.message})
    }
}

const postController=async(req,res)=>{
    const {id}=req.params

    try{
    const currentDate= new Date()
      const file=req.body.file;
      if(!file){
        return res.status(400).json({success:false,message:'Not an file'})
      }
      const userId=req.body.userId;
      const comments=req.body.comments;
      const event=await eventModel.findOne({_id:id});
      if(!event){
        return res.status(400).json({success:false,message:'event not found'});
      }
    const payload={
        userId:userId,
        comments:comments,
        submittedOn:currentDate,
        fileUrl:file
    }
    event.submissions.push(payload)
  
      await event.save();
      return res.status(200).json({success:true,message:'file Uploaded successfully',event})
  
    }catch(error){
      console.error('Error:', error);
      return res.status(500).json({ success: false, message: 'Internal server error.' }); 
    }
  }


const fetchUserSubmission = async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;
  try {
    const event = await eventModel.findById(eventId);
    if (!event) {
      return res.status(400).send({ success: false, message: "Event doesn't exist" });
    }

    // Find submission by userId
    const submission = event.submissions.find(submission => {
      if (submission.userId) {
        return submission.userId == userId;
      }
      return false;
    });

    if (!submission) {
      return res.status(200).send({ success: false, message: "Submission doesn't exist" });
    }

    return res.status(200).send({ success: true, message: "Submission fetch success", submission });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

const getEventData=async(req,res)=>{
  try{
    const {eventId}=req.params;
    const event=await eventModel.findOne({_id:eventId})
    if(!event){
      return res.status(400).send({message:'No event found',success:false})
    }
    return res.status(200).send({message:'event fetched',success:true,event})
  }catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}

const updateEventSubmissions=async(req,res)=>{
  try{
    const {submissions}=req.body;
    const {eventId}=req.params;
    const event=await eventModel.findOne({_id:eventId})
    if(!event){
      return res.status(400).send({success:false,message:'event not found'})
    }

    event.submissions=submissions;
    await event.save();
    return res.status(200).send({success:true,message:'Marks upated successfully',event})

  }catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}
module.exports ={createEvent,fetchEvents,postController, fetchUserSubmission,getEventData,updateEventSubmissions}