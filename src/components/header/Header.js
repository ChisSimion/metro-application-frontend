import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import logo from "../../assets/img/logo.png"
import './Header.scss';

const Header = () =>
    <Container fluid className={"header"}>
        <Row>
            <Col xs={4}>
                <img src={logo} alt="" width={120} height={60}/>
            </Col>
            <Col>
                <h1>Metro eCommerce Application</h1>
            </Col>
        </Row>
    </Container>

export default Header;
