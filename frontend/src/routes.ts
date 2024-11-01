import NoFoundPage from "pages/404";
import HomePage from "pages/Homepage";
import Landing from "pages/Landing";

const routes = [
  { path: "/landing", component: Landing },
  {
    path: "",
    component: HomePage,
  },
  { path: "*", component: NoFoundPage },
];

export default routes;
