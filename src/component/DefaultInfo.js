import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, Image } from "react-bootstrap";

const DefaultInfo = ({
  game,
  halfLength,
  thisGameUser,
  borderColor,
  backgroundColor,
}) => {
  const spellsInfo = useSelector((state) => state.user.spells);
  const [spell1, setSpell1] = useState("");
  const [spell2, setSpell2] = useState("");
  const [queueType, setQueueType] = useState("");

  const minionsSectionStyle = {
    width: "280px",
    display: "flex",
    justifyContent: "flex-start",
    margin: "20px",
  };

  const formatGameDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}분 ${seconds}초`;
  };

  useEffect(() => {
    if (thisGameUser && spellsInfo && spellsInfo.data) {
      Object.values(spellsInfo.data).forEach((spell) => {
        if (+thisGameUser.summoner1Id === +spell.key) {
          setSpell1(spell.image.full);
        }
        if (+thisGameUser.summoner2Id === +spell.key) {
          setSpell2(spell.image.full);
        }
      });
    }
  }, [spellsInfo, thisGameUser]);

  useEffect(() => {
    if(game.info.gameDuration <= 180){
      setQueueType("다시하기");
    } else if (game.info.queueId === 420) {
      setQueueType("솔로랭크");
    } else if (game.info.queueId === 450) {
      setQueueType("무작위 총략전");
    } else if (game.info.queueId === 440) {
      setQueueType("자유랭크");
    } else if (game.info.queueId === 490) {
      setQueueType("일반게임");
    } else if (game.info.queueId === 1700) {
      setQueueType("아레나");
    }
  }, [game]);

  return (
    <>
      <Card.Title style={{ color: borderColor, fontWeight: "bolder" }}>
        {queueType}
      </Card.Title>
      <Card.Text style={{ fontWeight: "bolder" }}>
        게임 시간: {formatGameDuration(game.info.gameDuration)}
      </Card.Text>
      <div style={{ display: "flex", alignItems: "center", margin: "0 5px" }}>
        <div style={{ position: "relative" }}>
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${thisGameUser?.championName}.png`}
            style={{ width: "90px", margin: "5px" }}
          />
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: "0",
              right: "0",
            }}
          >
            {thisGameUser?.champLevel}
          </div>
        </div>
        <div style={{ margin: "5px" }}>
          <div>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${spell1}`}
              style={{
                width: "40px",
                margin: "0 5px",
                borderRadius: "50%",
                border: "1px solid black",
              }}
            />
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${spell2}`}
              style={{
                width: "40px",
                margin: "5px",
                borderRadius: "50%",
                border: "1px solid black",
              }}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "10px",
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: "bolder", margin: "10px" }}>
          {thisGameUser?.kills}/
          <span style={{ color: "red" }}>{thisGameUser?.deaths}</span>/
          {thisGameUser?.assists}
        </p>
        <p
          style={{
            fontSize: "18px",
            fontWeight: "bolder",
            color: "gray",
            margin: "10px",
          }}
        >
          {thisGameUser?.challenges?.kda
            ? thisGameUser.challenges.kda.toFixed(2)
            : "N/A"}
          :1
        </p>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
  {Array.from({ length: 6 }).map((_, index) => {
    const itemImageUrl = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${
      thisGameUser?.[`item${index}`] || 0
    }.png`;

    return thisGameUser?.[`item${index}`] === 0 ? (
      <div
        key={index}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "5px",
          margin: "3px",
          backgroundColor: "transparent",
          border: `1px solid ${borderColor}`,
        }}
      ></div>
    ) : (
      <img
        key={index}
        src={itemImageUrl}
        alt={`item-${index}`}
        style={{
          width: "40px",
          borderRadius: "5px",
          margin: "3px",
          border: "1px solid gray",
        }}
      />
    );
  })}
</div>
      <div style={minionsSectionStyle}>
        {[0, 1].map((colIndex) => (
          <div key={colIndex} style={{ width: "150px" }}>
            {game.info.participants
              .slice(colIndex * halfLength, (colIndex + 1) * halfLength)
              .map((participant, index) => (
                <div key={index} style={{ display: "flex", margin: "5px 0" }}>
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${participant.championName}.png`}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "5px",
                      margin: "0 2px",
                    }}
                  />
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: "bolder",
                      textAlign:"left",
                      margin: "0 2px",
                      width: "130px"
                    }}
                  >
                    {participant.riotIdGameName.length > 9
                      ? participant.riotIdGameName.slice(0, 9) + "..."
                      : participant.riotIdGameName}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default DefaultInfo;
