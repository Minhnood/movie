import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvDetails, fetchTvRecommendations } from "../store/tvSlice";
import TvCard from "../components/TvCard";

function DetailTv() {
  const dispatch = useDispatch();
  const tvDetails = useSelector((state) => state.TV.tvDetails);
  const Recommendations = useSelector((state) => state.TV.tvRecommendations);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchTvDetails(id));
    dispatch(fetchTvRecommendations(id));
  }, [dispatch, id]);

  const seasons = tvDetails.seasons || [];

  return (
    <Container fluid className="bg-dark text-light py-4">
      {/* Movie Header */}
      <Container>
        <Row>
          <Col md={3}>
            <Card className="bg-dark text-light border-0">
              <Card.Img
                src={`https://image.tmdb.org/t/p/original${tvDetails.poster_path}`}
                alt="Movie Poster"
              />
            </Card>
          </Col>
          <Col md={9}>
            <h2>{tvDetails.name}</h2>
            <p>
              <strong>Episode run time: </strong> {tvDetails.episode_run_time + "h"} <br />
              <strong>First air date:</strong> {tvDetails.first_air_date} <br />
              <strong>Country:</strong> {tvDetails.origin_country}
            </p>
            <p>
              {tvDetails.overview}
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <div className="d-flex justify-content-between mb-4"><h3>Actor In The Movie</h3>  <Button className=""><Link to={`/tvDetails/${id}/seasonlist`} className="text-black text-decoration-none">View More</Link></Button></div>
        <Row>
          {seasons.slice(0, 6).map((cast, index) => (
            <Col xs={12} sm={6} md={4} lg={2} className="mb-4" key={cast.id}>
              <Link to={`/tvDetails/${id}/season?ids=${cast.id}`} className="nav-link text-white">
                <Card className="movie-card position-relative text-white h-100 d-flex flex-column">
                  <Card.Img
                    src={`https://image.tmdb.org/t/p/original${cast.poster_path}`}
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
      {/* Recommended Movies Section */}
      <Container className="mt-5">
        <h3>You May Also Like...</h3>
        <Row>
          {Recommendations.map((movie, index) => (
            <TvCard key={index} movie={movie} />
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default DetailTv;
