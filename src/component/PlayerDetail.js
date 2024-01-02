import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";

const PlayerDetail = ({ player, borderColor }) => {
  const spellsInfo = useSelector((state) => state.user.spells);
  const [spell1, setSpell1] = useState("");
  const [spell2, setSpell2] = useState("");

  useEffect(() => {
    if (player && spellsInfo && spellsInfo.data) {
      Object.values(spellsInfo.data).forEach((spell) => {
        if (+player.summoner1Id === +spell.key) {
          setSpell1(spell.image.full);
        }
        if (+player.summoner2Id === +spell.key) {
          setSpell2(spell.image.full);
        }
      });
    }
  }, [spellsInfo, player]);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "0 5px",
          height: "35px",
        }}
      >
        <div style={{ position: "relative" }}>
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${player.championName}.png`}
            style={{ width: "30px", margin: "5px", marginRight: "5px" }}
          />
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "50%",
              width: "15px",
              height: "15px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              bottom: "0",
              right: "0",
              fontSize: "4px",
            }}
          >
            {player.champLevel}
          </div>
        </div>
        <div
          style={{ margin: "5px", display: "flex", flexDirection: "column" }}
        >
          <div style={{ display: "flex" }}>
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${spell1}`}
              style={{ width: "15px", margin: "0.5px", borderRadius: "50%" }}
            />
            <Image
              src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${spell2}`}
              style={{ width: "15px", margin: "0.5px", borderRadius: "50%" }}
            />
          </div>
        </div>
        <div style={{ width: "100px" }}>
          <p style={{ fontSize: "10px", margin: "0 2px" }}>
            {player.riotIdGameName.length > 9
              ? player.riotIdGameName.slice(0, 9) + "..."
              : player.riotIdGameName}
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {Array.from({ length: 6 }).map((_, index) => {
            const itemImageUrl = `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/${
              player?.[`item${index}`]
            }.png`;

            return player[`item${index}`] === 0 ? (
              <div
                key={index}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "5px",
                  margin: "0.5px",
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
                  width: "20px",
                  borderRadius: "5px",
                  margin: "0.5px",
                  border: "1px solid gray",
                }}
              />
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          margin: "0 5px",
          width: "250px",
          height: "15px",
        }}
      >
        <div style={{ width: "70px" }}>
          <p style={{ fontSize: "9px", fontWeight: "bolder" }}>Grandmaster</p>
        </div>
        <div>
          <p style={{ fontSize: "9px", fontWeight: "bolder" }}>
            {player.kills}/<span style={{ color: "red" }}>{player.deaths}</span>
            /{player.assists}
          </p>
        </div>
        <div>
          <p style={{ fontSize: "9px", fontWeight: "bolder" }}>
            총 피해량 : {player.totalDamageDealtToChampions}
          </p>
        </div>
      </div>
    </>
  );
};

export default PlayerDetail;
