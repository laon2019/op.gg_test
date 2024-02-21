import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserInfo from "../component/UserInfo";
import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import GameInfo from "../component/GameInfo";
import {
  getAdditionalMatchDetails,
  userActions,
} from "../redux/actions/userAction"; // Import getAdditionalMatchDetails and userActions

const UserProfile = () => {
  const [start, setStart] = useState(12);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const leagueInfo = useSelector((state) => state.user.leagueInfo);
  const matchInfo = useSelector((state) => state.user.matchInfo);
  const matchDetailInfo = useSelector((state) => state.user.matchDetailInfo);
  const spellsInfo = useSelector((state) => state.user.spells);

  const handleLoadMore = () => {
    dispatch(
      getAdditionalMatchDetails({
        userPuuid: userInfo.puuid,
        start: start,
      })
    );
    setStart((prevStart) => prevStart + 4);
  };

  return (
    <div style={{ padding: "20px 0px", backgroundColor: "#EBEEF1" }}>
      <div>
        <UserInfo />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "20px",
          flexWrap: "wrap",
        }}
      >
        {matchDetailInfo.map((game, index) => (
          <GameInfo key={index} game={game} />
        ))}
      </div>
      <div className="d-grid gap-2" style={{ margin: "0px 50px" }}>
        <Button variant="primary" size="lg" onClick={handleLoadMore}>
          더보기
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
