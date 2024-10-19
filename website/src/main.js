// import './assets/main.css'
// import '@/assets/style.css'

// import '@/assets/css/materialize.min.css'
// import '@/assets/js/materialize.min.js'
// import 'material-icons/iconfont/material-icons.css'

import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import useLocalStorage from './store/useLocalStorage'
import Rating from 'primevue/rating'
import CoreuiVue from '@coreui/vue'
import '@coreui/coreui/dist/css/coreui.min.css'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import { initializeApp } from 'firebase/app'

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyDh5N8DPg99pLZUiJL63w5XC4YCEGa-N84',
//   authDomain: 'communitycare-5ca3a.firebaseapp.com',
//   projectId: 'communitycare-5ca3a',
//   storageBucket: 'communitycare-5ca3a.appspot.com',
//   messagingSenderId: '772383040794',
//   appId: '1:772383040794:web:ab7fcacce0e038a99678a3'
// }

// // Initialize Firebase
// initializeApp(firebaseConfig)

// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
app.use(store)
app.use(CoreuiVue)

// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')
