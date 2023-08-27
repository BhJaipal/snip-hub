import VueRouter from "vue-router";
import Home from "./components/Home/index.vue";
import About from "./components/About.vue";

const routes= [
    {path: "/", name: "Home", component: Home},
    {path: "/about", name: "About", component: About}
];

const router= new VueRouter({
    routes
});
export default router;
