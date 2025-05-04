import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvDetails, fetchTvrecommendations } from "../store/tvSlice";
import TvCard from "../components/TvCard";

function DetailTv() {
  const dispatch = useDispatch();
  const tvDetails = useSelector((state) => state.TV.tvDetails);
  const recommendations = useSelector((state) => state.TV.tvrecommendations);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      dispatch(fetchTvDetails(id)),
      dispatch(fetchTvrecommendations(id)),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, id]);

  const seasons = tvDetails.seasons || [];

  if (isLoading) {
    return (
      <Container fluid className="bg-dark text-light py-5 text-center">
        <div className="d-flex flex-column align-items-center">
          <div className="spinner-border text-light" style={{ width: "4rem", height: "4rem" }} role="status"></div>
          <p className="mt-3 fs-4">Đang tải dữ liệu chương trình truyền hình...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="bg-dark text-light py-4">
      {/* Header */}
      <Container>
        <Row>
          <Col md={3}>
            <Card className="bg-dark text-light border-0">
              <Card.Img
                src={`https://image.tmdb.org/t/p/original${tvDetails.poster_path}`}
                alt="TV Poster"
              />
            </Card>
          </Col>
          <Col md={9}>
            <h2>{tvDetails.name}</h2>
            <p>
              <strong>Episode run time:</strong> {tvDetails.episode_run_time + "m"} <br />
              <strong>First air date:</strong> {tvDetails.first_air_date} <br />
              <strong>Country:</strong> {tvDetails.origin_country}
            </p>
            <p>{tvDetails.overview}</p>
          </Col>
        </Row>
      </Container>

      {/* Seasons */}
      <Container className="mt-5">
        <div className="d-flex justify-content-between mb-4">
          <h3>Television Seasons</h3>
          <Button>
            <Link to={`/tv-details/${id}/season-list`} className="text-black text-decoration-none">
              View More
            </Link>
          </Button>
        </div>
        <Row>
          {seasons.slice(0, 6).map((cast) => (
            <Col xs={12} sm={6} md={4} lg={2} className="mb-4" key={cast.id}>
              <Link to={`/tv-details/${id}/season/${cast.season_number}`} className="nav-link text-white h-100">
                <Card className="movie-card position-relative text-white h-100 d-flex flex-column">
                  <Card.Img
                    src={cast.poster_path
                      ? `https://image.tmdb.org/t/p/original${cast.poster_path}`
                      : `https://image.tmdb.org/t/p/original${tvDetails.poster_path}`}
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

      {/* Recommendations */}
      <Container className="mt-5">
        <h3>You May Also Like...</h3>
        <Row>
          {recommendations.map((movie, index) => (
            <TvCard key={index} movie={movie} />
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default DetailTv;
