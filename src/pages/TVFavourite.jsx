import { useEffect, useState } from "react";
import { Container, Row, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import TvCard from "../components/TvCard";

function TVFavourite() {
    const dispatch = useDispatch();
    const listTvFavourite = useSelector((state) => state.TV.listTvFavourite);
    return (
        <Container fluid className="bg-dark text-light py-5 px-3">
            <Container>
                <h2 className="mb-4">Các bộ Truyền hình bạn đã thích</h2>
                <Row>
                    {listTvFavourite.map((movie, index) => (
                        <TvCard key={index} movie={movie} />
                    ))}
                </Row>
                <ToastContainer />
            </Container>
        </Container>
    );
}

export default TVFavourite;
