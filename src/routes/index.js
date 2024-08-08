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
import {
  AuthLayout as OperatorAuthLayout,
  NonAuthLayout as OperatorNonAuthLayout,
} from "../components/layout/Operator/PageLayout";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "./routes";
import {
  AuthLayout as AdminAuthLayout,
  NonAuthLayout as AdminNonAuthLayout,
} from "../components/layout/Admin/PageLayout";
import {
  AuthLayout as AnalyticsAuthLayout,
  NonAuthLayout as AnalyticsNonAuthLayout,
} from "../components/layout/Analytics/PageLayout";

const PublicRouteWrapper = () => {
  const routes = useRoutes(PUBLIC_ROUTES);
  return routes;
};

const PrivateRouteWrapper = () => {
  const routes = useRoutes(PRIVATE_ROUTES);
  return routes;
};

const Pages = () => {
  const admin = localStorage.getItem("admin");
  const customer = localStorage.getItem("customer");
  const operator = localStorage.getItem("operator");
  const client = localStorage.getItem("client");
  const location = useLocation();
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
  ) : location.pathname.includes("analytics") ? (
    admin ? (
      <AnalyticsAuthLayout>
        <PrivateRouteWrapper key={location.pathname} />
      </AnalyticsAuthLayout>
    ) : (
      <AnalyticsNonAuthLayout>
        <PublicRouteWrapper key={location.pathname} />
      </AnalyticsNonAuthLayout>
    )
  ) : location.pathname.includes("client") ? (
    client ? (
      <ClientAuthLayout>
        <PrivateRouteWrapper key={location.pathname} />
      </ClientAuthLayout>
    ) : (
      <ClientNonAuthLayout>
        <PublicRouteWrapper key={location.pathname} />
      </ClientNonAuthLayout>
    )
  ) : location.pathname.includes("operator") ? (
    operator ? (
      <OperatorAuthLayout>
        <PrivateRouteWrapper key={location.pathname} />
      </OperatorAuthLayout>
    ) : (
      <OperatorNonAuthLayout>
        <PublicRouteWrapper key={location.pathname} />
      </OperatorNonAuthLayout>
    )
  ) : customer ? (
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
