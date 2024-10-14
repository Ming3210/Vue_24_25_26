import "./assets/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { createApp } from "vue";
import App from "./App.vue";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

library.add(faTrash, faPen);

app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
