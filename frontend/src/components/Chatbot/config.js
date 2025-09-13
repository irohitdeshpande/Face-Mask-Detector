import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "HealthcareBot",
  initialMessages: [
    createChatBotMessage("Hello! I'm your healthcare assistant. How can I help you today?")
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#1976d2",
    },
    chatButton: {
      backgroundColor: "#1976d2",
    },
  },
};

export default config;
