import { lazy } from "react";
import WithSuspense from "../components/loaders/WithSuspense";
import { PATHS } from "./constants";
import { Navigate } from "react-router-dom";

const { HOME } = PATHS;

const Home = WithSuspense(lazy(() => import("../pages/Home")));

export const ROUTES = [
  { path: HOME, element: <Home /> },
  { path: "*", element: <Navigate to="/" replace /> },
];
