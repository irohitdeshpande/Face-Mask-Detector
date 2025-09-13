
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
  }

  handleHello = () => {
    const message = this.createChatBotMessage("Hi there! How can I assist you today?");
    this.setChatbotMessage(message);
  };

  handleDefault = async (userMessage) => {
    // Show loading message
    const loadingMsg = this.createChatBotMessage("Thinking...");
    this.setChatbotMessage(loadingMsg);

    if (!this.genAI) {
      const errorMsg = this.createChatBotMessage("Gemini API key is missing. Please set it in your .env.local file.");
      this.setChatbotMessage(errorMsg);
      return;
    }

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userMessage);
      const response = result.response.text();
      const message = this.createChatBotMessage(response);
      this.setChatbotMessage(message);
    } catch (error) {
      const errorMsg = this.createChatBotMessage("Sorry, I couldn't get a response from Gemini.");
      this.setChatbotMessage(errorMsg);
    }
  };

  setChatbotMessage = (message) => {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
}

export default ActionProvider;
