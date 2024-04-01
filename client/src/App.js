import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Course from "./components/Course";
import CourseEvents from "./components/CourseEvents";
import MyCourses from "./components/MyCourses";
import AdminScreen from "./components/admin/AdminScreen";
import CreateUser from "./components/admin/CreateUser";
import ManageUsers from "./components/admin/ManageUsers";
import EditUser from "./components/admin/EditUser";
import Profile from "./components/Profile";
import CreateCourse from "./components/admin/CreateCourse";
import ManageCourses from "./components/admin/ManageCourses";
import EditCourse from "./components/admin/EditCourse";
import Attendance from "./components/Attendance";
import UserAttendance from "./components/UserAttendance";
import EventDetails from "./components/EventDetails";
import Announcements from "./components/admin/Announcements";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/:courseId/course" Component={Course}/>
        <Route path="/:courseId/course/events" Component={CourseEvents}/>
        <Route path="/attendance/:courseId" Component={Attendance}/>
        <Route path="/events/:eventId" Component={EventDetails}/>
        <Route path="/userAttendance/:courseId/:date" Component={UserAttendance} />
        <Route path="/mycourses" Component={MyCourses}/>
        <Route path="/admin" Component={AdminScreen}/>
        <Route path="/admin/createuser" Component={CreateUser} />
        <Route path="/admin/manageusers" Component={ManageUsers}/>
        <Route path="/admin/manageUsers/:userId" Component={EditUser}/>
        <Route path="/profile" Component={Profile}/>
        <Route path="/admin/create-course" Component={CreateCourse}/>
        <Route path="/admin/manage-courses" Component={ManageCourses}/>
        <Route path="/admin/manage-courses/:courseId" Component={EditCourse}/>
        <Route path="/admin/announcements" Component={Announcements}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
