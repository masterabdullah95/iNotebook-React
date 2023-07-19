import React from 'react'

const SingleNote = ({note, handleDelete, handleEdit}) => {

  return (
    <div className="col-md-2 card m-2" key={note._id}>
        <div className='card-body'>
            <h6>{note.title}</h6>
            <p>{note.body}</p>
            <button className='btn btn-sm btn-info' onClick={()=>handleEdit(note)}>Edit</button>
            <button className='btn btn-sm btn-danger m-2' onClick={()=>handleDelete(note._id)}>Delete</button>
        </div>
    </div>
  )
}

export default SingleNote