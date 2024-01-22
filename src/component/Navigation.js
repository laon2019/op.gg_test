import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { InputGroup, FormControl } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { getUserInfo } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery !== "") {
      await dispatch(getUserInfo(searchQuery));
      navigate(`/summoner/${searchQuery}`);
      setSearchQuery("")
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Navbar
      bg="light"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          내 마음대로 전적 검색
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <div className="ms-auto">
            <InputGroup>
              <FormControl
                placeholder="게임 전적 검색"
                aria-label="게임 전적 검색"
                aria-describedby="basic-addon2"
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button
                variant="outline-secondary"
                id="button-addon2"
                onClick={handleSearch}
              >
                검색
              </Button>
            </InputGroup>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
