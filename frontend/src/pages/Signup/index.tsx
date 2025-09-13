import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../../common/Container";
import { ContentSection } from "../../components/ContentBlock/styles";
import { FormGroup } from "../../components/ContactForm/styles";
import { Button } from "../../common/Button";
import { Title } from "../../components/Footer/styles";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";


const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSignup = async () => {
    try {
      // Create user with email and password
      await createUserWithEmailAndPassword(auth, email, password);

      // Redirect to the dashboard after successful sign-up
      navigate("/dashboard");
    } catch (error) {
      // Handle authentication errors here
      const firebaseError = error as FirebaseError;
      console.error("Error signing up:", firebaseError);
      // Optionally, you can display an error message to the user
    }
  };


  const handleLogin = () => {
    // Perform your authentication logic here
    // For demonstration, let's assume authentication is successful
    // You can replace this with your actual authentication logic

    // Redirect to the dashboard after successful login
    navigate("/dashboard");
  };

  return (
    <Container>
        <ContentSection style={{display:"flex", alignItems: 'center', flexDirection: 'column'}}>
        <Title>Signup</Title>
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
        <Button onClick={() => handleSignup()}>Signup</Button>
      </FormGroup>
        </ContentSection>
    </Container>
  );
};

export default LoginPage;
