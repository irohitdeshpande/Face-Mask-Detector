import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import Router from "./router";
import i18n from "./translation";
import { AuthProvider } from "./AuthProvider";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
    <I18nextProvider i18n={i18n}>
      <Router />
    </I18nextProvider>
    </AuthProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
