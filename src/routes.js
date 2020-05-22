import React from 'react';
import $ from 'jquery';
import Home from './App/components/user/Home/Home';
import UserList from './App/components/user/Service/UserList'
import Logout from './App/components/user/Logout/Logout';
import AddQuestion from './App/components/Question/AddQuestion';
import ShowQuestion from './App/components/Question/ShowQuestion';

window.jQuery = $;
window.$ = $;
global.jQuery = $;


const SignUp1 = React.lazy(() => import('./App/components/user/signup/Signup'));
const Signin1 = React.lazy(() => import('./App/components/user/login/Login.js'));

const routes = [
    { path: '/auth/signup', exact: true, name: 'Sign-up', component: SignUp1 },
    { path: '/auth/login', exact: true, name: 'Login', component: Signin1 },
    { path: '/home',exact:true,name:'Home',component:Home},
    { path: '/allusers',exact:true,name:'Userlist',component:UserList},
    { path: '/logout',exact:true,name:'Logout',component:Logout},
    { path: '/question/add',exact:true,name:'Logout',component:AddQuestion},
    { path: '/question/show',exact:true,name:'Logout',component:ShowQuestion}
];

export default routes;