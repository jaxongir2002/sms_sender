import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import PrimeVue from 'primevue/config';
import "primevue/resources/primevue.min.css";
import ToastService from 'primevue/toastservice';

//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";
import FocusTrap from 'primevue/focustrap';
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.directive('focustrap', FocusTrap);
app.use(router)
app.use(ToastService);
app.use(PrimeVue, { inputStyle: "filled" });

app.mount('#app')
