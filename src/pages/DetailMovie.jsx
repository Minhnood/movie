import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Tabs, Tab, Badge, Image } from "react-bootstrap";
import { BsBookmark } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import {
  fetchCredits,
  fetchDetailsMovie,
  fetchMoviReview,
  fetchrecommendations,
  postFavourite,
} from "../store/movieSlice";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { toast, ToastContainer } from "react-toastify";
import ReviewItem from "../components/ReviewItem";

function DetailMovie() {
  const dispatch = useDispatch();
  const detailMovie = useSelector((state) => state.MOVIE.detailMovie);
  const recommendations = useSelector((state) => state.MOVIE.recommendations);
  const credits = useSelector((state) => state.MOVIE.credits);
  const listFavourite = useSelector((state) => state.MOVIE.listFavourite);
  const reviewsMovi = useSelector((state) => state.MOVIE.reviewsMovi);
  const [isLockbookmark, setIsLockbookmark] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllReviews, setShowAllReviews] = useState(false);


  console.log(reviewsMovi);


  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      dispatch(fetchDetailsMovie(id)),
      dispatch(fetchCredits(id)),
      dispatch(fetchrecommendations(id)),
      dispatch(fetchMoviReview(id)),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [dispatch, id]);

  const genres = detailMovie?.genres ? detailMovie.genres.map((item) => item.name) : [];
  const isFavorite = listFavourite.some((item) => item.id === Number(id));

  function addFavourite() {
    setIsLockbookmark(true);
    toast(isFavorite ? "You dislike this movie!" : "You liked the movie!");
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

  if (isLoading) {
    return (
      <Container fluid className="bg-dark text-light py-5 text-center">
        <div className="d-flex flex-column align-items-center">
          <div className="spinner-border text-light" style={{ width: "4rem", height: "4rem" }} role="status"></div>
          <p className="mt-3 fs-4">Đang tải dữ liệu phim...</p>
        </div>
      </Container>
    );
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
              <strong>Genres:</strong> {genres.join(", ")} <br />
              <strong>Release date:</strong> {detailMovie.release_date} <br />
              <strong>Country:</strong> {detailMovie.origin_country}
            </p>
            <p>{detailMovie.overview}</p>
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
            <ToastContainer />
          </Col>
        </Row>
      </Container>
      {/* Reviews Section */}
      <Container className="mt-5">
        <h3>Review ({reviewsMovi.length})</h3>
        {(showAllReviews ? reviewsMovi : reviewsMovi.slice(0, 1)).map((cast) => (
          <ReviewItem key={cast.id} cast={cast} />
        ))}
        {reviewsMovi.length > 1 && (
          <div className="text-center mt-3">
            <Button variant="outline-light" onClick={() => setShowAllReviews(!showAllReviews)}>
              {showAllReviews ? "Rút gọn" : "Xem thêm"}
            </Button>
          </div>
        )}
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
            <Col xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4" key={cast.id} >
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
