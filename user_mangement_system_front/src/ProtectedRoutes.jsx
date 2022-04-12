import axios from 'axios'
import React,{useState , useEffect} from 'react'
import {Navigate, Outlet, useNavigate} from 'react-router'
import Logout from './components/Logout'

const ProtectedRoutes = () => {

  const navigate = useNavigate()
  

  const useAuth = (prop) => {
    const user = {loggedIn : prop}
    return user && user.loggedIn;
  } 

let [auth , setAuth] = useState(null)
let [auth1 , setAuth1] = useState(null)

const isLoggedIn = async() => {
  try {
    const response = await axios.get('/auth')
    console.log(response);

    if(response.status == 200) {
      setAuth(true)
      setAuth1(false)
    }
    else {
      Logout()
      setAuth(false)
      setAuth1(true)
    }
  } catch (error) {
    console.log(error);
    setAuth(false)
    setAuth1(true)
    navigate('/login')
  }
}

useEffect( ()=> {
  isLoggedIn()
},[])

  const isAuth = useAuth({auth});
  return isAuth ? <Outlet/> : <Navigate to ='/login'/>
}


export default ProtectedRoutes