import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import {
  AuthLayout,
  NonAuthLayout,
} from "../components/layout/Customer/PageLayout";
import {
  AuthLayout as ClientAuthLayout,
  NonAuthLayout as ClientNonAuthLayout,
} from "../components/layout/Client/PageLayout";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import {
  AuthLayout as AdminAuthLayout,
  NonAuthLayout as AdminNonAuthLayout,
} from "../components/layout/Admin/PageLayout";

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
  ) : location.pathname.includes("admin") ? (
    user ? (
      <AdminAuthLayout>
        <PrivateRouteWrapper key={location.pathname} />
      </AdminAuthLayout>
    ) : (
      <AdminNonAuthLayout>
        <PublicRouteWrapper key={location.pathname} />
      </AdminNonAuthLayout>
    )
  ) : location.pathname.includes("client") ? (
    user ? (
      <ClientAuthLayout>
        <PrivateRouteWrapper key={location.pathname} />
      </ClientAuthLayout>
    ) : (
      <ClientNonAuthLayout>
        <PublicRouteWrapper key={location.pathname} />
      </ClientNonAuthLayout>
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
