import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
// import store from "../store/index.js";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    // beforeEnter(to, from, next) {
    //   if (store.state.token) {
    //     next();
    //   } else {
    //     next()
    //     store.commit("getCredentials");
    //     if (store.state.token) {
    //       next();
    //     } else {
    //       next("/");
    //     }
    //   }
    // }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
