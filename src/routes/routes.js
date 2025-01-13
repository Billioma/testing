import { lazy } from "react";
import WithSuspense from "../components/loaders/WithSuspense";
import { PATHS } from "./constants";
import { Navigate } from "react-router-dom";

const { HOME, OPERATOR, CONTACT, LOGIN, TERMS, FAQ } = PATHS;

const Home = WithSuspense(lazy(() => import("../pages/Home")));
const Contact = WithSuspense(lazy(() => import("../pages/Contact")));
const Operator = WithSuspense(lazy(() => import("../pages/Operator")));
const Auth = WithSuspense(lazy(() => import("../pages/Auth")));
const Faq = WithSuspense(lazy(() => import("../pages/Faq")));
const Terms = WithSuspense(lazy(() => import("../pages/Terms")));

export const ROUTES = [
  { path: HOME, element: <Home /> },
  { path: OPERATOR, element: <Operator /> },
  { path: CONTACT, element: <Contact /> },
  { path: LOGIN, element: <Auth /> },
  { path: FAQ, element: <Faq /> },
  { path: TERMS, element: <Terms /> },
  { path: "*", element: <Navigate to="/" replace /> },
];
