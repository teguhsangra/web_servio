import { createApp } from 'vue'
import { createHead } from "@vueuse/head"
import ToastPlugin from 'vue-toast-notification';
import VueCryptojs from 'vue-cryptojs'
import router from './routes/routes'
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "./assets/css/font-awesome.min.css";
import "./assets/css/style.css";
import "./assets/vendor/linericon/style.css";
import "./assets/css/responsive.css";
import "./assets/vendor/nice-select/nice-select.css";
import 'vue-toast-notification/dist/theme-sugar.css';

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
import App from './App.vue'



const head = createHead()

createApp(App)
    .use(router)
    .use(store)
    .use(VueCryptojs)
    .use(ToastPlugin, {
        // One of the options
        position: 'top'
    })
    .use(head)
    .mount('#app');
