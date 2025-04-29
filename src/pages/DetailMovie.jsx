import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsBookmark } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {
  fetchCredits,
  fetchDetailsMovie,
  fetchrecommendations,
  postFavourite,
} from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";

function DetailMovie() {
  const dispatch = useDispatch();
  const detailMovie = useSelector((state) => state.MOVIE.detailMovie);
  const recommendations = useSelector((state) => state.MOVIE.recommendations);
  const credits = useSelector((state) => state.MOVIE.credits);
  const listFavourite = useSelector((state) => state.MOVIE.listFavourite);
  const [isLockbookmark, setIsLockbookmark] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetailsMovie(id));
    dispatch(fetchCredits(id));
    dispatch(fetchrecommendations(id));
  }, [dispatch, id]);

  const genres = detailMovie?.genres ? detailMovie.genres.map((item) => item.name) : [];

  const isFavorite = listFavourite.some((item) => item.id === Number(id));

  function addFavourite() {
    setIsLockbookmark(true);
    dispatch(
      postFavourite({
        media_type: "movie",
        media_id: Number(id),
        favorite: !isFavorite,
      })
    ).then(() => {
      setIsLockbookmark(false);
    });
  }

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
              <strong>Genres:</strong> {genres.join(", ")} <br />
              <strong>Release date:</strong> {detailMovie.release_date} <br />
              <strong>Country:</strong> {detailMovie.origin_country}
            </p>
            <p>{detailMovie.overview}</p>
            {/* Nút yêu thích */}
            <Button
              variant={isFavorite ? "success" : "outline-light"}
              className="d-flex align-items-center"
              disabled={isLockbookmark}
              onClick={addFavourite}
            >
              <BsBookmark size={24} className="me-2" />
              {isLockbookmark
                ? "Processing..."
                : isFavorite
                  ? "Added to Favorites"
                  : "Add to Favorites"}
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Actors Section */}
      <Container className="mt-5">
        <div className="d-flex justify-content-between mb-4">
          <h3>Actor In The Movie</h3>
          <Button>
            <Link
              to={`/detail-movie/${id}/cast`}
              className="text-black text-decoration-none"
            >
              View More
            </Link>
          </Button>
        </div>
        <Row>
          {credits.slice(0, 6).map((cast) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              className="mb-4"
              key={cast.id}
            >
              <Link
                to={`/person/${cast.id}`}
                className="nav-link text-white h-100"
              >
                <Card className="movie-card position-relative text-white h-100">
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
              </Link>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Recommended Movies Section */}
      <Container className="mt-5">
        <h3>You May Also Like...</h3>
        <Row>
          {recommendations.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default DetailMovie;
