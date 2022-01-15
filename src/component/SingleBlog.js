import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Navber from './Navber.js';
function SingleBlog(props) {

    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const slug = props.match.params.slug;
        axios.get(`/api/single-blog/${slug} `).then(res=>{
            if(res.data.status === 200)
            {
                setBlogs(res.data.singleblog)
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/');
            }
        });

    }, [props.match.params.slug]);

    

    if(loading)
    {
        return <h4>Loading Blog Data...</h4>
    }
    
    var Author =   localStorage.getItem('name' );
    return (
        <div>
           <Navber/>
                
                        <div className="py-3  bg-warning">
                            <div className=" container ">
                                <h4>Single 
                                   Blog Post
                                    <Link to={'/'} className="btn btn-success btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            </div>
                            <div className="container py-3">
                            <div className=' card col-md-12'>
                    <div className='card'> 
                    
                     <img src={ `http://127.0.0.1:8000/${blogs.image}`} width='100%' height= '300px' />
                     
                    </div>
                    <div className='card-body'> 
                     {blogs.title} 
                     <p>BlogSlug: _{blogs.slug}</p>
                     <p>created by: {Author} </p>
                     <div>{blogs.body}</div>
                    </div>
                     
                </div>
                          
                            </div>
                        
                    </div>
                
            
    );

}

export default SingleBlog;