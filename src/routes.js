import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "Users",
            component: () => import("./components/Users"),
        },
        {
            path: "/users",
            name: "Users",
            component: () => import("./components/Users"),
        },
        {
            path: "/user/:id",
            name: "User",
            component: () => import("./components/User"),
        },
        {
            path: "/CijeliPopis",
            name: "CijeliPopis",
            component: () => import("./components/CijeliPopis"),
        },
        {
            path: "/Popis/:id",
            name: "Popis",
            component: () => import("./components/Popis"),
        },
        {
            path: "/rejting/:id",
            name: "Rejting",
            component: () => import("./components/Rejting"),
        },
    ]
});

export default router;