import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation } from "react-i18next";
import { TFunction } from "../../common/types";
import { useNavigate } from "react-router-dom";
import Container from "../../common/Container";
import { Button } from "../../common/Button";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";
import { useAuth } from "../../AuthProvider";

const Header = ({ t }: { t: TFunction }) => {
  const {isAuthenticated} = useAuth();
  const [visible, setVisibility] = useState(false);

  const toggleButton = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const navigate = useNavigate();
    const redirectTo = (path: string) => {
      navigate(path); // Redirect to the specified path
      setVisibility(false); // Close the drawer
    };

    return (
      <>
        {!isAuthenticated ? (
          <>
            <CustomNavLinkSmall onClick={() => redirectTo("/login")}>
              <Span>Login</Span>
            </CustomNavLinkSmall>
            <CustomNavLinkSmall
              style={{ width: "180px" }}
              onClick={() => redirectTo("/signup")}
            >
              <Span>
                <Button>Get Started</Button>
              </Span>
            </CustomNavLinkSmall>
          </>
        ) : (
          <>
            <CustomNavLinkSmall
              style={{ width: "180px" }}
              onClick={() => redirectTo("/detect")}
            >
              <Span>
                <Button>Detect</Button>
              </Span>
            </CustomNavLinkSmall>
            <CustomNavLinkSmall
              style={{ width: "100px" }}
              onClick={() => signOut(auth)}
            >
              <Span>
              Log Out
              </Span>
            </CustomNavLinkSmall>
          </>
        )}
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <h3 style={{fontSize: 30, marginTop: 20}}>CareShield</h3>
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={toggleButton}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={toggleButton}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
