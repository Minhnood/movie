import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { fetchSearch } from "../store/movieSlice";
import { BsBookmark } from "react-icons/bs";
import { useInView } from "react-intersection-observer";

function SearchPage() {
    const dispatch = useDispatch();
    const searchList = useSelector((state) => state.MOVIE.searchList);
    const genreList = useSelector((state) => state.MOVIE.genreList);

    const [displayedMovies, setDisplayedMovies] = useState([]);
    const [pageSearch, setPageSearch] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [searchParams] = useSearchParams();
    const search = searchParams.get("keyword");

    const { ref, inView } = useInView({
        threshold: 1.0,
        triggerOnce: false,
    });

    useEffect(() => {
        if (search) {
            dispatch(fetchSearch({ search, page: pageSearch }));
        }
    }, [dispatch, search, pageSearch]);

    useEffect(() => {
        setPageSearch(1);
        setDisplayedMovies([]);
        setHasMore(true);
    }, [search]);

    useEffect(() => {
        if (pageSearch === 1) {
            setDisplayedMovies(searchList);
        } else if (searchList.length > 0) {
            setDisplayedMovies((prev) => [...prev, ...searchList]);
        } else {
            setHasMore(false);
        }
    }, [searchList]);

    useEffect(() => {
        if (inView && hasMore) {
            setPageSearch((prev) => prev + 1);
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
                <h2 className="mb-4">The movies you are looking for</h2>
                <Row>
                    {displayedMovies.map((movie, index) => {
                        const regex = new RegExp(search, "ig");
                        const title = movie.original_title.replace(regex, (match) => `<span class='highlight'>${match}</span>`);

                        const genreNames = genreList
                            .filter((genreItem) => movie.genre_ids.includes(genreItem.id))
                            .map((g) => g.name);

                        return (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <Card className="movie-card position-relative text-white">
                                    <Link to={`/DetailMovie/${movie.id}`} className="nav-link text-white">
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
                                        <BsBookmark className="bookmark-icon position-absolute top-0 end-0 m-2" />
                                        <Card.Body className="text-center">
                                            <Card.Title
                                                className="fw-bold text-dark"
                                                dangerouslySetInnerHTML={{ __html: title }}
                                            />
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
                    <div className="text-center text-secondary py-4"> Không còn phim nào nữa!</div>
                )}
            </Container>
        </Container>
    );
}

export default SearchPage;
