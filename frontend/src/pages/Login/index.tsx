import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../common/Container";
import { ContentSection } from "../../components/ContentBlock/styles";
import { FormGroup } from "../../components/ContactForm/styles";
import { Button } from "../../common/Button";
import { Title } from "../../components/Footer/styles";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";
import { notification } from "antd";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        await signInWithEmailAndPassword(auth ,email, password);
        navigate("/");      
        notification["success"]({
            message: "Success",
            description: "Your message has been sent!",
          });
    }catch(e:any) {
        notification.error({
            message: "Error",
            description: e.message,
          });
    }
  };

  return (
    <Container>
        <ContentSection style={{display:"flex", alignItems: 'center', flexDirection:'column'}}>
        <Title>Login</Title>

        <FormGroup
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button>Login</Button>
      </FormGroup>
        </ContentSection>
    </Container>
  );
};

export default LoginPage;
