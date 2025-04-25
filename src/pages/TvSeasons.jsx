import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvDetails, fetchTvDetailsSeason, fetchTvrecommendations } from "../store/tvSlice";
import TvCard from "../components/TvCard";

function TvSeasons() {
  const dispatch = useDispatch();
  const tvDetails = useSelector((state) => state.TV.tvDetailsSeason);
  const { id, season } = useParams();
  const [searchParams] = useSearchParams();
  
  const data = { id, season}

  useEffect(() => {
    dispatch(fetchTvDetailsSeason(data));
  }, [dispatch, id]);

  const episodes = tvDetails.episodes || [];

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
              <strong>Air date:</strong> {tvDetails.air_date} <br />
            </p>
            <p>
              {tvDetails.overview}
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <Row>
          {episodes.slice(0, 6).map((cast, index) => (
            <Col xs={12} sm={6} md={4} lg={2} className="mb-4" key={cast.id}>
              <Link to={`/tv-details/${id}/${season}/episode-list`} className="nav-link text-white">
                <Card className="movie-card position-relative text-white h-100 d-flex flex-column">
                  <Card.Body className="text-center d-flex flex-column">
                    <Card.Img
                      src={`https://image.tmdb.org/t/p/original${cast.still_path}`}
                      className="movie-img"
                    />
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

export default TvSeasons;
