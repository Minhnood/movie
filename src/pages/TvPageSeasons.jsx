import { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchTvDetails } from "../store/tvSlice";

function TvPageSeasons() {
    const dispatch = useDispatch();
    const tvDetails = useSelector((state) => state.TV.tvDetails);
    const tvDetailsSeasons = useSelector((state) => state.TV.tvDetailsSeasons);
    console.log(tvDetailsSeasons);
    

    const { id } = useParams();
    useEffect(() => {
        dispatch(fetchTvDetails(id));
    }, [dispatch]);

    return (
        <Container fluid className="bg-dark text-light py-5 px-3">
            <Container>
                <h2 className="mb-4">Popular Tv</h2>
                <Row>
                    {tvDetailsSeasons.map((cast, index) => (
                        <Col xs={12} sm={6} md={4} lg={2} className="mb-4" key={cast.id}>
                            <Link to={`/tv-details/${id}/season/${cast.season_number}`} className="nav-link text-white h-100">
                                <Card className="movie-card position-relative text-white h-100 d-flex flex-column">
                                    <Card.Img
                                        src={cast.poster_path ? `https://image.tmdb.org/t/p/original${cast.poster_path}` : `https://image.tmdb.org/t/p/original${tvDetails.poster_path}`}
                                        className="movie-img"
                                    />
                                    <Card.Body className="text-center d-flex flex-column">
                                        <Card.Title className="fw-bold text-dark fs-4">
                                            {cast.name}
                                        </Card.Title>
                                        <Card.Title className="text-dark fs-6 mt-auto">
                                            {cast.air_date}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}

export default TvPageSeasons;
