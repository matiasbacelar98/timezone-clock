import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { HiRefresh, MdKeyboardarrowup, MdKeyboardarrowdownTwotone, MdWbsunnyRound, RiMoonFill } from 'oh-vue-icons/icons';

addIcons(HiRefresh, MdKeyboardarrowup, MdKeyboardarrowdownTwotone, MdWbsunnyRound, RiMoonFill);

const app = createApp(App);
app.component('v-icon', OhVueIcon);
app.use(router);
app.mount('#app');
