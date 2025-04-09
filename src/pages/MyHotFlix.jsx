import { Container, Row, Col, Card, Table, Button, Nav } from "react-bootstrap";

function MyHotFlix() {
    return (
        <Container fluid className="bg-dark text-light py-5 px-3">
            <Container>
            <h2 className="mb-4">My HotFlix</h2>
            <Row className="mb-4">
                <Col md={6} className="d-flex align-items-center">
                    <div>
                        <h5>John Doe</h5>
                        <p>HOTFLIX ID: 72123</p>
                    </div>
                </Col>
                <Col md={6} className="text-end">
                    <Button variant="outline-warning">LOGOUT</Button>
                </Col>
            </Row>
            <Nav variant="tabs" defaultActiveKey="profile" className="mb-4">
                <Nav.Item>
                    <Nav.Link eventKey="profile">PROFILE</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="subs">SUBS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="favorites">FAVORITES</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="settings">SETTINGS</Nav.Link>
                </Nav.Item>
            </Nav>
            <Row className="mb-4">
                <Col md={3}><Card className="p-3 text-center bg-secondary">Premium Plan<br /><strong>$34.99 / month</strong></Card></Col>
                <Col md={3}><Card className="p-3 text-center bg-secondary">Films Watched<br /><strong>1,678</strong></Card></Col>
                <Col md={3}><Card className="p-3 text-center bg-secondary">Your Comments<br /><strong>2,573</strong></Card></Col>
                <Col md={3}><Card className="p-3 text-center bg-secondary">Your Reviews<br /><strong>1,021</strong></Card></Col>
            </Row>
            <Row>
                <Col md={6}>
                    <h5>Movies for you</h5>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr><th>ID</th><th>Title</th><th>Category</th><th>Rating</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>241</td><td>The Lost City</td><td>Movie</td><td>9.2</td></tr>
                            <tr><td>825</td><td>Undercurrents</td><td>Movie</td><td>9.1</td></tr>
                            <tr><td>523</td><td>Tales from the Underworld</td><td>TV Series</td><td>9.0</td></tr>
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <h5>Latest reviews</h5>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr><th>ID</th><th>Item</th><th>Author</th><th>Rating</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>824</td><td>I Dream in Another Language</td><td>Eliza Josceline</td><td>7.2</td></tr>
                            <tr><td>602</td><td>Benched</td><td>Kekut</td><td>6.3</td></tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        </Container>
    );
}
export default MyHotFlix;
