import React from 'react'
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Navber() {
  const history = useHistory();
  const logoutSubmit =(e)=>{
  e.preventDefault();

  axios.post(`/api/logout`).then(res => {

    if(res.data.status === 200)
    {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
        swal("Success!",res.data.message,"success");
        history.push('/login');
    }
  })

  }


  var AuthButton = "";
  if (!localStorage.getItem('token' )) {
    AuthButton = (
     <li className="nav-item">
     <Link className="btn btn-primary btn-sm text-white" to="/login">Login</Link>
   </li>
    );
  } else{
   AuthButton = (
     <ul  className="navbar-nav ms-auto mb-2 mb-lg-0">
     <li className="nav-item">
     <Link className="nav-link" to="/bloglists">Bloglists</Link>
   </li>
   <li className="nav-item">
     <Link className="nav-link" to="/add-blog">Add Blog</Link>
   </li>
   <li className="nav-item">
     <button type='button' className="nav-link btn btn-danger btn-sm text-white" onClick={logoutSubmit}>Logout</button>
   </li>
   </ul>
     );
  }
  return(
    <div className="pb-5">
        <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
        <div className="container">
        <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
  
              { AuthButton} 
            </ul>
          </div>
        </div>
      </nav>
        </div>
    )
}

export default Navber