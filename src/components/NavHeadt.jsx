import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchMe, logout } from "../store/userSlice";
import { Button, Container, Navbar, Nav, NavDropdown, InputGroup, Form } from "react-bootstrap";
import { fetchFavourite, fetchMovieGenress } from "../store/movieSlice";

function NavHeadt() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.USER.currentUser);
  const genreList = useSelector((state) => state.MOVIE.genreList);
  const listFavourite = useSelector((state) => state.MOVIE.listFavourite);

  const SESSION_ID = localStorage.getItem("SESSION_ID");
  const navigate = useNavigate();

  const [searchList, setsearchList] = useState("");

  function handleChange(event) {
    setsearchList(event.target.value);
  }

  function handleSearch() {
    if (searchList.trim() !== "") {
      navigate(`/search?keyword=${searchList}`);
    }
  }

  useEffect(() => {
    dispatch(fetchMe(SESSION_ID));
    dispatch(fetchMovieGenress())
    dispatch(fetchFavourite());
  }, [dispatch, searchList]);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  }


  const userMenu = currentUser ? (
    <NavDropdown title={currentUser?.username} id="basic-nav-dropdown">
      <NavDropdown.Item as={Link} to="/myProfile">Thông tin</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/favourite"> Phim yêu thích ( {listFavourite.length} )</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
    </NavDropdown>
  ) : (
    <>
      <Nav.Item>
        <Link to="/login" className="nav-link text-white">Đăng nhập</Link>
      </Nav.Item>
    </>
  );



  // Render danh mục
  const genreLists = genreList.length > 0 ? (
    genreList.map((item) => (
      <NavDropdown.Item as={Link} to={`/category?id=${item.id}`} key={item.id}>
        {item.name}
      </NavDropdown.Item>
    ))
  ) : (
    <NavDropdown.Item disabled>Không có danh mục</NavDropdown.Item>
  );

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Danh mục" id="basic-nav-dropdown">
              {genreLists}
            </NavDropdown>
            <Nav.Item>
              <Link to="/tv_list" className="nav-link text-white">Tv Shows</Link>
            </Nav.Item>
            {userMenu}
          </Nav>
          <InputGroup className="w-50">
            <Form.Control
              placeholder="Tìm kiếm..."
              aria-label="Tìm kiếm"
              value={searchList}
              onChange={handleChange}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button variant="success" onClick={handleSearch}>
              Tìm kiếm
            </Button>
          </InputGroup>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavHeadt;
