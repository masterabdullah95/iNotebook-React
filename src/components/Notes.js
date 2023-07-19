import React, { useState } from 'react'
import { useContext } from 'react'
import { appContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import SingleNote from './SingleNote'
import { useRef } from 'react'

const Notes = () => {
  const openPopup = useRef();
  const closePopup = useRef();
  const navigate = useNavigate();
  const { token, notes, setnotes, notifySuccess } = useContext(appContext);
  const [note, setNote] = useState({id: "", title: "", body: ""})

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value});
  }

  const handleEdit = (_note)=>{
    openPopup.current.click();
    setNote({id: _note._id, title: _note.title, body: _note.body});
  }

  const handleDelete = (noteId) => {
    fetch('/api/notes/deleteNote/' + noteId, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'token': token
      }
    })
    .then(res => {
      let _notes = notes.filter((note) => note._id !== noteId)
      setnotes(_notes);
      notifySuccess('Note has been deleted.')
    })
  }

  const handleSubmit = (e)=>{
    
    e.preventDefault();
    fetch('/api/notes/updatenote/'+note.id,{
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify({title: note.title, body: note.body})
    })
    .then(res=>res.json())
    .then(res=>{
      setNote({id: "", title: "", body: ""});

      let _notes = [...notes];
      _notes.forEach((item, index) => {
        if(item._id === res._id){
          item.title = res.title;
          item.body = res.body;
        }
      });
      setnotes(_notes);
      
      closePopup.current.click();
      notifySuccess('Note has been updated.');
    })
  }

  const handleRedirect = (url) => {
    navigate(url);
  }

  if (!token) {
    return (
      <center className='m-5'><p>Please <button className='btn btn-sm btn-success' onClick={() => handleRedirect('/login')}>Login</button> or <button className='btn btn-primary btn-sm' onClick={() => handleRedirect('/signup')}>Signup</button> to view content.</p> </center>
    )
  }

  return (
    notes?.length > 0 ?
      <>
        {/* Popup Modal */}
        {/* Button trigger modal  */}
        <button style={{display: 'none'}} ref={openPopup} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        {/* Modal  */}
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <form className='mt-4' onSubmit={(e) => handleSubmit(e)}>
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className='row justify-content-center'>
                  <div className='row'>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input onChange={(e) => onChange(e)} type="text" name="title" className="form-control" id="title" value={note.title} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="body" className="form-label">Body</label>
                        <input onChange={(e) => onChange(e)} type="text" name="body" className="form-control" id="body" value={note.body} />
                      </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button ref={closePopup} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
              </form>
            </div>
          </div>
        </div>

        <div className='row justify-content-center mt-4'>
          <h3 className='text-center mb-4 mt-3'>Notes</h3>
          {
            notes?.map(note => (
              <SingleNote handleDelete={handleDelete} note={note} handleEdit={handleEdit} key={note._id}/>
            ))
          }
        </div>
      </>
      :
      <center><p>No notes found.</p></center>
  )
}

export default Notes