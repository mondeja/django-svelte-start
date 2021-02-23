import "./../css/global.css";

import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: JSON.parse(document.getElementById("app-props").textContent),
});

export default app;
