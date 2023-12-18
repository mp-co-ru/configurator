import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";
import { createPinia } from "pinia";
import naive from "naive-ui";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import {
  faUserSecret,
  faFolderClosed,
  faFolderOpen,
  faClose,
  faCog,
  faMagnifyingGlass,
  faBox,
  faTrash,
  faPlus,
  faEllipsis,
  faGear,
  faPen,
  faDatabase,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faUserSecret,
  faFolderClosed,
  faFolderOpen,
  faClose,
  faCog,
  faMagnifyingGlass,
  faBox,
  faTrash,
  faPen,
  faPlus,
  faEllipsis,
  faGear,
  faDatabase,
  faBell
);

const pinia = createPinia();

export const app = createApp(App)
  .use(pinia)
  .use(naive)
  .component("fa-icon", FontAwesomeIcon)
  .mount("#hierarchy-app");
