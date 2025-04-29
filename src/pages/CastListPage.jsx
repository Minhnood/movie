import React, { useEffect } from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCredits, fetchDetailsMovie } from '../store/movieSlice';
import { Link, useParams } from 'react-router-dom';

function CastListPage() {
  const dispatch = useDispatch();
  const detailMovie = useSelector((state) => state.MOVIE.detailMovie);
  const credits = useSelector((state) => state.MOVIE.credits);
  const creditsCrew = useSelector((state) => state.MOVIE.creditsCrew);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetailsMovie(id));
    dispatch(fetchCredits(id));
  }, [dispatch, id]);

  const fallbackImage = 'https://cdn-icons-png.flaticon.com/512/149/149071.png';

  return (
    <Container fluid className="py-4">
      <Container>
        <h4 className="text-white bg-dark p-3 rounded">
          <Row className="align-items-center">
            <Col xs="auto">
              <img
                src={detailMovie.poster_path
                  ? `https://image.tmdb.org/t/p/original${detailMovie.poster_path}`
                  : fallbackImage}
                alt={detailMovie.original_title}
                style={{ width: 100, height: 150 }}
              />
            </Col>
            <Col>
              <h5 className='fs-2 text-info'>
                {detailMovie.original_title} ({detailMovie.release_date})
              </h5>
              <div className='fs-6'>{detailMovie.overview}</div>
            </Col>
          </Row>
        </h4>

        <Row>
          {/* DIỄN VIÊN */}
          <Col md={6}>
            <h5>Diễn viên ({credits.length})</h5>
            <Row>
              {credits.map((actor, index) => (
                <Col md={6} key={index} className="mb-4">
                  <ListGroup.Item className='p-0 py-2 bg-dark text-white rounded'>
                    <Link to={`/person/${actor.id}`} className="nav-link">
                      <Row className='align-items-center'>
                        <Col xs={5} className='ps-4'>
                          <Image
                            src={actor.profile_path
                              ? `https://image.tmdb.org/t/p/original${actor.profile_path}`
                              : fallbackImage}
                            className="avatar-image"
                            roundedCircle
                          />
                        </Col>
                        <Col>
                          <strong>{actor.name}</strong>
                          <div>{actor.character}</div>
                        </Col>
                      </Row>
                    </Link>
                  </ListGroup.Item>
                </Col>
              ))}
            </Row>
          </Col>

          {/* PHI HÀNH ĐOÀN */}
          <Col md={6}>
            <h5>Phi hành đoàn ({creditsCrew.length})</h5>
            <Row>
              {creditsCrew.map((member, index) => (
                <Col md={6} key={index} className="mb-4">
                  <ListGroup.Item className='p-0 py-2 bg-dark text-white rounded'>
                    <Link to={`/person/${member.id}`} className="nav-link">
                      <Row className='align-items-center'>
                        <Col xs={5} className='ps-4'>
                          <Image
                            src={member.profile_path
                              ? `https://image.tmdb.org/t/p/original${member.profile_path}`
                              : fallbackImage}
                            className="avatar-image"
                            roundedCircle
                          />
                        </Col>
                        <Col>
                          <strong>{member.name}</strong>
                          <div>{member.job}</div>
                        </Col>
                      </Row>
                    </Link>
                  </ListGroup.Item>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default CastListPage;
