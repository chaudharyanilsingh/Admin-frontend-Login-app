import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Row,
    Col
  } from "reactstrap";
  
import { Form, Button, InputGroup, FormControl} from 'react-bootstrap';
import Axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import './AddQuestion.css';


class ShowQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questions : [],
            Error:null,
            userGmail:'',
            answersByUser:[],
            showAnswer:false

        
        }  
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        }); 
         
    }
    componentDidMount(){ 
        
        const url=`${API_BASE_URL}/questions/show/all`;
        Axios.get(url,{ headers: {"Authorization" : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`} })
        .then(response => {
            console.log(response.data);
            this.setState({
                questions:response.data
            })
            
          })
          .catch(error => {
            console.log(error);
            this.setState({
              Error:error.message
             
            })
          })
        }

        findAnswerByUserGmail(){
      
          const url=`${API_BASE_URL}/admin/findAnswerByUser?userGmail=${this.state.userGmail}`;
        Axios.get(url,{ headers: {"Authorization" : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`} })
        .then(response => {
            this.setState({
              answersByUser:response.data,
              showAnswer:true

            })
            console.log("answerbyuser"+this.state.answersByUser);
            
          })
          .catch(error => {
            console.log(error);
            this.setState({
              Error:error.message
             
            })
          })
        

        }
        findAnswerByQuestion(question){
      
          const url=`${API_BASE_URL}/admin/findAnswerByQuestion`;
        Axios.post(url,question,{ headers: {"Authorization" : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`} })
        .then(response => {

            console.log(response.data);
            this.setState({
              answersByUser:response.data,
              showAnswer:true

            })
            console.log("answerbyuser"+this.state.answersByUser);
            
          })
          .catch(error => {
            console.log(error);
            this.setState({
              Error:error.message
             
            })
          })
        

        }


    render() {
        const { Error, questions,answersByUser} = this.state;
        if(Error) {
            return (
              <div>Error: {Error}</div>
            )
          }
        return (
        <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">ALL Questions</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                  <tr>
                <th>id</th>
                <th>Questiion</th>
                
              </tr>
                  </thead>
                  <tbody>
                  {questions.map(questions => (
                       <tr key={questions.id}>
                          <td>{questions.id}</td>
                          <td>{questions.question}</td>
                          <Button onClick={()=>this.findAnswerByQuestion(questions)}>Show All Answers</Button>
                          
                        </tr>
                   ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
          </Row>
          <Card>
              <CardHeader>
                <CardTitle tag="h4">Find Answers By user-id   
                </CardTitle>
                <CardBody>
                <Col md={6}>
                <InputGroup className="mb-3">
                                            <Form.Control name="userGmail" placeholder="enter user gmail-id" value={this.state.userGmail} onChange={this.handleInputChange} as="textarea" rows="1" />
                                            <InputGroup.Append>
                                                <Button onClick={()=>this.findAnswerByUserGmail()}>Button</Button>
                                            </InputGroup.Append>
                 </InputGroup>
                </Col>
                </CardBody>
              </CardHeader>
            </Card>
            {
              this.state.showAnswer?
              <Card>
              <CardHeader>
                <CardTitle tag="h4">Answers</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                  <tr>
                <th>User Gmail Id</th>
                <th>question</th>
                <th>answer</th>
                <th>Date of Answer</th>
                
              </tr>
                  </thead>
                  <tbody>
                  {answersByUser.map(answersByUser => (
                       <tr key={answersByUser.id}>
                          <td>{answersByUser.userName}</td>
                          <td>{answersByUser.questions.question}</td>
                          <td>{answersByUser.answer}</td>
                          <td>{answersByUser.createdDate}</td>
                        </tr>
                   ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>:
            null
            }
      </div>
        );
    }
}

export default ShowQuestion;
