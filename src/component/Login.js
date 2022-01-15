
import { Link, useHistory } from "react-router-dom";
import React, {useState,useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Navber from './Navber.js';
function Login(){
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token' )){
            history.push('/bloglists');
        }
        
    }, [])
    
    const [loginInput, setLogin] = useState({
        email: '',
        password:'',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value })
    }
    const saveLogin = (e) => {
       
        e.preventDefault();
        
        const data = {
            email:loginInput.email,
            password:loginInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
       
        axios.post(`/api/login`, data).then(res => {

            if(res.data.status === 200)
            {

                localStorage.setItem('token',res.data.token )
                localStorage.setItem('name',res.data.name )
                swal("Success!",res.data.message,"success");
                setLogin({
                    email: '',
                    password: '',
                    error_list: [],
                });
                history.push("/bloglists");
            }
            else if(res.data.status === 401)
            {
                swal("Warning!",res.data.message,"warning");
            }else{
                setLogin({...loginInput, error_list: res.data.validate_err });
            }
        });
    });
    }




    return (
        <div>
              <Navber/>
        
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form  onSubmit={saveLogin} >
                                    <div className="form-group mb-3">
                                        <label>Email</label>
                                        <input type="email" name="email" onChange={handleInput} value={loginInput.email}  className="form-control"/>
                                        <span className="text-danger">{loginInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={loginInput.password}  className="form-control" />
                                        <span className="text-danger">{loginInput.error_list.password}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login