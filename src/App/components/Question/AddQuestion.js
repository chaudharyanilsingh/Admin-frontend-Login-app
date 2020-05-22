import React from 'react';
import {Row, Col, Card, Form, Button, InputGroup, FormControl, DropdownButton, Dropdown} from 'react-bootstrap';
import Aux from '../../../hoc/_Aux';
import Axios from 'axios'
import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import './AddQuestion.css';
import Alert from 'react-s-alert'


class AddQuestion extends React.Component {
    constructor(){
        super();
        this.state={
            question:'',
            questionType:'',
            option1:'',
            option2:'',
            option3:'',
            option4:'',
        
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : inputValue
        }); 
         
    }
    
    handleSubmit(event) {

        const QuestionOptions={
            option1:this.state.option1,
            option2:this.state.option2,
            option3:this.state.option3,
            option4:this.state.option4
        }
        const questionRespone={
            question:this.state.question,
            questionType:this.state.questionType,
            userQuestionOptions:QuestionOptions
        }
        event.preventDefault();  
        const url=`${API_BASE_URL}/questions/add`;
        Axios.post(url,questionRespone,{ headers: {"Authorization" : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`} })
        .then(res => {

            Alert.success("Question successfully saved");
            this.props.history.push("/question/show");
            
          })
          .catch(err => {
              Alert.error("something wrong happens   ---->"+err.message);
          })
        }


    render() {

     return (
            <Aux>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Add a Question with Type</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <hr/>
                                <Row>
                                    <Col md={10}>
                                        <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Insert Question</Form.Label>
                                            <Form.Control name="question"  value={this.state.question} onChange={this.handleInputChange} as="textarea" rows="4" />
                                            
                                        </Form.Group>

                                        
                                         {this.state.questionType==='CheckBox'?
                                         <Row>
                                         <Col>
                                             <Card>
                                                 <Card.Header>
                                                     <Card.Title as="h5">Enter options for question</Card.Title>
                                                 </Card.Header>
                                                 <Card.Body>
                                                     
                                                     <Row>
                                                         <Col md={6}>
                                                             <Form>
                                                                 <Form.Group controlId="formBasicEmail">
                                                                     <Form.Label>Enter Option 1</Form.Label>
                                                                     <Form.Control name="option1"  value={this.state.option1} onChange={this.handleInputChange}  />
                                                                 </Form.Group>
                                                                 <Form.Group controlId="formBasicEmail">
                                                                     <Form.Label>Enter Option 2</Form.Label>
                                                                     <Form.Control name="option2"  value={this.state.option2} onChange={this.handleInputChange}  />
                                                                 </Form.Group>
                                                                 <Form.Group controlId="formBasicEmail">
                                                                     <Form.Label>Enter Option 3</Form.Label>
                                                                     <Form.Control name="option3"  value={this.state.option3} onChange={this.handleInputChange}  />
                                                                 </Form.Group>
                                                                 <Form.Group controlId="formBasicEmail">
                                                                     <Form.Label>Enter Option 4</Form.Label>
                                                                     <Form.Control name="option4"  value={this.state.option4} onChange={this.handleInputChange} />
                                                                 </Form.Group>
                     
                                                             </Form>
                                                         </Col>
                                                        
                                                     </Row>
                                                    </Card.Body>
                                             </Card>
                                         </Col>
                                     </Row>
                                         :null}


                                            <Button variant="primary" type="submit">
                                                Submit
                                            </Button>
                                        </Form>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group controlId="exampleForm.ControlSelect1">
                                            <Form.Label>type of Question</Form.Label>
                                            <Form.Control as="select" className="mt-4 col-md-8 col-offset-4" name="questionType"  value={this.state.questionType} onChange={this.handleInputChange} >
                                                <option>Text</option>
                                                <option>CheckBox</option>

                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                               
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </Aux>
            );
    }
    
}

export default AddQuestion;
