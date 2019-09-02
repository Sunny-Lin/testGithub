import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import tpCommon from 'tp-common'
import 'tp-common/dist/tp-common/tp-common.css'
import servers from './systemConfig/domain-servers'
import menu from './systemConfig/menu'

Vue.use(iView)
Vue.use(tpCommon, {
  router,
  store,
  options: {
    frame: { menu },
    platform: {
      platformName: '版本配置管理系统',
      getHospitalInfo: false,
      showPlatformLogo: false
    },
    domain: { servers, dynamicServer: { url: '/login/getDomainUrl', codeKey: 'code', responseUrlPath: 'data' } },
    login: { simpleLogin: true }
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
