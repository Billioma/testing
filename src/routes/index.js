import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import {
  AuthLayout,
  NonAuthLayout,
} from "../components/layout/Customer/PageLayout";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";

const PublicRouteWrapper = () => {
  const routes = useRoutes(PUBLIC_ROUTES);
  return routes;
};

const PrivateRouteWrapper = () => {
  const routes = useRoutes(PRIVATE_ROUTES);
  return routes;
};

const Pages = () => {
  const user = sessionStorage.getItem("user");
  const location = useLocation();
  return location.pathname.includes("operator") ? (
    user ? (
      <PrivateRouteWrapper key={location.pathname} />
    ) : (
      <NonAuthLayout>
        <PublicRouteWrapper key={location.pathname} />
      </NonAuthLayout>
    )
  ) : user ? (
    <AuthLayout>
      <PrivateRouteWrapper key={location.pathname} />
    </AuthLayout>
  ) : (
    <NonAuthLayout>
      <PublicRouteWrapper key={location.pathname} />
    </NonAuthLayout>
  );
};

export default Pages;
