import React, { useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { BsBookmark } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { fetchCredits, fetchDetailsMovie, fetchRecommendations } from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

function DetailMovie() {
  const dispatch = useDispatch();
  const detailMovie = useSelector((state) => state.MOVIE.detailMovie);
  const Recommendations = useSelector((state) => state.MOVIE.Recommendations);
  const Credits = useSelector((state) => state.MOVIE.Credits);

  const { id } = useParams();

  const movies = [
    { title: "The Chebod", genre: "Drama", rating: "9.1", image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" },
    { title: "Green Hell", genre: "Action, Thriller", rating: "7.5", image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" },
    { title: "Benched", genre: "Comedy", rating: "8.0", image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" },
    { title: "Whitney", genre: "Romance, Drama", rating: "6.3", image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" },
  ];


  useEffect(() => {
    dispatch(fetchDetailsMovie(id));
    dispatch(fetchCredits(id));
    dispatch(fetchRecommendations(id));
  }, [dispatch, id]);

  const genres = detailMovie?.genres ? detailMovie.genres.map((item) => item.name) : [];

  return (
    <Container fluid className="bg-dark text-light py-4">
      {/* Movie Header */}
      <Container>
        <Row>
          <Col md={3}>
            <Card className="bg-dark text-light border-0">
              <Card.Img
                src={`https://image.tmdb.org/t/p/original${detailMovie.poster_path}`}
                alt="Movie Poster"
              />
            </Card>
          </Col>
          <Col md={9}>
            <h2>{detailMovie.original_title}</h2>
            <p>
              <strong>Director:</strong> Wes Gilligan <br />
              <strong>Genres:</strong> {genres.join(', ')} <br />
              <strong>Release date:</strong> {detailMovie.release_date} <br />
              <strong>Country:</strong> {detailMovie.origin_country}
            </p>
            <p>
              {detailMovie.overview}
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="mt-5">
        <div className="d-flex justify-content-between mb-4"><h3>Actor In The Movie</h3>  <Button className=""><Link to={`/DetailMovie/${id}/cast`} className="text-black text-decoration-none">View More</Link></Button></div>
        <Row>
          {Credits.slice(0, 6).map((cast, index) => (
            <Col xs={12} sm={6} md={4} lg={2} className="mb-4">
              <Card className="movie-card position-relative text-white h-100 d-flex flex-column">
                <Card.Img
                  src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                  className="movie-img"
                />
                <Card.Body className="text-center d-flex flex-column">
                  <Card.Title className="fw-bold text-dark fs-4">
                    {cast.original_name}
                  </Card.Title>
                  <Card.Title className="text-dark fs-6 mt-auto">
                    {cast.character}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>

          ))}
        </Row>

      </Container>
      {/* Recommended Movies Section */}
      <Container className="mt-5">
        <h3>You May Also Like...</h3>
        <Row>
          {Recommendations.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default DetailMovie;
