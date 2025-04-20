import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvDetailsEpisodeId, fetchTvrecommendations } from "../store/tvSlice";
import EpisodeCard from "../components/EpisodeCard";

function TvEpisodes() {
  const dispatch = useDispatch();
  const tvDetails = useSelector((state) => state.TV.tvDetailsEpisodeId);
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const seasonsId = searchParams.get("ids");
  const episodeId = searchParams.get("key");

  const data = { id, seasonsId, episodeId };

  useEffect(() => {
    dispatch(fetchTvrecommendations(id));
    dispatch(fetchTvDetailsEpisodeId(data));
  }, [dispatch, id, seasonsId, episodeId]);

  const episodes = tvDetails.episodes || [];

  return (
    <Container fluid className="bg-dark text-light py-4">
      {/* Header */}
      <Container>
        <Row>
          <Col md={3}>
            <Card className="bg-dark text-light border-0">
              <Card.Img
                src={`https://image.tmdb.org/t/p/original${tvDetails.poster_path}`}
                alt="Poster"
              />
            </Card>
          </Col>
          <Col md={9}>
            <h2>{tvDetails.name}</h2>
            <p>
              <strong>Episode run time:</strong> {tvDetails.episode_run_time?.[0] || 23}m<br />
              <strong>Air date:</strong> {tvDetails.air_date}
            </p>
            <p>{tvDetails.overview}</p>
          </Col>
        </Row>
      </Container>

      {/* Episode list */}
      <Container className="mt-5">
        <h4>Episodes ({episodes.length})</h4>
        {episodes.map((episode) => (
          <EpisodeCard episode={episode} key={episode.id} />
        ))}
      </Container>
    </Container>
  );
}

export default TvEpisodes;
