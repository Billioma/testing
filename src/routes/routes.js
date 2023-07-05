import { lazy } from "react";
import WithSuspense from "../components/loaders/WithSuspense";
import { PATHS } from "./constants";
import { Navigate } from "react-router-dom";

const { HOME, OPERATOR } = PATHS;

const Home = WithSuspense(lazy(() => import("../pages/Home")));
const Operator = WithSuspense(lazy(() => import("../pages/Operator")));

export const ROUTES = [
  { path: HOME, element: <Home /> },
  { path: OPERATOR, element: <Operator /> },
  { path: "*", element: <Navigate to="/" replace /> },
];
