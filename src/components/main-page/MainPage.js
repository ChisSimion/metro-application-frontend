import React from "react";
import Header from "../header/Header";
import ProductContainer from "../product-container/ProductContainer";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import AddProductModal from "../add-product-modal/AddProductModal";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            products: [],
            showModal: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getProducts = this.getProducts.bind(this);
    }

    componentDidMount() {
        this.getProducts();
    }

    getProducts() {
        fetch("http://localhost:8080/products")
            .then(res => res.json())
            .then(result => this.setState({
                    isLoaded: true,
                    products: result,
                }),
                () => this.setState({
                    isLoaded: true,
                }))
    }

    openModal() {
        this.setState({
            showModal: true
        });
    }

    closeModal(requestProducts) {
        this.setState({
            showModal: false,
        });

        if (requestProducts) {
            this.setState({
                isLoaded: false,
            });
            this.getProducts();
        }
    }

    render() {
        const { isLoaded, products, showModal } = this.state;

        if (!isLoaded) {
            return null;
        } else {
            return (
                <>
                    <Header/>
                    <Container fluid className={"product-container pt-2"}>
                        <ProductContainer products={products}/>
                        <Row className={"pt-2"}>
                            <Col>
                                <h3>Operations</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant={"primary btn-sm"} onClick={this.openModal}>Add product</Button>
                            </Col>
                        </Row>

                        <AddProductModal show={showModal} closeModalInParent={this.closeModal}/>
                    </Container>
                </>
            )
        }
    }
}

export default MainPage;
