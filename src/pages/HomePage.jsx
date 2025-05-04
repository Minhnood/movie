import { useEffect, useState } from "react";
import { Container, Row, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMovieupcoming,
    fetchPopularList,
    fetchTopRated
} from "../store/movieSlice";
import MovieCard from "../components/MovieCard";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

function HomePage() {
    const dispatch = useDispatch();

    // PascalCase: MyProfile
    // camelCase: myProfile
    // snake_case: my_profile
    // SNAKE_CASE
    const ListMovie = useSelector((state) => state.MOVIE.list);
    const Listupcoming = useSelector((state) => state.MOVIE.upcoming);
    const ListtopRated = useSelector((state) => state.MOVIE.topRated);

    const popularPage = useSelector((state) => state.MOVIE.listPage);
    const upcomingPage = useSelector((state) => state.MOVIE.upcomingPage);
    const maxupcomingPage = useSelector((state) => state.MOVIE.maxupcomingPage);
    const topRatedPage = useSelector((state) => state.MOVIE.topRatedPage);
    const MaxtopRatedPage = useSelector((state) => state.MOVIE.maxtopRatedPgae);

    const [page, setPage] = useState(1);
    const [pageupcoming, setPageupcoming] = useState(1);
    const [pagetopRated, setPagetopRated] = useState(1);

    useEffect(() => {
        dispatch(fetchPopularList(page));
        dispatch(fetchMovieupcoming(pageupcoming));
        dispatch(fetchTopRated(pagetopRated));
    }, [dispatch, page, pageupcoming, pagetopRated]);

    const disabledPopularPrev = popularPage === 1 ? "disabled" : "";
    const disabledupcomingPrev = upcomingPage === 1 ? "disabled" : "";
    const disabledupcomingNext = upcomingPage === maxupcomingPage ? "disabled" : "";
    const disabledtopRatedPrev = topRatedPage === 1 ? "disabled" : "";
    const disabledtopRatedNext = topRatedPage === MaxtopRatedPage ? "disabled" : "";

    const pageupcomings = [];
    const startPageupcoming = Math.max(1, upcomingPage - 2);
    const endPageupcoming = Math.min(maxupcomingPage, upcomingPage + 2);
    for (let i = startPageupcoming; i <= endPageupcoming; i++) {
        pageupcomings.push(
            <Pagination.Item
                key={`upcoming-${i}`}
                onClick={() => setPageupcoming(i)}
                active={upcomingPage === i}
            >
                {i}
            </Pagination.Item>
        );
    }

    const pagetopRateds = [];
    const startPagetopRated = Math.max(1, topRatedPage - 2);
    const endPagetopRated = Math.min(MaxtopRatedPage, topRatedPage + 2);
    for (let i = startPagetopRated; i <= endPagetopRated; i++) {
        pagetopRateds.push(
            <Pagination.Item
                key={`topRated-${i}`}
                onClick={() => setPagetopRated(i)}
                active={topRatedPage === i}
            >
                {i}
            </Pagination.Item>
        );
    }

    const location = useLocation();

    useEffect(() => {
        if (location.state?.loginSuccess) {
            toast.success("Đăng nhập thành công!");
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

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

                <h2 className="mt-5 mb-4">upcoming Movies</h2>
                <Row>
                    {Listupcoming.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </Row>
                <Pagination className="d-flex justify-content-center mt-3">
                    <Pagination.Prev onClick={() => setPageupcoming(upcomingPage - 1)} className={disabledupcomingPrev} />
                    {pageupcomings}
                    <Pagination.Next onClick={() => setPageupcoming(upcomingPage + 1)} className={disabledupcomingNext} />
                </Pagination>

                <h2 className="mt-5 mb-4">Top Rated</h2>
                <Row>
                    {ListtopRated.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </Row>
                <Pagination className="d-flex justify-content-center mt-3">
                    <Pagination.Prev onClick={() => setPagetopRated(topRatedPage - 1)} className={disabledtopRatedPrev} />
                    {pagetopRateds}
                    <Pagination.Next onClick={() => setPagetopRated(topRatedPage + 1)} className={disabledtopRatedNext} />
                </Pagination>
            </Container>
            <ToastContainer />
        </Container>
    );
}

export default HomePage;
