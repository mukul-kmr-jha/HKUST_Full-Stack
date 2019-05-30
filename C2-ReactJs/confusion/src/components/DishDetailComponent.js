import React from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText } from 'reactstrap';


function RenderDish({ dish }) {
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

function RenderComments({ dish }) {
    if (dish.comments != null)
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments </h4>
                <hr />
                <ul className="list-unstyled">
                    {dish.comments.map((comment) => {
                        return (<li key={comment.id} >{comment.comment} <br /> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} <br /><br /> </li>)

                    })
                    }
                </ul>
            </div>

        );
}

const DishDetail =  (props) => {

        if (props.dish != null)
            return(
                <div className='container'>
                    <div className="row">
                        {RenderDish(props)}
                        {RenderComments(props)}
                    </div>     
                </div>
            );
        else 
            return ( <div></div> );     
         
}

export default DishDetail;