import React from 'react';

const SignUp1 = React.lazy(() => import('./App/components/user/signup/Signup'));
const Signin1 = React.lazy(() => import('./App/components/user/login/Login.js'));

const route = [
    { path: '/auth/signup', exact: true, name: 'Sign-up', component: SignUp1 },
    { path: '/auth/login', exact: true, name: 'Login', component: Signin1 }
];

export default route;