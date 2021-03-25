import React from "react";
import Card from "react-bootstrap/Card";
import "./Product.scss";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {findDOMNode} from "react-dom";

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.removeButton = this.removeButton.bind(this);
    }

    removeButton() {
        fetch(`http://localhost:8080/products/${this.props.id}`, {
            method: "DELETE"
        }).then(() => {
            findDOMNode(this).remove()
        });
    }

    render() {
        return (
            <Col xs={3} data-id={this.props.id} className={"mb-3"}>
                <Card className={"card-size"}>
                    <Card.Body>
                        <Card.Img variant="top" src={this.props.image} height={"300px"} />
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Subtitle>{this.props.price}</Card.Subtitle>
                        <Card.Text>
                            {this.props.description}
                        </Card.Text>
                        <Button className={"btn-sm"}
                                variant={"danger"}
                                onClick={this.removeButton}>Remove</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

export default Product;
