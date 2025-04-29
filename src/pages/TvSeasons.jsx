import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvDetailsSeason } from "../store/tvSlice";
import EpisodeCard from "../components/EpisodeCard";
import EpisodeDetail from "../components/EpisodeDetail";

function TvSeasons() {
  const dispatch = useDispatch();
  const { id, season } = useParams();
  const [expandedEpisode, setExpandedEpisode] = useState(null);

  const tvDetails = useSelector((state) => state.TV.tvDetailsSeason);
  const episodes = tvDetails.episodes || [];

  useEffect(() => {
    dispatch(fetchTvDetailsSeason({ id, season }));
  }, [dispatch, id, season]);

  const toggleExpand = (episodeNumber) => {
    setExpandedEpisode(prev => (prev === episodeNumber ? null : episodeNumber));
  };

  return (
    <Container fluid className="bg-dark text-light py-4">
      {/* TV Show Info */}
      <Container>
        <Row>
          <Col md={3}>
            <Card className="bg-dark text-light border-0">
              <Card.Img
                src={`https://image.tmdb.org/t/p/original${tvDetails.poster_path}`}
                alt={tvDetails.name}
              />
            </Card>
          </Col>
          <Col md={9}>
            <h2>{tvDetails.name}</h2>
            <p>
              <strong>Episode run time:</strong> {tvDetails.episode_run_time?.[0]} mins <br />
              <strong>Air date:</strong> {tvDetails.air_date}
            </p>
            <p>{tvDetails.overview}</p>
          </Col>
        </Row>
      </Container>

      {/* Episode List */}
      <Container className="mt-5">
        <h4>Episodes ({episodes.length})</h4>
        {episodes.map((ep) => (
          <div key={ep.id}>
            <EpisodeCard
              episode={ep}
              onExpand={() => toggleExpand(ep.episode_number)}
              isExpanded={expandedEpisode === ep.episode_number}
            />
            {expandedEpisode === ep.episode_number && (
              <EpisodeDetail episode={ep} />
            )}
          </div>
        ))}
      </Container>
    </Container>
  );
}

export default TvSeasons;
