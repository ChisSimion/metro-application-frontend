import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class AddProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.productAdded = this.productAdded.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);

        this.state = {
            name: "",
            description: "",
            price: "",
            image: ""
        };
    }

    handleClose() {
        this.props.closeModalInParent(false);
    }

    productAdded() {
        this.props.closeModalInParent(true);
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleFileUpload(evt) {
        this.getBase64(evt.target.files[0], (result) => {
            this.setState({
                image: result
            })
        });
    }

    addProduct() {


        fetch("http://localhost:8080/products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                image: this.state.image
            })
        }).then(() => this.productAdded(),
                error => console.log(error));

    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text"
                                          name={"name"}
                                          placeholder="Enter name"
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text"
                                          name={"description"}
                                          placeholder="Enter description"
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="text"
                                          name={"price"}
                                          placeholder="Enter price"
                                          onChange={this.handleChange}/>
                        </Form.Group>

                        <div className="mb-3">
                            <Form.File id="formcheck-api-regular">
                                <Form.File.Label>Upload image (max: 100kb and preferred height: 300px)</Form.File.Label>
                                <Form.File.Input onChange={this.handleFileUpload} name={"image"} />
                            </Form.File>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.addProduct}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddProductModal;
