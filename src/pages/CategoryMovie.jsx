import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { fetchPopularList, postFavourite } from "../store/movieSlice";
import { BsBookmark } from "react-icons/bs";
import { useInView } from "react-intersection-observer";

function CategoryMovie() {
    const dispatch = useDispatch();
    const allMovies = useSelector((state) => state.MOVIE.list); // 20
    const genreList = useSelector((state) => state.MOVIE.genreList);
    const currentUser = useSelector((state) => state.USER.currentUser);
    const listFavourite = useSelector((state) => state.MOVIE.listFavourite);
    const maxListPage = useSelector((state) => state.MOVIE.maxListPage);

    const [isLockbookmark, setIsLockbookmark] = useState(false);

    const [displayedMovies, setDisplayedMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [searchParams] = useSearchParams();
    const categoryId = Number(searchParams.get("id"));

    const { ref, inView } = useInView({
        threshold: 1.0,
        triggerOnce: false,
    });

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchPopularList(page));
        }
    }, [dispatch, categoryId, page]);

    useEffect(() => {
        setDisplayedMovies([]);
        setPage(1);
        setHasMore(true);
    }, [categoryId]);

    useEffect(() => {
        let filteredMovies = allMovies.filter((movie) =>
            movie.genre_ids.includes(categoryId)
        );
        console.log(filteredMovies);

        filteredMovies = filteredMovies.filter(movie => {
            return displayedMovies.findIndex((item) => movie.id === item.id) === -1;
        });

        if (page === 1) {
            setDisplayedMovies(filteredMovies);
        } else if (filteredMovies.length > 0) {
            setDisplayedMovies((prev) => [...prev, ...filteredMovies]);
        } else if (page === maxListPage){
            setHasMore(false);
        }
    }, [allMovies]);

    useEffect(() => {
        if (inView && hasMore) {
            setPage((prev) => prev + 1);
        }
    }, [inView, hasMore]);

    function getBorderColor(score) {
        if (score >= 70) return "#21d07a";
        if (score >= 50) return "#d2d531";
        return "#db2360";
    }





    return (
        <Container fluid className="bg-dark text-light py-5 px-3">
            <Container>
                <h2 className="mb-4">Các phim thuộc thể loại bạn chọn</h2>
                <Row>
                    {displayedMovies.map((movie, index) => {
                        const genreNames = genreList
                            .filter((genreItem) => movie.genre_ids.includes(genreItem.id))
                            .map((g) => g.name);

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
                            setIsLockbookmark(true);
                            dispatch(postFavourite({ media_type: 'movie', media_id: movie.id, favorite: !isFavorite })).then(res => {
                                // unlock
                                setIsLockbookmark(false)
                            });
                        }

                        const bookmark = currentUser ? (<BsBookmark className={`bookmark-icon position-absolute top-0 end-0 m-2 bg-dark p-2 fs-2 ${color} rounded-2`} size={40} onClick={isLockbookmark == false ? addFavourite : null} />) : "";

                        return (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <Card className="movie-card position-relative text-white">
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
                                        {bookmark}
                                        <Card.Body className="text-center">
                                            <Card.Title className="fw-bold text-dark">
                                                {movie.original_title}
                                            </Card.Title>
                                            <Card.Text className="fw-bold text-warning">
                                                {genreNames.join(", ")}
                                            </Card.Text>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>

                {hasMore && (
                    <div ref={ref} className="text-center text-secondary py-4">
                        Đang tải thêm phim...
                    </div>
                )}

                {!hasMore && (
                    <div className="text-center text-secondary py-4">
                        Không còn phim nào nữa!
                    </div>
                )}
            </Container>
        </Container>
    );
}

export default CategoryMovie;
