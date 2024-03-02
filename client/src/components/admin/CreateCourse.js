import React, { useState } from 'react'

const CreateCourse = () => {
    const [coursecode, setCoursecode] = useState('')
    const [coursename, setCoursename] = useState('')
    const [instructors, setInstructors] = useState([])
    const [students, setStudents] = useState([])

    const handleSubmit=()=>{

    }
    return (
        <>
        <div>
            <h3>Create a new course</h3>
            <div>
                <form>
                    <label>Course Code:</label>
                    <input type='text' value={coursecode} onChange={(e)=> setCoursecode(e.target.value)} required/>

                    <label>Course Name:</label>
                    <input type='text' value={coursename} onChange={(e)=>setCoursename(e.target.value)} required/>

                        <label>Instructors:</label>
                        <button>Add</button>

                        <label>Students:</label>
                        <button>Add</button>
                        <br/>

                        <button onClick={handleSubmit} type="submit">Create</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default CreateCourse