import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Signup from './components/Signup'
import Notes from './components/Notes'
import Home from './components/Home'
import {getToken} from './helper';
import { useEffect, useState } from 'react'
import {appContext} from './context/appContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);
  
  const [token, setToken] = useState("");
  const [notes, setnotes] = useState([])

  useEffect(() => {

    getToken()
    .then(res=>{
      setToken(res);
    })

    if(token){
      fetch('/api/notes/fetchnotes',{
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'token': token
        }
      })
      .then(res=>res.json())
      .then(res=>{
      setnotes(res);
      })
    }
  
  }, [token])

  return (
    <div className="App">
      <appContext.Provider value={{token, notes, setToken, setnotes, notifySuccess, notifyError}}>
        <Router>
              <Navbar/>
              <ToastContainer />
              <Routes>
                  <Route path='/' element={<Home/>}>Home</Route>
                  <Route path='/login' element={<Login/>}>Login</Route>
                  <Route path='/signup' element={<Signup/>}>Signup</Route>
                  <Route path='/notes' element={<Notes/>}>Notes</Route>
              </Routes>
          </Router>
      </appContext.Provider>
    </div>
  );
}

export default App;
