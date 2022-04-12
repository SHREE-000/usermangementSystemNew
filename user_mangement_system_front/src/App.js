
import React , {useState} from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services'
import Contact from './components/Contact';
import Footer from './components/Footer';
import Userdata from './AdminComponents/Userdata'
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import ALogin from './AdminComponents/ALogin';
import EditUser from './AdminComponents/EditUser';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Logout from './components/Logout';
import ProtectedRoutes from './ProtectedRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sample from './components/Sample';

function App() {

  const [userdata, setUserdata] = useState(null)
  
  return (
    
    <BrowserRouter>
    <Routes>

    <Route index element = {<Home/>}/>
    <Route index element = {< Navbar/>} />
    <Route path='about' element = {<About/>}/>
    <Route path='services' element = {<Services/>}/>
    <Route path='contact' element = {<Contact/>}/>
    <Route path='login' element = {<Login/>}/>
    <Route path='register' element = {<Register/>}/>
    <Route path='logout' element = {<Logout/>}/>
    <Route element={<ProtectedRoutes/>}>
    <Route path='dashboard' element = {<Dashboard/>} />
    </Route>
    <Route path='alogin' element = {<ALogin/>}/>
    <Route path='sample' element = {<Sample/>}/>
    <Route path='user' element = {<Userdata setUserdata={setUserdata}/>}/>
    <Route path='edituser' element = {<EditUser userdata={userdata}/>}/>
    <Route index element = {< Footer/>} />
    <Route path='*' element = {<div>404 Not Found</div>}/>

 
    </Routes>
    </BrowserRouter>
    
  );
}

export default App