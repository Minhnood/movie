import { Card, Col } from "react-bootstrap";
import { BsBookmark } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { postFavourite } from "../store/movieSlice";
import { toast } from "react-toastify";
import { fetchTvFavourite } from "../store/tvSlice";

function TvCard({ movie }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.USER.currentUser);
    const listTvFavourite = useSelector((state) => state.TV.listTvFavourite);
    const [isLockbookmark, setIsLockbookmark] = useState(false);

    function getBorderColor(score) {
        if (score >= 70) return "#21d07a";
        if (score >= 50) return "#d2d531";
        return "#db2360";
    }

    // Kiểm tra xem phim đã được yêu thích chưa
    let color = "";
    let isFavorite = false;

    if (Array.isArray(listTvFavourite)) {
        listTvFavourite.forEach((item) => {
            if (item.id === movie.id) {
                color = "text-warning";
                isFavorite = true;
            }
        });
    }

    function addFavourite() {
        if (!currentUser) {
            toast("Bạn cần đăng nhập để sử dụng tính năng này!");
            return;
        }

        toast(isFavorite ? "You unliked this TV show!" : "You liked this TV show!");

        setIsLockbookmark(true);
        dispatch(postFavourite({ media_type: "tv", media_id: movie.id, favorite: !isFavorite
        })).then(() => {
            setIsLockbookmark(false);
        });
    }

    const bookmark = currentUser ? (
        <BsBookmark
            className={`bookmark-icon position-absolute top-0 end-0 m-2 bg-dark p-2 fs-2 ${color} rounded-2`}
            size={40}
            onClick={!isLockbookmark ? addFavourite : null}
        />
    ) : null;

    return (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="movie-card position-relative text-white h-100 d-flex flex-column">
                <Link to={`/tv/${movie.id}`} className="nav-link text-white h-100">
                    <Card.Img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        className="movie-img"
                    />
                    <span
                        className="rating-badge position-absolute top-0 start-0 m-2"
                        style={{
                            borderColor: getBorderColor(Math.floor(movie.vote_average * 10)),
                            backgroundColor: "#0d111724",
                        }}
                    >
                        {(Math.floor(movie.vote_average * 10) / 10).toFixed(1)}
                    </span>
                    <Card.Body className="text-center d-flex flex-column">
                        <Card.Title className="fw-bold text-dark">
                            {movie.original_name}
                        </Card.Title>
                        <Card.Text className="fw-bold text-warning mt-auto">
                            {movie.first_air_date}
                        </Card.Text>
                    </Card.Body>
                </Link>
                {bookmark}
            </Card>
        </Col>
    );
}

export default TvCard;
