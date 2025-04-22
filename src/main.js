import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import HomeView from "@/views/HomeView.vue";
import TasksView from "@/views/TasksView.vue";
import SettingsVue from "@/views/SettingsVue.vue";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/tasks',
    component: TasksView,
  },
  {
    path: '/settings',
    component: SettingsVue
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App)
  .use(router)
  .mount('#app')
