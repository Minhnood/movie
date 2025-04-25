import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvDetailsEpisodeId, fetchTvDetailsSeason } from "../store/tvSlice";
import EpisodeCard from "../components/EpisodeCard";
import EpisodeDetail from "../components/EpisodeDetail";

function TvEpisodes() {
  const dispatch = useDispatch();
  const tvDetails = useSelector((state) => state.TV.tvDetailsSeason);
  // const episodes = useSelector((state) => state.TV.tvDetailsEpisodeIds);
  // tvDetailsEpisodeIds
  const { id, season, episode } = useParams();
  const [searchParams] = useSearchParams();

  console.log(tvDetails);

  const data = { id, season, episode };

  const episodes = tvDetails.episodes || [];
  useEffect(() => {
    dispatch(fetchTvDetailsSeason({ id: data.id, season: data.season }));
    dispatch(fetchTvDetailsEpisodeId(data));
  }, [dispatch, id, season]);

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
        {episodes.map((ep) => (
          <div key={ep.id}>
            <EpisodeCard episode={ep} />

            {episode === ep.episode_number?.toString() && (
              <EpisodeDetail episode={ep} />
            )}
          </div>
        ))}


      </Container>
    </Container>
  );
}

export default TvEpisodes;
