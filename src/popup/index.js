import Vue from 'vue'
import App from './components/App'
import store from './store'
import router from './router'

// eslint-disable-next-line
new Vue({
  el: '#root',
  render: h => h(App),
  store,
  router,
})
