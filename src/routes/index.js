import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { AuthLayout, NonAuthLayout } from "../layout/Staff/PageLayout";
import {
  AuthLayout as AdminAuthLayout,
  NonAuthLayout as AdminNonAuthLayout,
} from "../layout/Admin/PageLayout";
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
  const location = useLocation();
  const staff = localStorage.getItem("staff");
  const admin = localStorage.getItem("admin");

  return location.pathname.includes("admin") ? (
    admin ? (
      <AdminAuthLayout>
        <PrivateRouteWrapper key={location.pathname} />
      </AdminAuthLayout>
    ) : (
      <AdminNonAuthLayout>
        <PublicRouteWrapper key={location.pathname} />
      </AdminNonAuthLayout>
    )
  ) : staff ? (
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
