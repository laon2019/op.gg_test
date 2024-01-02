import React, { useState, useEffect } from "react";
import { Card, Image, Button } from "react-bootstrap";
import DefaultInfo from "./DefaultInfo";
import ShowDetail from "./ShowDetail";
import { useSelector } from "react-redux";

const GameInfo = ({ game }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [halfLength, setHalfLength] = useState(
    game.info.participants.length / 2
  );
  const [showDetails, setShowDetails] = useState(true);
  const [thisGameUser, setThisGameUser] = useState(null);

  useEffect(() => {
    if (game) {
      const userInGame = game.info.participants.find(
        (user) => user.summonerName === userInfo.name
      );
      if (userInGame) {
        setThisGameUser(userInGame);
      }
    }
  }, [game, userInfo]);

  const backgroundColor = thisGameUser?.win ? "#ECF2FF" : "#FFF1F3";
  const buttonColor = thisGameUser?.win ? "primary" : "danger";
  const borderColor = thisGameUser?.win ? "blue" : "red";

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Card
      style={{
        width: "330px",
        border: `2px solid ${borderColor}`,
        margin: "10px",
        backgroundColor: backgroundColor,
      }}
    >
      <Card.Body
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ padding: "10px 5px" }}
      >
        {showDetails ? (
          <DefaultInfo
            game={game}
            thisGameUser={thisGameUser}
            halfLength={halfLength}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
          />
        ) : (
          <ShowDetail game={game} halfLength={halfLength}
          borderColor={borderColor}
           />
        )}
        <Button
          variant={buttonColor}
          size="xs"
          style={{ width: "280px" }}
          onClick={handleToggleDetails}
        >
          {showDetails ? "자세히 보기" : "뒤로가기"}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default GameInfo;
