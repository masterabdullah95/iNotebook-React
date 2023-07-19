import { Link } from 'react-router-dom'
import { React, useContext } from 'react'
import { appContext } from '../context/appContext'
import { useNavigate  } from 'react-router-dom'
import { saveToken } from '../helper'

const Navbar = () => {
    const {token, setToken, notifySuccess} = useContext(appContext);
    const navigate = useNavigate ();

    const logout = ()=>{
        setToken('');
        saveToken('');
        notifySuccess('You have been logout.');
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/notes">Notes</Link>
                        </li>
                        {token?
                        (
                            <li className="nav-item">
                                <button className="nav-link" onClick={logout}>Logout</button>
                            </li>
                        )
                        :
                        (
                            <>
                                <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Signup</Link>
                                </li>
                            </>
                        )
                        }
                        
                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar