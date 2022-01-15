
import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navber from './Navber.js';

function AddBlog() {

    const history = useHistory();
    const [blogInput, setBlog] = useState({
        title: '',
        slug: '',
        body:'',
        status:'',
    });

   
    const [errorlist, setError] = useState([]);
    const [inputImage, setImage] = useState([]);

    const handleImage = (e) => {
        setImage({image: e.target.files[0] });
    }
    const handleInput = (e) => {
        e.persist();
        setBlog({...blogInput, [e.target.name]: e.target.value })
    }

    const saveBlog = (e) => {
        e.preventDefault();
        
        const formData = new FormData();

        formData.append('title' , blogInput.title);
        formData.append('slug' , blogInput.slug);
        formData.append('body' , blogInput.body);
        formData.append('status' , blogInput.status);
        formData.append('image' , inputImage.image);
        
        
        axios.post(`/api/add-blog`,formData).then(res => {

            if(res.data.status === 200)
            {
                setError('');
                swal("Success!",res.data.message,"success");
                setBlog({
                    litle: '',
                    slug: '',
                    body: '',
                    error_list: [],
                });
                history.push('/bloglists');
            }
            else if(res.data.status === 422)
            {
                setError(res.data.validate_err );
            }
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
                                <h4>Add Blog
                                    <Link to={'/bloglists'} className="btn btn-danger btn-sm float-end"> Bloglists</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={saveBlog} encType='multipart/form-data' >
                        
                                    <div className="form-group mb-3">
                                        <label>Title</label>
                                        <input type="text" name="title" onChange={handleInput} value={blogInput.title}  className="form-control" />
                                        <span className="text-danger">{errorlist.title}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Slug</label>
                                        <input type="text" name="slug" onChange={handleInput} value={blogInput.slug}  className="form-control" />
                                        <span className="text-danger">{errorlist.slug}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Body</label>
                                        <input type="text" name="body" onChange={handleInput} value={blogInput.body}  className="form-control" />
                                        <span className="text-danger">{errorlist.body}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                        <span className="text-danger">{errorlist.image}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className=" mr-3">Status</label>
                                        <input type="checkbox" name="status" onChange={handleInput} value={blogInput.status} />
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save Blog</button>
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

export default AddBlog;