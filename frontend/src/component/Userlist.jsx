import React,{useState,useEffect}from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Userlist = () => {

  const [users,setusers] = useState([]);

  const getUser = async () =>{
    const response = await axios.get('http://localhost:5000/users');
    setusers(response.data);
  }

  const deleteUsers = async(e) =>{
    await axios.delete(`http://localhost:5000/users/${e}`);
    getUser();
  }

  useEffect(()=>{
    getUser();
  },[])
  return (
    <div>
       <h1 className='title'>Users</h1>
      <h2 className='subtitle'>List of Users</h2>
      <Link to="/users/add" className='button is-primary mb-2'>Add New</Link>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,index)=>(         
          <tr key={user.uuid}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
            <Link to={`/users/edit/${user.uuid}`} className='button is-small is-info'>Edit</Link>  
            <button className='button is-small is-danger' onClick={()=>deleteUsers(user.uuid)}>Delete</button> 
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Userlist