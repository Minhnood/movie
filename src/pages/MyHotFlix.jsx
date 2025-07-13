import { Container, Row, Col, Card, Table, Button, Nav, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { fetchTopRated } from "../store/movieSlice";
import { useEffect } from "react";
import { fetchTvtopRated } from "../store/tvSlice";

function MyHotFlix() {
    const currentUser = useSelector((state) => state.USER.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ListtopRated = useSelector((state) => state.MOVIE.topRated);
    const tvTtopRated = useSelector((state) => state.TV.tvTtopRated);
    const listFavourite = useSelector((state) => state.MOVIE.listFavourite);
    const listTvFavourite = useSelector((state) => state.TV.listTvFavourite);

    useEffect(() => {
        dispatch(fetchTvtopRated());
        dispatch(fetchTopRated(1));
    }, []);

    function handleLogout(e) {
        e.preventDefault();
        dispatch(logout());
        navigate("/login");
    }

    function movieCard() {
        
    }

    return (
        <Container fluid className="bg-dark text-light py-5 px-3">
            <Container>
                <h2 className="mb-4">My HotFlix</h2>
                {currentUser && (
                    <>
                        <Row className="mb-4">
                            <Col md={6} className="d-flex align-items-center">
                                <div>
                                    <h5>{currentUser.username}</h5>
                                    <p>HOTFLIX ID: {currentUser.id}</p>
                                </div>
                            </Col>
                            <Col md={6} className="text-end">
                                <Button variant="outline-warning" onClick={handleLogout}>
                                    LOGOUT
                                </Button>
                            </Col>
                        </Row>

                        <Tab.Container defaultActiveKey="profile">
                            <Nav variant="tabs" className="mb-4">
                                <Nav.Item>
                                    <Nav.Link eventKey="profile">PROFILE</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="favorites">FAVORITES</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="settings">SETTINGS</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <Tab.Content>
                                <Tab.Pane eventKey="profile">
                                    <Row>
                                        <Col md={6}>
                                            <h5>Top Rated Movies</h5>
                                            <Table striped bordered hover variant="dark">
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Category</th>
                                                        <th>Rating</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {ListtopRated.slice(0, 5).map((movie, index) => (
                                                        <tr key={movie.id || index} onClick={() => navigate(`/detail-movie/${movie.id}`)}>
                                                            <td>{movie.title || movie.name}</td>
                                                            <td>{movie.media_type || 'Movie'}</td>
                                                            <td>{(Math.floor(movie.vote_average * 10) / 10).toFixed(1)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                        <Col md={6}>
                                            <h5>Top Rated TV Series</h5>
                                            <Table striped bordered hover variant="dark">
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Category</th>
                                                        <th>Rating</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tvTtopRated.slice(0, 5).map((movie, index) => (
                                                        <tr key={movie.id || index} onClick={() => navigate(`/tv/${movie.id}`)}>
                                                            <td>{movie.title || movie.name}</td>
                                                            <td>{movie.media_type || 'TV'}</td>
                                                            <td>{(Math.floor(movie.vote_average * 10) / 10).toFixed(1)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Tab.Pane>

                                <Tab.Pane eventKey="favorites">
                                    <Row>
                                        <Col md={6}>
                                            <h5>Movies you liked</h5>
                                            <Table striped bordered hover variant="dark">
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Category</th>
                                                        <th>Rating</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listFavourite.map((movie, index) => (
                                                        <tr key={movie.id || index} onClick={() => navigate(`/detail-movie/${movie.id}`)}>
                                                            <td>{movie.title || movie.name}</td>
                                                            <td>{movie.media_type || 'Movie'}</td>
                                                            <td>{(Math.floor(movie.vote_average * 10) / 10).toFixed(1)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                        <Col md={6}>
                                            <h5>TV you liked</h5>
                                            <Table striped bordered hover variant="dark">
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Category</th>
                                                        <th>Rating</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listTvFavourite.slice(0, 5).map((movie, index) => (
                                                        <tr key={movie.id || index} onClick={() => navigate(`/tv/${movie.id}`)}>
                                                            <td>{movie.title || movie.name}</td>
                                                            <td>{movie.media_type || 'TV'}</td>
                                                            <td>{(Math.floor(movie.vote_average * 10) / 10).toFixed(1)}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </Tab.Pane>

                                <Tab.Pane eventKey="settings">
                                    <Card bg="secondary" text="light" className="p-3">
                                        <Card.Body>
                                            <Card.Title>Settings</Card.Title>
                                            <Card.Text>Coming soon...</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </>
                )}
            </Container>
        </Container>
    );
}

export default MyHotFlix;
