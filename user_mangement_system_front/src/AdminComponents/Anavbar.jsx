import React, { useEffect, useState }  from 'react';
import ReactDOM from 'react-dom'
import { useNavigate, NavLink, Outlet } from "react-router-dom";




function Anavbar() {

    const [auth,setAuth] = useState(null)

    let navigate = useNavigate()
    let loginFalse = async()=> {
        localStorage.setItem("AdminLoggedIn", false)
        // setAuth(false)
    }   

    let checkAuth = ()=> {

    let authh = localStorage.getItem("AdminLoggedIn")

    if (authh === 'true'){
      setAuth(true)
    }else{
      setAuth(false)
    }

  }

  useEffect( ()=> {
    checkAuth()
  },[])

  let userdata = (event)=> {
    event.preventDefault()
    auth ? navigate('/user') : navigate('/alogin')
    
  }


    console.log(auth,"from nav bar");

  return (
    <div>


      <nav class="navbar navbar-expand-lg navbar-light shadow">
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 text-center mt-2 mb-2">
            <li class="nav-item">
                <NavLink to='/alogin' class="nav-link disabled text-danger" 
                style={{color: 'black', textDecoration:'none'}} end>Home</NavLink>
              </li>
            </ul>
            <div className="text-center">

            <button onClick={userdata} className="btn btn-outline-primary ms-2 px-4  mb-2 mt-2 rounded-pill"
            style={{width: '185px'}}>
              <i className="fa fa-user-plus me-2"></i>
              USER DATA
            </button>
            

{ !auth &&   <NavLink to='/alogin' className="btn btn-outline-primary ms-2 px-4 mb-2 mt-2  rounded-pill"
             style={{width: '185px'}}>
              <i className="fa fa-sign-in me-2"></i>
              Login
            </NavLink>}

            
            { auth && 
            <NavLink to='/alogin' className="btn btn-outline-primary ms-2 px-4  mb-2 mt-2 rounded-pill"
             onClick={loginFalse}
            style={{width: '185px'}}>
              <i className="fa fa-sign-out me-2"></i>
              Logout
            </NavLink> }
            
            
            </div>

          </div>
        </div>
      </nav>
      <Outlet/>
     
    </div>
  );
}

export default Anavbar;
