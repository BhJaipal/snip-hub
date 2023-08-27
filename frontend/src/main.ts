import App from "./App.vue";
import Home from "./components/Home/index.vue";
import About from "./components/About.vue";
import { createApp } from 'vue';
import { createRouter, createWebHistory } from "vue-router";
import "./index.css"
import './style.css';

let app= createApp(App);
app.use(createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", name: "Home", component: Home},
        {path: "/about", name: "About", component: About}
    ]
}));
app.mount("#app");
