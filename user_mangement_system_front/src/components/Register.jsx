import React, {useEffect, useRef,useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from './Navbar'
import Footer from './Footer'
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";


function Register() {

  const userInput = useRef() 
  const userPassword = useRef() 

  let userRefFunction = () => {
    userInput.current.focus()
    // userPassword.current.focus() 
  } 

  useEffect( ()=> {
    userRefFunction()
  },[])

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username : "",
    password : "",
    email : ""
  })

  const handleInput = (event) => {
    let name = event.target.name
    let value = event.target.value
    setUser({...user, [name]: value})
    
  }

  let [nameErr, setNameErr] = useState(null);
  let [emailErr, setEmailErr] = useState(null);
  let [passwordErr, setPasswordErr] = useState(null);

  let aprove = true

  let validation = async(event) => {

    event.preventDefault()


  if (!user.username) {
    setNameErr("Please Enter your name");
    aprove = false;
  } else {
    setNameErr(null);
  }
  if (!user.email) {
    setEmailErr("Please Enter your email");
    aprove = false;
  } else {
    setEmailErr(null);
  }
  if (!user.password) {
    setPasswordErr("Please Enter Password");
    aprove = false;
  } else {
    setPasswordErr(null);
  } 


  if (aprove) {
    const {username,email,password} = user
    console.log(username,email,password);
    try {
      const response = await axios.post('/register',{
          username,password,email
        }
      )
      if (response.status === 200){
        console.log("200");
        navigate('/')

      }else {
        console.log("400");
        window.alert("Invalide Credentials")
      }
    } catch (error) {
      setOpen(true);
      console.log(error);
      window.alert("Invalide Credentials")
    }
  }





}

const [open, setOpen] = React.useState(false);

const handleToClose = (event, reason) => {
  if ("clickaway" === reason) return;
  setOpen(false);
};
// const handleClickEvent = () => {
//   setOpen(true);
// };



  

  // Handle Input
  // const handleSubmit = async(event) => {
  //   event.preventDefault()

  //   const {username,email,password} = user
  //   console.log(username,email,password);
  //   try {
  //     const response = await axios.post('/register',{
  //         username,password,email
  //       }
  //     )
  //     if (response.status === 200){
  //       window.alert("Successfully Registered")
  //       console.log("200");
  //       navigate('/')

  //     }else{
  //       console.log("400");
  //       window.alert("Invalide Credentials")
  //     }
  //   } catch (error) {
      
  //     console.log(error);
  //   }
  // }
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
  
  message="Current Email Is Already Used , Please Use New One" 
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
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column form aligns-center 
          text-center text-white justify-content-center order-2 ">
            <h1 className="display-4 fw-bolder mt-5">Hello, Friend</h1>
            <p className="lead text-center">Enter Your Details To Register</p>
            <h5 className="mb-4">OR</h5>
            <div>
            <NavLink
              to="/login"
              className="btn btn-outline-primary ms-2 px-4 rounded-pill pb-2 w-50">
              <i className="fa fa-sign-in me-2 "></i>
              Login
            </NavLink>
            </div>
          </div>


<form onSubmit={validation} className="col-md-6 p-5">
  <h1 className="display-6 text-center">REGISTER</h1>
<div class="form-group" className="mb-3">
    <label for="exampleInputEmail1">User Name</label>
    <input type="text" class="form-control" id="username" aria-describedby="emailHelp"
    name="username" value={user.username} onChange={handleInput} ref={userInput}
     placeholder="Enter Username" />
     <p id="validity" className="text-danger">{nameErr ? nameErr : null}</p>
  </div>

  <div class="form-group" className="mb-3">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" 
    name="email" value={user.email} onChange={handleInput} 
    placeholder="Enter email" />
    <p id="validation" className="text-danger" >{emailErr ? emailErr : null}</p>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>

  <div class="form-group" className="mb-3">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="password" 
    name="password" value={user.password} onChange={handleInput} ref={userPassword} 
    placeholder="Password" />
    <p id="validation" className="text-danger" >{passwordErr ? passwordErr : null}</p>
  </div>
  
  
  <button className="btn btn-outline-primary w-100 mt-4 rounded-pill" 
  type="submit" > Submit</button> 
</form>


        </div>
      </div>
      <Footer/>
    </div>
  );
}


export default Register