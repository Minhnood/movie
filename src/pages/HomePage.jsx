import { useEffect, useState } from "react";
import { Container, Row, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMovieUpcoming,
    fetchPopularList,
    fetchTopRated
} from "../store/movieSlice";
import MovieCard from "../components/MovieCard";

function HomePage() {
    const dispatch = useDispatch();

    const ListMovie = useSelector((state) => state.MOVIE.list);
    const ListUpcoming = useSelector((state) => state.MOVIE.Upcoming);
    const ListTopRated = useSelector((state) => state.MOVIE.TopRated);

    const popularPage = useSelector((state) => state.MOVIE.listPage);
    const UpcomingPage = useSelector((state) => state.MOVIE.UpcomingPage);
    const MaxUpcomingPage = useSelector((state) => state.MOVIE.MaxUpcomingPage);
    const TopRatedPage = useSelector((state) => state.MOVIE.TopRatedPage);
    const MaxTopRatedPage = useSelector((state) => state.MOVIE.MaxTopRatedPgae);

    const [page, setPage] = useState(1);
    const [pageUpcoming, setPageUpcoming] = useState(1);
    const [pageTopRated, setPageTopRated] = useState(1);

    useEffect(() => {
        dispatch(fetchPopularList(page));
        dispatch(fetchMovieUpcoming(pageUpcoming));
        dispatch(fetchTopRated(pageTopRated));
    }, [dispatch, page, pageUpcoming, pageTopRated]);

    const disabledPopularPrev = popularPage === 1 ? "disabled" : "";
    const disabledUpcomingPrev = UpcomingPage === 1 ? "disabled" : "";
    const disabledUpcomingNext = UpcomingPage === MaxUpcomingPage ? "disabled" : "";
    const disabledTopRatedPrev = TopRatedPage === 1 ? "disabled" : "";
    const disabledTopRatedNext = TopRatedPage === MaxTopRatedPage ? "disabled" : "";

    const pageUpcomings = [];
    const startPageUpcoming = Math.max(1, UpcomingPage - 2);
    const endPageUpcoming = Math.min(MaxUpcomingPage, UpcomingPage + 2);
    for (let i = startPageUpcoming; i <= endPageUpcoming; i++) {
        pageUpcomings.push(
            <Pagination.Item
                key={`upcoming-${i}`}
                onClick={() => setPageUpcoming(i)}
                active={UpcomingPage === i}
            >
                {i}
            </Pagination.Item>
        );
    }

    const pageTopRateds = [];
    const startPageTopRated = Math.max(1, TopRatedPage - 2);
    const endPageTopRated = Math.min(MaxTopRatedPage, TopRatedPage + 2);
    for (let i = startPageTopRated; i <= endPageTopRated; i++) {
        pageTopRateds.push(
            <Pagination.Item
                key={`toprated-${i}`}
                onClick={() => setPageTopRated(i)}
                active={TopRatedPage === i}
            >
             {i}
            </Pagination.Item>
        );
    }

    return (
        <Container fluid className="bg-dark text-light py-5 px-3">
            <Container>
                <h2 className="mb-4">Popular Movies</h2>
                <Row>
                    {ListMovie.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </Row>
                <Pagination className="d-flex justify-content-center mt-3">
                    <Pagination.Prev onClick={() => setPage(page - 1)} className={disabledPopularPrev} />
                    <Pagination.Next onClick={() => setPage(page + 1)} />
                </Pagination>

                <h2 className="mt-5 mb-4">Upcoming Movies</h2>
                <Row>
                    {ListUpcoming.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </Row>
                <Pagination className="d-flex justify-content-center mt-3">
                    <Pagination.Prev onClick={() => setPageUpcoming(UpcomingPage - 1)} className={disabledUpcomingPrev} />
                    {pageUpcomings}
                    <Pagination.Next onClick={() => setPageUpcoming(UpcomingPage + 1)} className={disabledUpcomingNext} />
                </Pagination>

                <h2 className="mt-5 mb-4">Top Rated</h2>
                <Row>
                    {ListTopRated.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </Row>
                <Pagination className="d-flex justify-content-center mt-3">
                    <Pagination.Prev onClick={() => setPageTopRated(TopRatedPage - 1)} className={disabledTopRatedPrev} />
                    {pageTopRateds}
                    <Pagination.Next onClick={() => setPageTopRated(TopRatedPage + 1)} className={disabledTopRatedNext} />
                </Pagination>
            </Container>
        </Container>
    );
}

export default HomePage;
