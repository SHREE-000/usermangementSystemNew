import React from 'react'
import Footer from './Footer'

function About() {
  return (
    <div>
        
        <section className="about">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <img src="./asset/img2.jpg"
                        className='w-75 mt-5' alt="" />
                        </div>
                        <div className="col-md-6">
                        <h3 className="fs-5 mt-5"> About Us</h3>
                        <h1 className="display-6 mb-2">Who <b>We</b> Are </h1>
                        <hr className='w-50' />
                        <p className="lead mb-4">
                        Contrary to popular belief, Lorem Ipsum is not simply random text.
                         It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
                         Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the 
                         more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of 
                         the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 
                         1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written 
                         in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first 
                         line of Lorem Ipsum,
                         "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
                         <div className="buttons d-flex justify-content-center mb-5">
                       <button className="btn btn-primary rounded-pill me-4 px-4 py-2">
                        Get Started
                        </button>
                        <button className="btn btn-primary rounded-pill me-4 px-4 py-2">
                        Contact Us
                        </button>
                      </div>
                        </div>
                    </div>
                </div>
            </section>
              {/* <Footer/>  */}
    </div>
  )
}

export default About