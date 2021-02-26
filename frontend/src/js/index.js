import "normalize.css";
import "./../css/index.css";

import App from "./index.svelte";

const app = new App({
  target: document.body,
  props: JSON.parse(document.getElementById("app-props").textContent),
});

export default app;
