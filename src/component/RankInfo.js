import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";

const RankInfo = ({ rankInfo }) => {
  console.log(rankInfo)
  return (
    <div style={{ padding: "10px", margin: "10px", display: "flex", alignItems: "center" }}>
      {rankInfo ? (
        <div style={{ marginRight: "10px" }}>
        <Image
          src={`/img/${rankInfo.tier}.jpeg`}
          rounded
          style={{
            width: "80px",
            height: "80px",
          }}
        />
      </div>
      ) : (<></>)}
      {rankInfo ? (
        <div style={{ display: "flex", flexDirection: "column", flex: 1, alignItems: "center", margin: "0 10px" }}>
        <p>{rankInfo.tier} {rankInfo.rank}</p>
        <p>{rankInfo.leaguePoints}P</p>
      </div>
      ):(
      <></>)}
    </div>
  );
};

export default RankInfo;