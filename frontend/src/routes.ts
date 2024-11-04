import NoFoundPage from "pages/404";
import HomePage from "pages/Homepage";
import Landing from "pages/Landing";
import News from "pages/News";
import Books from "pages/Books";

const routes = [
  {
    path: "/books",
    component: Books,
  },
  {
    path: "/news",
    component: News,
  },
  {
    path: "/landing",
    component: Landing,
  },
  {
    path: "",
    component: HomePage,
  },
  {
    path: "*",
    component: NoFoundPage,
  },
];

export default routes;
