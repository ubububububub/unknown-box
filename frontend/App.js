import { qs } from "./utils/index.js";
import routes from "./router/index.js";
import { Header } from "./components/Layout/header.js";
import { Footer } from "./components/Layout/footer.js";

const navigateTo = url => {
  window.history.pushState(null, null, url);
  App();
};

const pathToRegex = path =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const App = async () => {
  const params = [];
  const pageMatches = routes.map(route => {
    const parsedPath = window.location.pathname.match(pathToRegex(route.path));

    if (parsedPath) {
      params.push(...parsedPath.filter((param, idx) => idx !== 0));
    }
    return {
      route,
      result: parsedPath
    };
  });

  let match = pageMatches.find(pageMatch => pageMatch.result);

  if (!match) {
    match = {
      route: routes[routes.length - 1],
      result: true
    };
  } else if (!match.route.isPublic && !localStorage.getItem("accessToken")) {
    match = {
      route: routes[2],
      result: true
    };
  } else if (match.route?.isAdmin && localStorage.getItem("role") !== "admin") {
    match = {
      route: routes[routes.length - 1],
      result: true
    };
  }

  new Header(qs("#header"));
  new match.route.view(qs("#app"), params);
  new Footer(qs("#footer"));
};

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  App();
});
