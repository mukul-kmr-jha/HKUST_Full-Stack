import React , { Component } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';

class DishDetail extends Component{

    constructor(props){
        super(props);
    }

    renderDish(dish){
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg bottom src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
           
    }

    renderComments(dish){
        if (dish.comments != null)
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments </h4>
                    <hr />
                    <ul style={{ listStyle: 'none' }}>
                        {dish.comments.map((comment) => {
                            return (<li>{comment.comment} <br /> -- {comment.author}, {comment.date.slice(0,10)} <br /><br /> </li>)

                        })
                        }
                    </ul>
                </div>

            );   
    }

    render(){
        if (this.props.dish != null)
            return(
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.dish)}
                </div>     
            );
        else 
            return ( <div></div> );     
         
    };
}

export default DishDetail;