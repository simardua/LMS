import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnnouncements, fetchSingleAnnouncement } from '../../redux/action/announcementAction'
import Icon from "react-crud-icons";
import { message } from "antd";
import Loader from '../miscellenious/Loader'


const Announcements = () => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const announcements = useSelector((state) => state.fetchAnnouncements.announcements).announcements
  const [singleAnnouncement, setSingleAnnouncement] = useState('')
  const [editInput, setEditInput] = useState('')
  const [announcementId, setAnnouncementId] = useState('')
  const [loading, setloading] = useState(false)

  useEffect(() => {
    setloading(true)
    dispatch(fetchAnnouncements)
    setloading(false)
  }, [dispatch])


  const handleCreateAnnouncement = async (data) => {
    try {
      setloading(true)
      const response = await axios.post('http://localhost:5000/api/announcement/create', data)
      if (response.data.success) {
        message.success(response.data.message)
      }else{
        message.error(response.data.message)
      }
      setloading(false)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const editModal=async(id)=>{
    try {
      const response = await axios.get(`http://localhost:5000/api/announcement/fetch-single/${id}`)
      setSingleAnnouncement(response.data.announcement.announcement)
      console.log(singleAnnouncement)
      setAnnouncementId(id)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete=async()=>{
    try {
      setloading(true)
      const res= await axios.delete(`http://localhost:5000/api/announcement/delete/${announcementId}`)
      if (res.data.success) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
      setloading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const saveAnnouncement=async(data)=>{
    try {
      setloading(true)
      const res=await axios.post(`http://localhost:5000/api/announcement/edit/${announcementId}`, data)
      if (res.data.success) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
      setloading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(singleAnnouncement){
      setEditInput(singleAnnouncement)
    }
  },[singleAnnouncement])

  return (
    <>
    {loading? <><Loader/></>:<>
        <div>
          {/* Button trigger modal */}
          <button type='button' className='btn bg-transparent' style={{ margin: '5px' }} data-bs-toggle='modal' data-bs-target="#createAnnouncementModal">
            + create new announcement
          </button>
          {/* Create Modal */}
          <div className="modal fade" id="createAnnouncementModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Create new announcement</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <textarea type='text-box' style={{ width: "470px", height: "250px" }} placeholder='Enter announcement' onChange={e => setInput(e.target.value)} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => handleCreateAnnouncement({ announcement: input })}>Create</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>Announcement</th>
                  <th>Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {announcements && announcements.length > 0 && announcements.map((e) => (
                  <tr key={e._id}>
                    <td>{e.announcement}</td>
                    <td>{e.createdAt}</td>
                    <td><button type='button' data-bs-toggle='modal' data-bs-target="#editAnnouncementModal" onClick={() => editModal(e._id)}>edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
          {/* Edit Modal */}
          <div className="modal fade" id="editAnnouncementModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Edit announcement</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                </div>
                <div className="modal-body">
                  <textarea type='text-box' style={{ width: "470px", height: "250px" }} value={editInput} onChange={e => setEditInput(e.target.value)} />
                </div>
                <div className="modal-footer">
                  <div className='d-flex justify-content-between w-100'>
                    <div>
                      <button type='button' className='btn btn-danger' onClick={handleDelete}>Delete</button>
                    </div>
                    <div>
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" className="btn btn-primary" onClick={() => saveAnnouncement({ editedAnnouncement: editInput })}>Save</button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
    </>}
   
    </>
  )
}

export default Announcements