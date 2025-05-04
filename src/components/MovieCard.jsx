import { Badge, Button, Card, Col } from "react-bootstrap";
import { BsBookmark } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFavourite, postFavourite } from "../store/movieSlice";
import { toast } from "react-toastify";



function MovieCard({ movie }) {
    const dispatch = useDispatch();
    const genreList = useSelector((state) => state.MOVIE.genreList);
    const currentUser = useSelector((state) => state.USER.currentUser);
    const listFavourite = useSelector((state) => state.MOVIE.listFavourite);
    const [isLockbookmark, setIsLockbookmark] = useState(false);
    // lay danh sach phim yeu thich tu store
    const genreNames = [];
    const [id, setId] = useState(0);

    genreList.forEach(genreItem => {
        if (movie.genre_ids.includes(genreItem.id)) {
            genreNames.push(genreItem.name);
        }
    });
    function getBorderColor(score) {
        if (score >= 70) return "#21d07a";
        if (score >= 50) return "#d2d531";
        return "#db2360";
    }

    // gia su rang phim chua duoc yeu thich
    let color = "";
    let isFavorite = false;

    listFavourite.forEach((item) => {
        // kiem tra phim da duoc yeu thich
        if (item.id === movie.id) {
            color = "text-warning"
            isFavorite = true;
        }
    });



    function addFavourite() {
        // lock icon bookmark
        if (!isFavorite) {
            toast("You liked the movie!");
        } else {
            toast("You dislike this movie!");
        }
        setIsLockbookmark(true);
        dispatch(postFavourite({ media_type: 'movie', media_id: movie.id, favorite: !isFavorite })).then(res => {
            setIsLockbookmark(false)
        });
    }


    // viet dieu kien de active bookmark neu phim da duoc yeu thich
    const bookmark = currentUser ? (<BsBookmark className={`bookmark-icon position-absolute top-0 end-0 m-2 bg-dark p-2 fs-2 ${color} rounded-2`} size={40} onClick={isLockbookmark == false ? addFavourite : null} />) : "";
    return (
        <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className={`movie-card position-relative text-white h-100 d-flex flex-column`}>
                <Link to={`/detail-movie/${movie.id}`} className="nav-link text-white h-100">
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
                            {movie.original_title}
                        </Card.Title>
                        <Card.Text className="fw-bold text-warning mt-auto">
                            {genreNames.join(", ")}
                        </Card.Text>
                    </Card.Body>
                </Link>
                {bookmark}
            </Card>
        </Col>

    );
}

export default MovieCard;