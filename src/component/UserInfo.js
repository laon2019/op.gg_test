import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import RankInfo from "./RankInfo";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const UserInfo = () => {
  const [soloRank, setSoloRank] = useState('');
  const [freeRank, setFreeRank] = useState('');

  const userInfo = useSelector((state) => state.user.userInfo);
  const leagueInfo = useSelector((state) => state.user.leagueInfo);

  useEffect(() => {
    const soloLeague = leagueInfo.find((league) => league.queueType === "RANKED_SOLO_5x5");
    const freeLeague = leagueInfo.find((league) => league.queueType === "RANKED_FLEX_SR");

    if (soloLeague) {
      setSoloRank(soloLeague);
    }

    if (freeLeague) {
      setFreeRank(freeLeague);
    }
  }, [leagueInfo]);

  return (
    <div>
      <Card style={{ border: "2px solid purple", margin: "0px 50px", padding: "10px"}}>
        <Row>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Image
              src={`http://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${userInfo.profileIconId}.png`}
              rounded
              style={{
                width: "120px",
                height: "120px",
                border: "1px solid black",
                margin: "10px", // 여백 추가
              }}
            />
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <h4 style={{ marginBottom: "5px" }}>{userInfo.name}</h4>
            <h4 style={{ color: "#808080", margin: "10px" }}>{/* 태그 */}</h4>
          </Col>
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center align-items-center flex-column"
          >
            <Tabs defaultActiveKey="solo" id="rank-tabs" className="mb-3">
              <Tab eventKey="solo" title="솔로 랭크">
                <RankInfo
                  rankInfo={soloRank}
                />
              </Tab>
              <Tab eventKey="free" title="자유 랭크">
                <RankInfo
                  rankInfo={freeRank}
                />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserInfo;