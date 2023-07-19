import React, { useState } from 'react'
import { useContext } from 'react'
import { appContext } from '../context/appContext'
import {saveToken} from '../helper'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const {setToken} = useContext(appContext);
  const [login, setLogin] = useState({email: "", password: ""})

  const onChange = (e)=>{
    setLogin({...login, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e)=>{
    
    e.preventDefault();
    fetch('/api/auth/login',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(login)
    })
    .then(res=>res.json())
    .then(res=>{
      setToken(res);
      saveToken(res);
      setLogin({email: "", password: ""});
      navigate('/');
    })
  }

  return (
    <div className='row justify-content-center mt-4'>
      <div className='col-md-3'>
        <h3>Login</h3>
        <form className='mt-4' onSubmit={(e)=>handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input onChange={(e)=>onChange(e)} type="email" name="email" className="form-control" id="email" value={login.email}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={(e)=>onChange(e)} type="password" name="password" className="form-control" id="password" value={login.password}/>
          </div>
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login