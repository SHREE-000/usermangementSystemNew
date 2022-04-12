import React, { useEffect , useState , useRef  } from 'react'
import Anavbar from './Anavbar'
import Footer from '../components/Footer'
import {Table} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';



function Userdata({setUserdata}) {
  const navigate = useNavigate()

    const [users, setUser] = useState([]);

    let response
    let user
    let data = async()=> {
        response = await axios.get('/alogin/fetch')
        if(response.status === 200) {
            user = response.data
            setUser(user);
        }
    }
    useEffect( ()=> {
        data()
    },[users])

let deletee = async (id,event)=> {
  event.preventDefault()
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then(async(willDelete) => {
    if (willDelete) {
      await axios.post('/alogin/delete', {id})
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });

}

let edit = async (id,event)=> {
  event.preventDefault()
  const response = await axios.get(`/alogin/onedata/${id}`)
  let oneuserdata = response.data.data
  setUserdata(oneuserdata)
  navigate('/edituser')
}




  return (

      <div>

  
        <Anavbar/>
 

        <Table striped bordered hover className='mt-5 mb-5 container text-center text-wrap'>
  <thead>
    <tr>
      <th>SI NO</th>
      <th>ID</th>
      <th>USER NAME</th>
      <th>EMAIL</th>
      <th>EDIT</th>
      <th>DELETE</th>
    </tr>
  </thead>
  <tbody>
  {users.map((users, index) => {
      return (
    <tr className='text-wrap'>
      <td>{index +1}</td>
      <td>{users._id}</td>
      <td>{users.username}</td>
      <td>{users.email}</td>
      <td><button onClick={(e)=>edit(users._id,e)}>EDIT</button></td>
      <td><button  onClick={(e)=>deletee(users._id,e)}>DELETE</button></td>
    </tr>)

    }
    
     )
    
     }
  </tbody>
</Table>
        <Footer/>
    </div>
  )
}


export default Userdata