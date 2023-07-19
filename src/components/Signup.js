import React, { useState } from 'react'
import { useContext } from 'react'
import { appContext } from '../context/appContext'
import {saveToken} from '../helper'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
  const {setToken, notifySuccess} = useContext(appContext);
  const [signup, setSignup] = useState({name: "", email: "", password: ""})

  const onChange = (e)=>{
    setSignup({...signup, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e)=>{
    
    e.preventDefault();
    fetch('/api/auth/createUser',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signup)
    })
    .then(res=>res.json())
    .then(res=>{
      setToken(res);
      saveToken(res);
      setSignup({name: "", email: "", password: ""});
      notifySuccess('Your account have been created.');
      navigate('/');
    })
  }

  return (
    <div className='row justify-content-center mt-4'>
      <div className='col-md-3'>
        <h3>Signup</h3>
        <form className='mt-4' onSubmit={(e)=>handleSubmit(e)}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input onChange={(e)=>onChange(e)} type="name" name="name" className="form-control" id="name" value={signup.name}/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input onChange={(e)=>onChange(e)} type="email" name="email" className="form-control" id="email" value={signup.email}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={(e)=>onChange(e)} type="password" name="password" className="form-control" id="password" value={signup.password}/>
          </div>
          <button className="btn btn-primary">Signup</button>
        </form>
      </div>
    </div>
  )
}

export default Signup