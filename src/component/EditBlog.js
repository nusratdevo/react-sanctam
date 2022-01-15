
import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navber from './Navber.js';

function EditBlog(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [blogInput, setBlog] = useState({
        title: '',
        slug: '',
        body:'',
        status:'',
    } );
    const [inputImage, setImage] = useState([]);
    const [errorInput, setError] = useState([]);

    useEffect(() => {
        
        const id = props.match.params.id;
        axios.get(`/api/edit-blog/${id}`).then( res => {

            if(res.data.status === 200)
            {
                setBlog(res.data.blog);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/bloglists');
            }
        });

    }, [history]);

    const handleInput = (e) => {
        e.persist();
        setBlog({...blogInput, [e.target.name]: e.target.value });
    }

    

    const handleImage = (e) => {
        setImage({image: e.target.files[0] });
    }

    const updateBlog = (e) => {
        e.preventDefault();
        
        const id = props.match.params.id;
        // const data = blogInput;
        const formData = new FormData();

        formData.append('title' , blogInput.title);
        formData.append('slug' , blogInput.slug);
        formData.append('body' , blogInput.body);
        formData.append('status' , blogInput.status);
        formData.append('image' , inputImage.image);
        
        axios.post(`/api/update-blog/${id}`, formData).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/bloglists');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","validate_err");
                setError(res.data.validate_err);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"validate_err");
                history.push('/bloglists');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit Blog Data...</h4>
    }
    
    return (
        <div>
            <Navber/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Blog 
                                    <Link to={'/bloglists'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateBlog} >
                                <div className="form-group mb-3">
                                        <label>Title</label>
                                        <input type="text" name="title" onChange={handleInput} value={blogInput.title}  className="form-control" />
                                        <span className="text-danger">{errorInput.title}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Slug</label>
                                        <input type="text" name="slug" onChange={handleInput} value={blogInput.slug}  className="form-control" />
                                        <span className="text-danger">{errorInput.slug}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Body</label>
                                        <textarea name="body" onChange={handleInput} value={blogInput.body}  className="form-control" ></textarea>
                                        <span className="text-danger">{errorInput.body}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Image</label>
                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                        <img src={ `http://localhost:8000/${blogInput.image}`} width='50px' />
                                        <span className="text-danger">{errorInput.image}</span>
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

export default EditBlog;