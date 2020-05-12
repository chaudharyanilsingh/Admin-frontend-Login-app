import React from 'react';
import { ACCESS_TOKEN, API_BASE_URL } from '../../constants';
import { request } from '../../util/APIUtils';
import Axios from 'axios';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";
import  Alert from 'react-s-alert';

const accesstoken=localStorage.getItem(ACCESS_TOKEN);
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      users : []
    }
  }

  getAllUsers(){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/all",
        method: 'GET'
    })
  .then(response=>{
    console.log(response);
    this.setState({
      
      
      users:response
    })
  })
  .catch(err=>{
    this.setState({
      error:err
    })
  })
}


ActiveHandler(id,status){
  console.log("anil is here"+id+status);
  const url=`${API_BASE_URL}/admin/changeStatus?id=${id}&status=${status}`
  Axios.get(url,{ headers: {"Authorization" : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`} })

  .catch(err=>{
    console.log(err);
    Alert.error(err.message);
  })

  

}
  componentDidMount(){
    this.getAllUsers();
    
}

 
  render() {
    const { error, users} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(

        <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">ALL Users</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                  <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
              </tr>
                  </thead>
                  <tbody>
                  {users.map(users => (
                       <tr key={users.id}>
                          <td>{users.name}</td>
                          <td>{users.email}</td>
                          <td>{users.status ? 'Active': 'Inactive'}</td>
                          <td><button onClick={()=>this.ActiveHandler(users.id,users.status)}>{users.status ? 'Inactive': 'active'}</button></td>
                       </tr>
                   ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          </Row>
      </div>




        /*<div>
          <h2>Users List</h2>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(users => (
                <tr key={users.id}>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                 </tr>
              ))}
            </tbody>
          </Table>
        </div>*/
      )
    }
  }
}

export default Users;