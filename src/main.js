import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css"

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/stackoverflow-light.css'
import 'highlight.js/lib/common';
import hljsVuePlugin from "@highlightjs/vue-plugin";

const app = createApp(App)

app.use(router)

app.use(hljsVuePlugin)

hljs.highlightAll();

app.mount('#app')