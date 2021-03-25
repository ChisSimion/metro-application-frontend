import Product from "./product/Product";
import "./ProductContainer.scss";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class ProductContainer extends React.Component {
    render() {
        return (
            <>
                <Row>
                    <Col>
                        <h2>Available products</h2>
                    </Col>
                </Row>
                <Row>
                    {this.props.products.map(product => (
                        <Product key={product.id}
                                 id={product.id}
                                 name={product.name}
                                 description={product.description}
                                 price={product.price}
                                 image={product.image}/>
                    ))}
                </Row>
            </>
        )
    }
}

export default ProductContainer;
