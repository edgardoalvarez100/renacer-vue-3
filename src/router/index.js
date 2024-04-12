import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import CancionesView from "../views/CancionesView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import { useUserStore } from "@/stores/user";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  await userStore.currentUser();

  if (userStore.user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession = false;
};

const routes = [
  { path: "/", name: "home", component: HomeView, beforeEnter: requireAuth },
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
