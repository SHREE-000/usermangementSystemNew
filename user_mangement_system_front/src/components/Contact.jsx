import axios from "axios";
import React from "react";
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function Contact() {

  const navigate = useNavigate()
  const [msg,setMsg] = useState({
    username : "",
    email : "",
    message : ""
  })

  const handleChange = async (event) => {
    let name = event.target.name
    let value = event.target.value
    setMsg({...msg, [name] : value}) 
  }

  const submitChange  = async (event) => {
    event.preventDefault()
    let {username,email,message} = msg

    const response = await axios.post('/contact', {
      username,email,message
    })
    if (response.status == 400 || !response) {
      window.alert("Failed")
    }
    else {
      window.alert("Success")
      navigate('/')
    }
  }
  return (
    <div>
      <section id="contact" className="mt-5 mb-5">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <h3 className="fs-5 text-center mb-0">Contact Us</h3>
              <h1 className="display-6 text-center mb-4">
                Have Some <b> Question?</b>
              </h1>
              <hr className="w-25 mx-auto" />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <img src="./asset/img2.jpg" alt="" className="w-75" />
            </div>

            <div className="col-md-6">
              <form action={submitChange} method="post">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={msg.username}
                    onChange={handleChange}
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Your Name"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={msg.email}
                    onChange={handleChange}
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Your Email"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">
                    Your Message
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    name="message"
                    value={msg.username}
                    onChange={handleChange}
                    rows="5"
                  ></textarea>
                </div>

                <buttun className="btn btn-outline-primary">
                  Send Message
                  <i className="fa fa-paper-plane ms-2"></i>
                </buttun>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
