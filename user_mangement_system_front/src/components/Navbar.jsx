import { useState, useEffect }  from "react"; 
import { NavLink, Outlet } from "react-router-dom";
import axios from 'axios'



function Navbar() {
  let [auth,setAuth] = useState(null)

  const IsLoggedIn = async() => {
  const response = await axios.get('/auth')
  if (response.status === 200) {
    try {
      setAuth(true)
      
    }  
    catch (error) {
      setAuth(false)
    }
    
  }
  else{
    setAuth(false)
  }
 

}

useEffect( ()=> {
  IsLoggedIn()
},[auth])

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
                <NavLink to='/' class="nav-link disabled text-danger" 
                style={{color: 'black', textDecoration:'none'}} end>Home</NavLink>
              </li>

              <li class="nav-item">
                <NavLink to='about' class="nav-link disabled text-danger"
                style={{color: 'red', textDecoration:'none'}}end>
                About </NavLink>
              </li>
              <li class="nav-item">
                <NavLink to='services' class="nav-link disabled text-danger" 
                style={{color: 'red', textDecoration:'none'}} end>Services</NavLink>
              </li>
              <li class="nav-item">
                <NavLink to='contact' class="nav-link disabled text-danger"
                style={{color: 'red', textDecoration:'none'}}end>Contact</NavLink>
              </li>
            </ul>
            <div className="text-center">

{ auth==null &&            <NavLink to='/login' className="btn btn-outline-primary ms-2 px-4 mb-2 mt-2  rounded-pill"
             style={{width: '185px'}}>
              <i className="fa fa-sign-in me-2"></i>
              Login
            </NavLink>}
{ auth==null &&           <NavLink to='/register' className="btn btn-outline-primary ms-2 px-4  mb-2 mt-2 rounded-pill"
            style={{width: '185px'}}>
              <i className="fa fa-user-plus me-2"></i>
              Register
            </NavLink>}
            <NavLink to='/dashboard' className="btn btn-outline-primary ms-2 px-4  mb-2 mt-2 rounded-pill"
            style={{width: '185px'}}>
              <i className="fa fa-user-plus me-2"></i>
              Dashboard
            </NavLink>
            { auth &&
            <NavLink to='/logout' className="btn btn-outline-primary ms-2 px-4  mb-2 mt-2 rounded-pill" 
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

export default Navbar;
