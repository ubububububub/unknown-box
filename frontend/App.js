import { qs } from "./utils/index.js";
import routes from "./router/index.js";

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
      params.push(parsedPath[1]);
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
  }

  new match.route.view(qs("#app"), ...params);
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
