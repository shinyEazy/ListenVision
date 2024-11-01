import NoFoundPage from "pages/404";
import HomePage from "pages/Homepage";

const routes = [
  {
    path: "",
    component: HomePage,
  },
  { path: "*", component: NoFoundPage },
];

export default routes;
