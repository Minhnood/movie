import React, { useState } from "react";
import { Card, Badge, Image, Button } from "react-bootstrap";

const ReviewItem = ({ cast }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded(!expanded);

  const getWordCount = (text) => text?.split(/\s+/).length;

  const castContent = cast.content;
  const contentTooLong = getWordCount(castContent) > 100;

  const truncatedContent = contentTooLong
    ? castContent.split(" ").slice(0, 50).join(" ") + "..."
    : castContent;

  return (
    <Card className="p-4 shadow-sm border-0 mb-3 bg-light">
      <div className="d-flex align-items-center mb-3">
        <Image
          src={
            cast.author_details.avatar_path
              ? `https://image.tmdb.org/t/p/original${cast.author_details.avatar_path}`
              : "https://www.gravatar.com/avatar/placeholder.jpg?d=mp&s=40"
          }
          roundedCircle
          width={60}
          height={60}
          className="me-3"
        />
        <div>
          <strong>A review by {cast.author_details.username}</strong>
          <div className="text-muted small">
            <Badge bg="primary" className="me-2">
              {cast.author_details.rating * 10}%
            </Badge>
            Written on {new Date(cast.updated_at).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="mb-0 text-dark" dangerouslySetInnerHTML={{ __html: expanded || !contentTooLong ? castContent : truncatedContent }}></div>
      {contentTooLong && (
        <Button
          variant="link"
          onClick={toggleExpanded}
          className="px-0 mt-2 text-decoration-none"
        >
          {expanded ? "Ẩn bớt" : "Xem thêm"}
        </Button>
      )}
    </Card>
  );
};

export default ReviewItem;
