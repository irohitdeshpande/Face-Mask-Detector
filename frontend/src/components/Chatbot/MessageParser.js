class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    if (message.toLowerCase().includes("hello")) {
      this.actionProvider.handleHello();
    } else {
      this.actionProvider.handleDefault(message);
    }
  }
}

export default MessageParser;
