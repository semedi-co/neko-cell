import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/product",
      name: "List Product",
      component: () => import("../views/Product.vue"),
    },
    {
      path: "/product/:id",
      name: "Detail Product",
      component: () => import("../views/DetailProduct.vue"),
    },
    {
      path: "/login",
      name: "Detail Product",
      component: () => import("../views/Login.vue"),
    },
  ],
});

export default router;
