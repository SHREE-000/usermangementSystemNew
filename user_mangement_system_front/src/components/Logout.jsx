import axios from 'axios';
import React from 'react'
import { useEffect } from "react";
import {  useNavigate } from 'react-router-dom';
import { render } from 'react-dom';
import { useModal } from 'react-hooks-use-modal';

function Logout() {

    const [Modal, open, close, isOpen] = useModal('root', {
        preventScroll: true,
        closeOnOverlayClick: false
      });

    const navigate = useNavigate()
    const logout = async ()=> {
        try {
            const response = await axios.get('/logout')
            if (response.status === 401 || !response) {
                window.alert("please Loggin Later")
            }
            else {
                open()
                setTimeout( ()=> {
                    navigate('/')
                window.location.reload();
                },1500)
                
                
            }
        } catch (error) {
            
        }
    }
    useEffect( ()=> {
        logout()
    },[])

  return (
    <div>
    {/* <p>Modal is Open? {isOpen ? 'Yes' : 'No'}</p>
    <button onClick={open}>OPEN</button> */}
    <Modal>
      <div>
        <h1>You Are</h1>
        <h3>Successfully Logout.</h3>
        <button className='btn btn-success' onClick={close}>CLOSE</button>
      </div>
    </Modal>
  </div>
  )
}

export default Logout