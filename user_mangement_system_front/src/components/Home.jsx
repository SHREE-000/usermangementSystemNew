import React, { useEffect } from 'react'
import Navbar from './Navbar'
import About from './About'
import Services from './Services'
import Footer from './Footer'
import Contact from './Contact'
import axios from 'axios'
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button"
import { useCookies  } from "react-cookie";


function Home() {
  

  const [cookies, setCookie] = useCookies();

  const [open, setOpen] = React.useState(false);

  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };
  const handleClickEvent = () => {
    setOpen(true);
    localStorage.setItem("loggedIn", false)
  };

useEffect(()=>{
  var logg = localStorage.getItem("loggedIn")
  if(cookies.token && logg){
  handleClickEvent()
  localStorage.setItem("loggedIn", false)
  }
},[])


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
        
        message="Successfully LoggedIn" 
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


      < Navbar/>
        <section id="home">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8 mt-5">
                <h1 className="display-4 mb-4 fw-bolder mb-4 text-center text-white">
                  Feels The Fresh Business Perspective
                  </h1>
                  <p className="lead fs-4 text-center mb-5 text-white">
                  MongoDB is a source-available cross-platform document-oriented database program.
                   Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional
                    schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License.
                    </p>

                    <div className="buttons d-flex justify-content-center">
                      <button className="btn btn-light rounded-pill me-4 px-4 py-2">
                        Get Quote
                        </button>
                        <button className="btn btn-light rounded-pill me-4 px-4 py-2">
                        Our Services
                        </button>
                      </div>
                </div>
              </div>
            </div>
          </section>
          <About/>
          <Services/>
          <Contact/>
          <Footer/>
    </div>
  )
}


export default Home