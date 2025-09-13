import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { TFunction } from "../../common/types";
import Container from "../../common/Container";

import {
  FooterSection,
  Para,
  Language,
} from "./styles";

const Footer = ({ t }: { t: TFunction }) => {
  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Language>Team</Language>
              <Para>Shubh Jalui</Para>
              <Para>Rohit Deshpande</Para>
              <Para>Ninad Marathe</Para>
            </Col>
            <Col lg={10} md={10} sm={12} xs={12}>
            <Language>Mentor</Language>
              <Para>Prof. Poonam Bhogale</Para>
            </Col>
          </Row>
        </Container>
      </FooterSection>
    </>
  );
};

export default withTranslation()(Footer);
