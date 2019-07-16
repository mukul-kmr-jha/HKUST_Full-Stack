import React ,{ Component }from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, Modal, Row, Col, ModalHeader, Label, ModalBody, ModalFooter, Input, FormGroup }  from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderDish({ dish }) {
    return (
        <div className='col-12 col-md-5 m-1'>
            <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );

}

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            modal : false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleModal() {
        console.log(this.props);
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    handleSubmit(values){
        this.toggleModal();
        console.log(values);
        this.props.addComment(this.props.dishId, values.rating, values.author, values.message);

    }


    render(){
      
        const required = (val) => val && val.length;
        const maxLength = (len) => (val) => !(val) || (val.length <= len);
        const minLength = (len) => (val) => val && (val.length >= len);        

        return(
            <div>
                <Button outline color='secondary' onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

                       {/* <Label htmlFor="rating" >Rating</Label>
                       <InputGroup>
                       <Input placeholder="Rating" min={1} max={5} type="number" step="1" id='rating' name='rating'/>
                       </InputGroup> */}
                       <FormGroup>
                            <Label for="rating">Rating</Label>
                            <Input type="select" name="rating" id="rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                       <Label htmlFor="author" >Your Name</Label>
                        <Row className="form-group">
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Label htmlFor="message">Comment</Label>
                        <Row className="form-group">
                            <Col md={12}>
                                <Control.textarea model=".message" id="message" name="message"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                        </Row> 
                        <Button color="primary" >Submit</Button>

                    </LocalForm>
                </ModalBody>
                </Modal>

            </div>
        );
    }
}

function RenderComments({ comments, addComment, dishId }) {
    if (comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments </h4>
                <hr />
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        return (<li key={comment.id} >{comment.comment} <br /> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} <br /><br /> </li>)

                    })
                    }
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>

        );
}

const DishDetail =  (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        console.log(props);
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id}
                 />
            </div>
            </div>
        );
        }
        else 
            return ( <div></div> );     
         
}

export default DishDetail;