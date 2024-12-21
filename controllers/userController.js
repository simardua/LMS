const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("../node_modules/jsonwebtoken")
const courseModel = require("../models/courseModel")
require('dotenv').config();

const userRegister = async (req, res) => {
    let { firstname, lastname, email, password, accountType, branch, courses } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({ message: "User Already Exists", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.HASH_PASS_KEY));
        password = hashedPassword;

        // Create the new user
        const newUser = await userModel.create({
            firstname,
            lastname,
            email,
            password,
            accountType,
            branch,
            courses,
        });

        // Update courses in courseModel
        for (let courseId of courses) {
            const course = await courseModel.findOne({ _id: courseId });
            if (!course) {
                // If course doesn't exist, handle accordingly
                return res.status(400).send({ message: `Course with ID ${courseId} not found`, success: false });
            }
            // Add the user to the course's studentsEnrolled array
            course.studentsEnrolled.push(newUser._id);
            await course.save();
        }

        console.log(newUser);
        return res.status(200).json({ message: "Registered Successfully", success: true, newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: `Register Controller ${error.message}`,
        });
    }
};



const loginController = async(req,res)=>{
    let {email, password}= req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res
                .status(200)
                .send({ message: "user not found", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Invlid EMail or Password", success: false });
        }
        const token = await jwt.sign({ userId: user._id }, process.env.JWT_TOKEN_KEY);
        console.log("token", token)
        user.token = token;
        res.cookie("token", token, {
            expires: new Date(Date.now() + 1000000 * 6),
            httponly: true,
        })
        const newUser = await user.save()

        res.status(200).json({ message: "Login Success", success: true, user: newUser });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
    }
}


const fetchAllUsers=async(req,res)=>{
    try {
        const users= await userModel.find({})
        if (!users) {
            return res.status(404).send({ success: false, message: 'No user Found' })
        }
        return res.status(200).send({ success: true, message: 'Users fetched', users })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
}


const fetchUser= async(req,res)=>{
    const {userId} = req.params;
    try {
        const user = await userModel.findOne({_id: userId}).populate('courses')
        if (!user) {
            return res
                .status(200)
                .send({ message: "user not found", success: false });
        }
        return res.status(200).send({success: true, message:"User fetched", user})
    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
}

const signoutController = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }
    const decoded = await jwt.verify(token, process.env.JWT_TOKEN_KEY)
    console.log(decoded)
    console.log("it", decoded)
    if (decoded) {
        const user = await userModel.findOne(decoded.email);
        user.token = null;
        await user.save();
        res.clearCookie("token");
        res.json({ success: true, message: "Logged Out" });
        return;
    }
}

const deleteUser = async(req,res)=>{
    const {userId}=req.params;
    try {
        const user = await userModel.deleteOne({ _id: userId })
        if (!user) {
            return res.status(200).send({ message: "user not found", success: false })
        }
        return res.status(200).send({ success: true, message: "User fetched", user })
    } catch (error) {
        console.log(error)
        return res.status(500).send({ success: false, message: 'Internal Server Error' })   
    }
   
}

const editUser = async (req, res) => {
    const { userId } = req.params;
    const { firstname, lastname, email, branch, accountType, courses } = req.body;
    try {
        const oldUser = await userModel.findOne({ _id: userId });

        // Compare courses before and after update
        const removedCourses = oldUser.courses.filter(course => !courses.includes(course));
        const addedCourses = courses.filter(course => !oldUser.courses.includes(course));

        const user = await userModel.updateOne({ _id: userId }, {
            $set: { firstname, lastname, email, branch, accountType, courses }
        });

        if (!user) {
            return res.status(404).send({ message: "user not found", success: false });
        }

        // Remove user from studentsEnrolled of removed courses
        for (let courseId of removedCourses) {
            const course = await courseModel.findOne({ _id: courseId });
            if (!course) {
                return res.status(400).send({ message: 'Course not found' });
            }
            course.studentsEnrolled = course.studentsEnrolled.filter(studentId => studentId.toString() !== userId);
            await course.save();
        }

        // Add user to studentsEnrolled of added courses
        for (let courseId of addedCourses) {
            const course = await courseModel.findOne({ _id: courseId });
            if (!course) {
                return res.status(400).send({ message: 'Course not found' });
            }
            if (!course.studentsEnrolled.includes(userId)) {
                course.studentsEnrolled.push(userId);
                await course.save();
            }
        }

        return res.status(200).send({
            success: true,
            message: "User Edited",
            user,
            removedCourses,
            addedCourses
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: 'Internal Server Error' });
    }
}

const searchUser= async(req,res)=>{
    const keyword = req.query.search
    ?{
        $or:[
            {firstname: {$regex: req.query.search, $options: "i"}},
            { lastname: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
        ]
    }:{};
    const users = await userModel.find(keyword)
    res.json({message:"user search success", success: true, users})
    console.log(keyword)
}

const getUser=async(req,res)=>{
    try{
      const userId=req.params.id;
      const user=await userModel.findOne({_id:userId})
      if(!user){
        return res.status(400).send({success:false,message:'User not found'})
      }
      return res.status(200).send({success:true,message:'data fetched',data:user})
    }catch(error){
      console.log(error.message)
      return res.status(500).send({success:false,message:'Internal Server error'})
    }
  }

const editPicture = async (req, res) => {
    const { Img } = req.body;
    try {
        const userId = req.params.id;
        const user = await userModel.findOne({ _id: userId });
        if (!user) {
            return res.status(400).send({ success: false, message: 'User not found' });
        }
        user.userImg = Img;
        await user.save(); // Wait for the save operation to complete
        return res.status(200).send({ success: true, message: 'Profile picture updated', user });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ success: false, message: 'Internal Server error' });
    }
};


const changePassword = async(req,res)=>{
    const {currentPass, newPass}= req.body;
    const {userId}= req.params
    try {
        let user = await userModel.findOne({_id:userId})
        if (!user) {
            return res.status(400).send({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(currentPass, user.password);
        if (!isMatch) {
            return res.status(200).send({message: "Password doesn't match with current password", success:false})
        }
        const hashedNewPass = await bcrypt.hash(newPass, parseInt(process.env.HASH_PASS_KEY));
        user.password = hashedNewPass;
        await user.save()
        return res.status(200).send({message:"Password Changed Successfully", success: true})
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ success: false, message: 'Internal Server error' });
    }
}

// const createAttendance = async (req, res) => {
//     const { course, date } = req.body;

//     try {
//         const users = await userModel.find({});
//         const updatedUsers = users.filter((user) => {
//             return user.courses.some((key) => key === course._id);
//         });
//         console.log(updatedUsers)
//         await Promise.all(updatedUsers.map(async (user) => {
//             user.courseAttendances.push({
//                 course: course._id,
//                 attendance: {
//                     date: date,
//                     isPresent: false
//                 }
//             });
//             await user.save();
//         }));

//         return res.status(200).send({ success: true, message: 'Attendance created successfully' });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ success: false, message: 'Internal Server Error' });
//     }
// }


// const updateAttendance = async (req, res) => {
//     const { user, course, date } = req.body;
//     try {
//         const foundUser = await userModel.findOne({ _id: user?._id });
//         if (!foundUser) {
//             return res.status(404).send({ success: false, message: 'User not found' });
//         }
//         foundUser.courseAttendances.forEach((item) => {
//             if (item.course.toString() === course._id.toString() && item.attendance.date === date) {
//                 item.attendance.isPresent = true;
//             }
//         });
//         await foundUser.save();
//         return res.status(200).send({ success: true, message: 'Attendance updated successfully' });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({ success: false, message: 'Internal Server Error' });
//     }
// };

module.exports = { userRegister,getUser, loginController, fetchAllUsers, fetchUser, signoutController,deleteUser, editUser, searchUser, editPicture, changePassword};
