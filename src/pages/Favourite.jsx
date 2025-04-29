import { useEffect, useState } from "react";
import { Container, Row, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { ToastContainer } from "react-toastify";

function Favourite() {
    const dispatch = useDispatch();
    const listFavourite = useSelector((state) => state.MOVIE.listFavourite);
    return (
        <Container fluid className="bg-dark text-light py-5 px-3">
            <Container>
                <h2 className="mb-4">Các bộ phim bạn đã thích</h2>
                <Row>
                    {listFavourite.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                    ))}
                </Row>
                <ToastContainer />
            </Container>
        </Container>
    );
}

export default Favourite;
