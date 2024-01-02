import React, { useEffect, useState } from "react";
import { getUserInfo } from "../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, FormControl, Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getSummoners } from "../redux/actions/userAction";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery !== "") {
      await dispatch(getUserInfo(searchQuery));
      navigate(`/summoner/${searchQuery}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "-70px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>롤 전적 검색</h1>
      <div style={{ textAlign: "center" }}>
        <InputGroup className="mb-3" style={{ width: "70%", margin: "auto" }}>
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
    </Container>
  );
};

export default Home;
