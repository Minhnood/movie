import React, { useEffect } from "react";
import { Container, Row, Col, Card, Badge, ListGroup, Image } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCredits, fetchDetailsCredits, fetchMovieCredits } from "../store/movieSlice";
import { FaMapMarkerAlt, FaBirthdayCake, FaVenusMars, FaStar } from "react-icons/fa";

function ActorPage() {
  const dispatch = useDispatch();
  const detailsCredits = useSelector((state) => state.MOVIE.detailsCredits);
  const Credits = useSelector((state) => state.MOVIE.moviesActed);
  const CreditsCrew = useSelector((state) => state.MOVIE.filmsMade);

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchDetailsCredits(id));
    dispatch(fetchMovieCredits(id));
  }, [dispatch, id]);

  let gender = "Not specified";
  if (detailsCredits.gender === 1) gender = "Female";
  else if (detailsCredits.gender === 2) gender = "Male";
  else if (detailsCredits.gender === 3) gender = "Non-binary";

  function getBorderColor(score) {
    if (score >= 70) return "#21d07a";
    if (score >= 50) return "#d2d531";
    return "#db2360";
  }

  const popularityScore = Math.floor(detailsCredits.popularity * 10);
  const popularityColor = getBorderColor(popularityScore);
  const popularityDisplay = (popularityScore / 10).toFixed(1);

  return (
    <Container fluid className="bg-dark text-light py-5">
      <Container>
        <Row className="align-items-start">
          <Col md={3} className="mb-4 mb-md-0">
            <Card className="bg-dark text-light border-0 shadow-sm">
              <Card.Img
                variant="top"
                src={
                  detailsCredits.profile_path
                    ? `https://image.tmdb.org/t/p/w500${detailsCredits.profile_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={detailsCredits.name}
                style={{ borderRadius: "12px" }}
              />
            </Card>
          </Col>
          <Col md={9}>
            <h2 className="mb-3">{detailsCredits.name}</h2>
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <p className="mb-2">
                  <FaVenusMars className="me-2" />
                  <strong>Gender:</strong> {gender}
                </p>
                <p className="mb-2">
                  <FaBirthdayCake className="me-2" />
                  <strong>Birthday:</strong> {detailsCredits.birthday || "Unknown"}
                </p>
              </Col>
              <Col xs={12} md={6}>
                <p className="mb-2">
                  <FaMapMarkerAlt className="me-2" />
                  <strong>Place of Birth:</strong> {detailsCredits.place_of_birth || "Unknown"}
                </p>
                <p className="mb-2">
                  <FaStar className="me-2" />
                  <strong>Popularity:</strong>{" "}
                  <Badge
                    style={{
                      backgroundColor: "#0d1117",
                      border: `2px solid ${popularityColor}`,
                      color: "#fff",
                      padding: "5px 10px",
                      fontSize: "1rem",
                    }}
                  >
                    {popularityDisplay}
                  </Badge>
                </p>
              </Col>
            </Row>
            <h5>Biography</h5>
            <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
              {detailsCredits.biography || "No biography available."}
            </p>
          </Col>
          <Row>
            <Col md={6}>
              <h5> Movies acted ({Credits.length})</h5>
              <ListGroup variant="flush">
                {Credits.map((actor, index) => (
                  <ListGroup.Item key={index} className="bg-dark text-white">
                    <Link to={`/DetailMovie/${actor.id}`} className="nav-link">
                      <Row className='d-flex align-items-center'>
                        <Col xs={2}>
                          <Image
                            src={`https://image.tmdb.org/t/p/original${actor.backdrop_path}`}
                            style={{ width: 100, height: 130}}
                            className="rounded-2"
                          />
                        </Col>
                        <Col>
                          <strong>{actor.title}</strong><br />
                          <strong>Release date: </strong>{actor.release_date}<br />
                        </Col>
                      </Row>
                    </Link>

                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>

            <Col md={6}>
              <h5>Films made ({CreditsCrew.length})</h5>
              <ListGroup variant="flush">
                {CreditsCrew.map((member, index) => (
                  <ListGroup.Item key={index} className="bg-dark text-white">
                  <Link to={`/DetailMovie/${member.id}`} className="nav-link">
                    <Row className='d-flex align-items-center'>
                      <Col xs={2}>
                        <Image
                          src={`https://image.tmdb.org/t/p/original${member.backdrop_path}`}
                          style={{ width: 100, height: 130}}
                          className="rounded-2"
                        />
                      </Col>
                      <Col>
                      <strong>{member.title}</strong><br />
                      <strong>Release date: </strong>{member.release_date}<br />
                      </Col>
                    </Row>
                  </Link>
                </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Row>
      </Container>
    </Container>
  );
}

export default ActorPage;
