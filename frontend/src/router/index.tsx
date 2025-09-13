import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import { useAuth } from "../AuthProvider";
import ChatbotUi from "../components/Chatbot/Chatbot";

const Router = () => {
  const {isAuthenticated} = useAuth();
  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <Routes>
        {routes.map((routeItem) => {
          const Component = lazy(() => import(`../pages/${routeItem.component}`));
          // Handle multiple paths by creating multiple routes
          const paths = Array.isArray(routeItem.path) ? routeItem.path : [routeItem.path];
          return paths.map((path) => (
            <Route
              key={`${routeItem.component}-${path}`}
              path={path}
              element={<Component />}
            />
          ));
        })}
      </Routes>
      {isAuthenticated && (<ChatbotUi />)}
      <Footer />
    </Suspense>
  );
};

export default Router;
