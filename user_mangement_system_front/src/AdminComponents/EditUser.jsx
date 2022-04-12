import React, { useRef,useEffect } from "react";
import Footer from '../components/Footer';
import Anavbar from './Anavbar'
import "bootstrap/dist/css/bootstrap.min.css";
import { useModal } from 'react-hooks-use-modal';
import {useState} from "react"
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import { Form } from 'react-bootstrap';

function EditUser({userdata}) {

  const [Modal, open, close, isOpen] = useModal('root', {
    preventScroll: true,
    closeOnOverlayClick: false
  });

const navigate = useNavigate()

  const [user, setUser] = useState({
    username : "",
    email : ""
    
  })

  const handleInput = (event) => {
    let name = event.target.name
    let value = event.target.value
    setUser({...user, [name]: value})
    
  }

  const userInput = useRef()

  let userRefFunction = () => {
    userInput.current.focus()
  }

  useEffect( ()=> {
    userRefFunction()
  },[])

  let [nameErr, setNameErr] = useState(null);
let [emailErr, setEmailErr] = useState(null);



let aprove


const update = async (event,id,user) => {
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


  if (aprove) {
  console.log( user,"user from update");
  const response = await axios.post('/alogin/update',{id,user})
  try {
    if (response.status === 200) {
      console.log('abc');
      open()
      setTimeout( ()=> {
        navigate('/user')
        window.location.reload()
      },2000)
    }else {
      console.log("failed");
    }
    
  } catch (error) {
    console.log(error);
  }

}
}





  

  return (
    <div>

<Modal className="mb-5">
      <div>
        <h1 className="text-danger">You Are</h1>
        <h3 className="text-danger">Successfully Edited User Credentials.</h3>
        <button className='btn btn-success' onClick={close}>CLOSE</button>
      </div>
    </Modal>

<Anavbar/>
{/* {e => { handleSubmit(e) }} */}

 <div className="container shadow my-5 mb-2  d-flex justify-content-center">
   <div className="row">
            <form  className="col-md-12 p-5" onSubmit={e=>{update(e,userdata._id,user)}}>

   <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Edit User Name</Form.Label>
            <Form.Control type="text"  ref={userInput}
            name="username" placeholder={userdata.username} onChange={handleInput}
            />
          </Form.Group>

          <p id="validation" className="text-danger" >
            {nameErr}
              </p>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Edit Email Address</Form.Label>  
            <Form.Control type="email" placeholder={userdata.email} onChange={handleInput}
            name="email" 
            />
          </Form.Group>
            

          
          <p id="validation" className="text-danger" >
            {emailErr}
            </p>
            
  
  <button className="btn btn-outline-primary w-100 mt-4 rounded-pill" 
  variant="primary" type="submit">
  Submit
  </button>
</form>


          
      </div>
    </div>

      <Footer />
  </div>

  )
}

export default EditUser