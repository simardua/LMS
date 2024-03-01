import React from 'react'
import { Link } from 'react-router-dom'

const MyCourses = () => {
  return (
      <> 
              <div className='main'>
                  <div className='heading'>
                      <h1>My Courses</h1>
                  </div>

                  <div className='d-flex flex-wrap' id='course-div'>
                      <div className="card" style={{ width: '18rem', height: '250px' }}>
                          <div id='course-info'>
                              <p>Teacher: Example</p>
                          </div>
                          <div className="card-body">
                              <h5 className="card-title">Course Name</h5>
                              <Link to="/course" className="btn" id='course-btn'>Course</Link>
                          </div>
                      </div>
                  </div>
              </div>
      </>
  )
}

export default MyCourses