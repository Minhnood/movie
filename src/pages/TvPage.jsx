import { useEffect, useState } from "react";
import { Container, Row, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchMovieUpcoming,
    fetchPopularList,
    fetchTopRated
} from "../store/movieSlice";
import MovieCard from "../components/MovieCard";
import { fetchTvPopular, fetchTvToday, fetchTvTopRated } from "../store/tvSlice";
import TvCard from "../components/TvCard";

function TvPage() {
    const dispatch = useDispatch();
    const tvPopular = useSelector((state) => state.TV.tvPopular);
    const tvToday = useSelector((state) => state.TV.tvToday);
    const tvTTopRated = useSelector((state) => state.TV.tvTTopRated);

    const [page, setPage] = useState(1);
    const [pageToday, setPagepageToday] = useState(1);
    const [pageTopRated, setPageTopRated] = useState(1);

    useEffect(() => {
        dispatch(fetchTvPopular(page));
        dispatch(fetchTvToday(pageToday));
        dispatch(fetchTvTopRated());
    }, [dispatch,page]);

    const disabledPopularPrev = page === 1 ? "disabled" : "";

    // list -> detail -> seasion list -> seasion detail (show episodes) -> episode detail

    return (
        <Container fluid className="bg-dark text-light py-5 px-3">
            <Container>
                <h2 className="mb-4">Popular Tv</h2>
                <Row>
                    {tvPopular.map((movie, index) => (
                        <TvCard key={index} movie={movie} />
                    ))}
                </Row>
                <Pagination className="d-flex justify-content-center mt-3">
                    <Pagination.Prev onClick={() => setPage(page - 1)} className={disabledPopularPrev} />
                    <Pagination.Next onClick={() => setPage(page + 1)} />
                </Pagination>

                <h2 className="mt-5 mb-4">TV Show Today</h2>
                <Row>
                    {tvToday.map((movie, index) => (
                        <TvCard key={index} movie={movie} />
                    ))}
                </Row>

                <h2 className="mt-5 mb-4">TV Top Rated</h2>
                <Row>
                    {tvTTopRated.map((movie, index) => (
                        <TvCard key={index} movie={movie} />
                    ))}
                </Row>
              
            </Container>
        </Container>
    );
}

export default TvPage;
