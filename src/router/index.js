import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/data",
    name: "data",

    component: () => import(/* webpackChunkName: "data" */ "../views/Data.vue")
  },
  {
    path: "/feed",
    name: "feed",

    component: () => import(/* webpackChunkName: "feed" */ "../views/Feed.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
