import NoFoundPage from "pages/404";
import HomePage from "pages/Homepage";
import Landing from "pages/Landing";
import News from "pages/News";
import Books from "pages/Books";
import New from "pages/New";
import Book from "pages/Book";
import NewList from "pages/NewList";

const routes = [
  {
    path: "/news",
    component: News,
  },
  {
    path: "/category/:categoryName",
    component: NewList,
  },
  {
    path: "/new/:id",
    component: New,
  },
  {
    path: "/books",
    component: Books,
  },
  {
    path: "/book/:id",
    component: Book,
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
