import React, { useState } from 'react'
import "./createUser.css"
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { registerAction } from '../../redux/action/userAction';

const CreateUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [branch, setBranch] = useState('');
    const dispatch= useDispatch()

    const handleSubmit = async(e) => {
        const res = await dispatch(registerAction({firstname: firstName, lastname: lastName, email: email, password: password, branch: branch}))
    };

  return (
    <>
          <div className="signup-container">
              <form className="signup-form">
                  <h2>Create a user</h2>

                  <label>First Name:</label>
                  <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                  />

                  <label>Last Name:</label>
                  <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                  />

                  <label>Email:</label>
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                  />

                  <label>Password:</label>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />

                  <label>Confirm Password:</label>
                  <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                  />

                  <label>Branch:</label>
                  <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      required
                  >
                      <option value="" disabled>Select Branch</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="electrical-engineering">Electrical Engineering</option>
                      <option value="mechanical-engineering">Mechanical Engineering</option>
                  </select>

                  <button onClick={handleSubmit} type="submit">Signup</button>
              </form>
          </div>
          
    </>
  )
}

export default CreateUser