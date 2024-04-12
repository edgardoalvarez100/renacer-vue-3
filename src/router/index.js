import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CancionesView from "../views/CancionesView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/canciones", name: "canciones", component: CancionesView },
];

const router = createRouter({
  linkExactActiveClass: "active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export { router };
