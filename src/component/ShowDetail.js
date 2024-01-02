import React from "react";
import { Image } from "react-bootstrap";
import PlayerDetail from "./PlayerDetail";

const ShowDetail = ({ game, halfLength, borderColor }) => {
    const participants = game.info.participants;

  const firstHalf = participants.slice(0, halfLength);
  const secondHalf = participants.slice(halfLength);
  return (
    <>
      {firstHalf.map((player, index) => (
          <PlayerDetail key={index} player={player}
          borderColor={borderColor} />
        ))}
      <hr style={{ width: "100%", borderTop: "2px solid black", margin: "3px 0" }} />
      {secondHalf.map((player, index) => (
          <PlayerDetail key={index + halfLength} player={player}
          borderColor={borderColor} />
        ))}
    </>
  );
};

export default ShowDetail;
