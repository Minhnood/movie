import React from "react";
import { Card, Button } from "react-bootstrap";
// import { useNavigate, useParams } from "react-router-dom";

function EpisodeCard({ episode, onExpand, isExpanded }) {
  return (
    <div className="mb-4">
      <Card className="bg-dark text-light">
        <div className="d-flex">
          {episode.still_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${episode.still_path}`}
              alt={episode.name}
              style={{
                width: "200px",
                objectFit: "cover",
                borderTopLeftRadius: "0.5rem",
                borderBottomLeftRadius: "0.5rem",
              }}
            />
          )}
          <Card.Body>
            <Card.Title>
              {episode.episode_number}. {episode.name}
            </Card.Title>
            <Card.Text>
              <strong>Air Date:</strong> {episode.air_date} <br />
              <strong>Rating:</strong> {episode.vote_average} ⭐ <br />
            </Card.Text>
            <Card.Text className="text-light">{episode.overview}</Card.Text>
            <Button variant="outline-light" size="sm" onClick={onExpand}>
              {isExpanded ? "Collapse" : "Expand"}
            </Button>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}


export default EpisodeCard;
