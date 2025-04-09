import React from "react";
import { Container, Row, Col, Card, Pagination, Badge } from "react-bootstrap";
import { BsBookmark } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const movies = [
  { title: "The Chebod", genre: "Drama", rating: "9.1", image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" },
  { title: "Green Hell", genre: "Action, Thriller", rating: "7.5", image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" },
  { title: "Benched", genre: "Comedy", rating: "8.0", image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" },
  { title: "Whitney", genre: "Romance, Drama", rating: "6.3", image: "https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g" },
];

function Catalog() {
  return (
    <Container fluid className="bg-dark text-light py-4">
      <Container>
        <h2>Catalog</h2>
        <Row>
          {movies.map((movie, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="movie-card position-relative text-white">
                <Link to="/DetailMovie" className="nav-link text-white">
                  <div className="movie-image-container position-relative">
                    <Card.Img src={movie.image} alt={movie.title} className="movie-img" />
                    <div className="play-button position-absolute top-50 start-50 translate-middle">
                      <FaPlay size={30} color="black" />
                    </div>
                  </div>
                  <Badge className="rating-badge position-absolute top-0 start-0 m-2">
                    {movie.rating}
                  </Badge>
                  <BsBookmark className="bookmark-icon position-absolute top-0 end-0 m-2" />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold text-dark">{movie.title}</Card.Title>
                    <Card.Text className="text-warning">{movie.genre}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
       
        <Pagination className="justify-content-center">
          <Pagination.Prev />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next />
        </Pagination>

        <h2>Expected Premiere</h2>
        <Row>
          {movies.map((movie, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="movie-card position-relative text-white">
                <Link to="/DetailMovie" className="nav-link text-white">
                  <div className="movie-image-container position-relative">
                    <Card.Img src={movie.image} alt={movie.title} className="movie-img" />
                    <div className="play-button position-absolute top-50 start-50 translate-middle">
                      <FaPlay size={30} color="black" />
                    </div>
                  </div>
                  <Badge className="rating-badge position-absolute top-0 start-0 m-2">
                    {movie.rating}
                  </Badge>
                  <BsBookmark className="bookmark-icon position-absolute top-0 end-0 m-2" />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold text-dark">{movie.title}</Card.Title>
                    <Card.Text className="text-warning">{movie.genre}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Catalog;
