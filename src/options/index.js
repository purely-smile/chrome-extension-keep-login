import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './components/App'
import 'ant-design-vue/dist/antd.css'

Vue.use(Antd)
// eslint-disable-next-line
new Vue({
  el: '#root',
  render: h => h(App),
})
