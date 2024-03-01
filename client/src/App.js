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

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" Component={Home}/>
        <Route path="/login" Component={Login}/>
        <Route path="/course" Component={Course}/>
        <Route path="/course/events" Component={CourseEvents}/>
        <Route path="/mycourses" Component={MyCourses}/>
        <Route path="/admin" Component={AdminScreen}/>
        <Route path="/admin/createuser" Component={CreateUser} />
        <Route path="/admin/manageusers" Component={ManageUsers}/>
        <Route path="/admin/manageUsers/:userId" Component={EditUser}/>
        <Route path="/profile" Component={Profile}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
