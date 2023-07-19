import React, { useState } from 'react'
import { useContext } from 'react'
import { appContext } from '../context/appContext'


const AddNote = () => {
 
  const {token, notes, setnotes, notifySuccess} = useContext(appContext);
  const [note, setNote] = useState({title: "", body: ""})

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e)=>{
    
    e.preventDefault();
    fetch('/api/notes/createNote',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'token': token
      },
      body: JSON.stringify(note)
    })
    .then(res=>res.json())
    .then(res=>{
      setNote({title: "", body: ""});
      let _notes = [...notes, res]
      notifySuccess('Note has been created.');
      setnotes(_notes);
    })
  }

  return (
    <div className='row justify-content-center mt-4 mb-5'>
      <div className='col-md-3'>
        <h3>Add Note</h3>
        <form className='mt-4' onSubmit={(e)=>handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input onChange={(e)=>onChange(e)} type="text" name="title" className="form-control" id="title" value={note.title} />
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="form-label">Body</label>
            <input onChange={(e)=>onChange(e)} type="text" name="body" className="form-control" id="body" value={note.body}/>
          </div>
          <button className="btn btn-primary">Add Note</button>
        </form>
      </div>
    </div>
  )
}

export default AddNote