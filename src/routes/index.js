import React from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { ROUTES } from "./routes";
import PageLayout from "../components/layout/PageLayout";

const RouteWrapper = () => {
  const routes = useRoutes(ROUTES);
  return routes;
};

const Pages = () => {
  const location = useLocation();
  return (
    <PageLayout>
      <RouteWrapper key={location.pathname} />
    </PageLayout>
  );
};

export default Pages;
