import React from 'react'
import AddNote from './AddNote'
import Notes from './Notes'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { appContext } from '../context/appContext'

const Home = () => {
  const {token} = useContext(appContext);
  const navigate = useNavigate();

  const handleRedirect = (url)=>{
    navigate(url);
  }

  if(!token){
    return(
      <center className='m-5'><p>Please <button className='btn btn-sm btn-success' onClick={()=>handleRedirect('/login')}>Login</button> or <button className='btn btn-primary btn-sm' onClick={()=>handleRedirect('/signup')}>Signup</button> to view content.</p> </center>
    )
  }

  return (
    <div>
        <AddNote/>
        <hr />
        <Notes/>
    </div>
  )
}

export default Home