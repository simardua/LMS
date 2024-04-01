import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnnouncements } from '../../redux/action/announcementAction'

const Announcements = () => {
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const announcements= useSelector((state)=>state.fetchAnnouncements.announcements).announcements
useEffect(() => {
  dispatch(fetchAnnouncements)
}, [dispatch])

console.log(announcements)


    const handleCreateAnnouncement= async(data)=>{
        try {
            const response = await axios.post('http://localhost:5000/api/announcement/create', data)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <>
          <div>
  {/* Button trigger modal */}
              <button type='button' className='btn bg-transparent' style={{ margin: '5px' }} data-bs-toggle='modal' data-bs-target="#createAnnouncementModal">
    + create new announcement
  </button>
  {/* Modal */}
  <div className="modal fade" id="createAnnouncementModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Create new announcement</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <textarea type='text-box' style={{ width: "470px", height: "250px" }} placeholder='Enter announcement' onChange={e=>setInput(e.target.value)}/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary" onClick={()=>handleCreateAnnouncement({announcement: input})}>Create</button>
        </div>
      </div>
    </div>
  </div>
</div>

        <div>
            <div>
                {announcements && announcements.length >0 && announcements.map((e)=>(
                    <p key={e._id}>{e.announcement}</p>
                ))}
            </div>

        </div>
    </>
  )
}

export default Announcements