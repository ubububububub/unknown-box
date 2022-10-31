import { qs } from "./utils/index.js";
import routes from "./router/index.js";

const navigateTo = url => {
  window.history.pushState(null, null, url);
  App();
};

const App = async () => {
  const pageMatches = routes.map(route => {
    return {
      route,
      isMatch: route.path === window.location.pathname,
    };
  });

  let match = pageMatches.find(pageMatch => pageMatch.isMatch);

  if (!match) {
    match = {
      route: routes[routes.length - 1],
      isMatch: true,
    };
  }

  new match.route.view(qs("#app"));
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
