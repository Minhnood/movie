import React from "react";
import { Row, Col, Card } from "react-bootstrap";

function EpisodeDetail({ episode }) {
    return (
        <div className="p-3 bg-dark border-top">
            <Row>
                <Col md={5}>
                    <h6>Guest Stars</h6>
                    {episode.guest_stars?.map((star) => (
                        <div key={star.id}>{star.name} – {star.character}</div>
                    ))}
                    <h6>Crew</h6>
                    {episode.crew?.map((crew) => (
                        <div key={crew.id}>{crew.job}: {crew.name}</div>
                    ))}
                </Col>
                <Col md={5}>
                    {episode.still_path ? (
                        <Card className="bg-dark text-light">
                            <Card.Img
                                src={`https://image.tmdb.org/t/p/original${episode.still_path}`}
                                alt={episode.name}
                                className="rounded"
                                style={{ width: "100%", maxHeight: "500px", objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Text className="text-light">{episode.overview}</Card.Text>
                            </Card.Body>
                        </Card>
                    ) : (
                        <div className="bg-secondary text-center text-light p-5 rounded">
                            No image available for this episode.
                        </div>
                    )}
                </Col>
            </Row>

        </div>
    );
}

export default EpisodeDetail;
