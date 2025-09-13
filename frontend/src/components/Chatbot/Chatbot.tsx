import React from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const ChatbotUi: React.FC = () => {
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", zIndex: 1000 }}>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText="Healthcare Chatbot"
      />
    </div>
  );
};

export default ChatbotUi;