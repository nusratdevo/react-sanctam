import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navber from './Navber.js';

function BlogList() {

    const [loading, setLoading] = useState(true);
    const [blogInput, setBlogs] = useState([]);

    useEffect(() => {

        axios.get(`/api/blogs`).then(res=>{
            if(res.status === 200)
            {
                setBlogs(res.data.bloglists)
                setLoading(false);
            }
        });

    }, []);

    const deleteBlog = (e, id) => {
        e.preventDefault();
        
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-blog/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal("Deleted!",res.data.message,"success");
                thisClicked.closest("tr").remove();
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                thisClicked.innerText = "Delete";
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Blogs Data...</h4>
    }
    else
    {
        var blog_HTMLTABLE = "";
       
        blog_HTMLTABLE = blogInput.map( (item, index) => {
            return (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                    <td> <img src={ `http://127.0.0.1:8000/${item.image}`} width='150px' /></td>
                    <td>
                        <Link to={`edit-blog/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteBlog(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });
    }

    return (
        <div>
              <Navber/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>BlogList
                                    <Link to={'/add-blog'} className="btn btn-primary btn-sm float-end"> Add</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Litle</th>
                                            <th>Body</th>
                                            <th>Image</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blog_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default BlogList;