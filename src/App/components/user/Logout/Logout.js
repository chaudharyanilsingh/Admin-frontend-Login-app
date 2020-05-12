import React, { Component } from 'react'
import { ACCESS_TOKEN} from '../../constants'
import Alert from 'react-s-alert'

class Logout extends React.Component{
    constructor(){
        super();
    }
componentDidMount(){
    localStorage.removeItem(ACCESS_TOKEN)
    Alert.success("you are susscessfully logout ");
    this.props.history.push("/auth/login");
}
render(){
    return<h1>hello anil</h1>
}
}
export default Logout