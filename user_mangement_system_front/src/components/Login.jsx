import React, { useRef,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink, Outlet } from "react-router-dom";
import {useState} from "react"
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { Form } from 'react-bootstrap';
import '../CustomFunction/customFunction.css';
import Navbar from './Navbar'
import Footer from './Footer'
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";


function Login() {
  const userInput = useRef() 
  const userPassword = useRef() 

  let userRefFunction = () => {
    userInput.current.focus()
    // userPassword.current.focus() 
  } 

  useEffect( ()=> {
    userRefFunction()
  },[])

  

  
  const [open, setOpen] = React.useState(false);
  
  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };

  let navigate = useNavigate()
  const [state,setState] = useState({
    email : "",
    password : ""
  }) 
  
  const handleInput = async (event)=> {
    let name = event.target.name
    let value = event.target.value
    setState({...state, [name] : value})
  }
  
  let [emailErr, setEmailErr] = useState(null);
  let [passwordErr, setPasswordErr] = useState(null);
  
  let aprove = true
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    
    if (!state.email) {
      setEmailErr("Please Enter your email");
      aprove = false;
    } else {
      setEmailErr(null);
    }
    if (!state.password) {
      setPasswordErr("Please Enter Password");
      aprove = false;
    } else {
      setPasswordErr(null);
    } 


    let {email,password} = state

    if(aprove) {
    try {
      let response = await axios.post('/login', {
        email,password
      })
      if (response.status === 200 ){
        localStorage.setItem("loggedIn", true)
        navigate('/')
      }
      else{
        setOpen(true);
      }
      
    } catch (error) {
      console.log(error);
      setOpen(true);
    }
  }

  }
  return (

    <div>


<div style={{}}>

<Snackbar className='snackbar'
  anchorOrigin={{
    horizontal: "center",
    vertical: "bottom",
  }}
  open={open}
  autoHideDuration={5000}
  
  message="Invalid Credentials , Please Fill Correctly" 
  onClose={handleToClose}
  action={
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleToClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  }
/> 

</div>



<Navbar/>
 

      <div className="container shadow my-5 mb-2">
        <div className="row">
          <div className="col-md-5 d-flex flex-column form aligns-center 
          text-center text-white justify-content-center">
            <h1 className="display-4 fw-bolder mt-5">Welcome Back</h1>
            <p className="lead text-center">Enter Your Credentials To Login</p>
            <h5 className="mb-4">OR</h5>
            <div>
            <NavLink
              to="/register"
              className="btn btn-outline-primary ms-2 px-4 rounded-pill pb-2 w-50">
              <i className="fa fa-user-plus me-2 "></i>
              Register
            </NavLink>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="col-md-6 p-5">
          
    
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>  
              <Form.Control type="email" placeholder="Enter Email" ref={userInput}
              name="email" value={state.email} onChange={handleInput} 
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
              <p id="validation" className="text-danger" >{emailErr ? emailErr : null}</p>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" 
              name="password" value={state.password} onChange={handleInput} ref={userPassword} 
              />
            </Form.Group>
            <p id="validation" className="text-danger" >{passwordErr ? passwordErr : null}</p>
              
    
    <button className="btn btn-outline-primary w-100 mt-4 rounded-pill" 
    variant="primary" type="submit">
    Submit
    </button>
  </form>


            
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
