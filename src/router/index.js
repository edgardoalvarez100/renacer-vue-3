import { createWebHistory, createRouter } from "vue-router";
import { storeToRefs } from "pinia";

import HomeView from "../views/HomeView.vue";
import CancionesView from "../views/CancionesView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import { useUserStore } from "@/stores/user";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  const { loadingSession, user } = storeToRefs(userStore);
  loadingSession.value = true;
  await userStore.currentUser();
  if (user.value) {
    next();
  } else {
    next("/login");
  }
  loadingSession.value = false;
};

const routes = [
  { path: "/", name: "home", component: HomeView, beforeEnter: requireAuth },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/login", name: "login", component: LoginView },
  {
    path: "/canciones",
    name: "canciones",
    component: CancionesView,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  linkExactActiveClass: "active",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export { router };
