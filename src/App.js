
import Navber from './component/Navber.js';
import Home from './component/Home.js';
import AddBlog from './component/AddBlog.js'; 
import BlogList from './component/BlogList.js'; 
import EditBlog from './component/EditBlog.js';
import SingleBlog from './component/SingleBlog.js';
import Login from './component/Login.js';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import Protected from './Protected.js';
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type']= 'application/json';
axios.defaults.headers.post['Acccept']= 'application/json';
axios.defaults.withCredentials= 'true';
axios.interceptors.request.use(function(config){
    const token = localStorage.getItem('token' );
    config.headers.Authorization = token? `Bearer  ${token}` : '';
    return config;

});

function App() {
    return ( 
    <div className = "App" >
       
        <Router>
        
       <Switch>
       <Route exact path="/" component={Home} />
  {/* <Route path="/login" component={Login} /> */}
  <Route path="/login">
      {  localStorage.getItem('token') ? <Redirect to='/bloglists' />: <Login/>}
  </Route>

  
  <Route path="/bloglists"> <Protected  component={BlogList} />  </Route>
  <Route path="/add-blog"> <Protected  component={AddBlog} />  </Route>
  <Route path="/edit-blog/:id" component={EditBlog} />
  <Route path="/single-blog/:slug" component={SingleBlog} />

           </Switch>
         </Router>
    </div>
    );
}

export default App;