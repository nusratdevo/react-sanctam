import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Navber from './Navber.js';
function Home() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {

        axios.get(`/api/all-blogs`).then(res=>{
            if(res.data.status === 200)
            {
                setBlogs(res.data.bloglists)
                setLoading(false);
            }
        });

    }, [loading]);

    

    if(loading)
    {
        return <h4>Loading Blogs Posts...</h4>
    }
    else
    {
        var blog_HTMLTABLE = "";
       
        blog_HTMLTABLE = blogs.map( (item, index) => {
            return (
                <div 
                key={index} className='card col-md-4 '>
                
                    <div className='card 0ffset-2'> 
                     <Link to= { `single-blog/${item.slug}`}> 
                     <img src={ `http://127.0.0.1:8000/${item.image}`} width='100%' height='100px' />
                     </Link>
                    </div>
                    <div className='card-body'> 
                     <Link to={ `single-blog/${item.slug}`}>
                     {item.title}
                     </Link>
                     <div> 
                     
                     { item.body.length > 100 ?
                            `${item.body.substring(0, 100)}...` : item.body  
                     }
                     
                     </div>
                    </div>
                     </div>
                
            );
        });
    }

    return (
        <div>
           <Navber/>
                
            <div className="py-3  bg-warning">
                <div className=" container ">
                    <h4>BlogList Blog Post </h4>
                  </div>
             </div>
             <div className="container py-3">
                 <div className='row '>
                 
                 {blog_HTMLTABLE}
                 </div>
                  
                 </div>
                        
        </div>
                
            
    );

}

export default Home;

