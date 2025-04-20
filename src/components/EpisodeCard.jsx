// components/EpisodeCard.jsx
import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function EpisodeCard({ episode }) {
  return (
    <Card className="mb-4 bg-secondary text-white p-3">
      <Row>
        <Col md={2}>
          <Card.Img
            src={
              episode.still_path
                ? `https://image.tmdb.org/t/p/w300${episode.still_path}`
                : "https://via.placeholder.com/150x84?text=No+Image"
            }
            alt={`Episode ${episode.episode_number}`}
          />
        </Col>
        <Col md={10}>
          <h5>
            {episode.episode_number}. {episode.name}
          </h5>
          <p>
            <small>{episode.air_date} • {episode.runtime || 23}m</small>
          </p>
          <p>{episode.overview || "We don't have an overview translated in English."}</p>
          {episode.guest_stars && episode.guest_stars.length > 0 && (
            <>
              <strong>Guest Stars:</strong>
              <ul>
                {episode.guest_stars.map((star) => (
                  <li key={star.id}>
                    {star.name} as {star.character}
                  </li>
                ))}
              </ul>
            </>
          )}
        </Col>
      </Row>
    </Card>
  );
}

export default EpisodeCard;
