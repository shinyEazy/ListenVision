import NoFoundPage from "pages/404";
import HomePage from "pages/Homepage";
import Landing from "pages/Landing";
import News from "pages/News";
import Books from "pages/Books";
import New from "pages/New";
import Book from "pages/Book";
import NewList from "pages/NewList";
import BookList from "pages/BookList";

const routes = [
  {
    path: "/news",
    component: News,
  },
  {
    path: "/news/:categoryName/:page",
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
    path: "/books/:categoryName/:page",
    component: BookList,
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
