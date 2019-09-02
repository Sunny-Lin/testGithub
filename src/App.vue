<template>
  <div id="app">
    <tpc-frame-view v-if="$store.state.user.isLogin">
      <router-view />
    </tpc-frame-view>
    <tpc-login :login="login" v-else></tpc-login>
  </div>
</template>
<script>
import api from '@/api/login'

export default {
  name: 'home',
  components: {},
  created () {
    // this.$router.push({ name: this.$store.state.frame.sideNav.menuList[0].children[0].name })
  },
  methods: {
    async login ({ userName, userPassword }) {
      // console.log(userName)
      // console.log(userPassword)
      let res = await api.login.connect({ loginname: userName, password: userPassword })
      if (res.data.code === 1) {
        this.$store.commit('setUserData', res.data.data)
        this.$router.push({ name: this.$store.state.frame.sideNav.menuList[0].children[0].name })

        return { success: true, userName: userName, userPassword }
      } else {
        this.$Notice.error({ title: '登陆失败', desc: res.data.msg })
        return { success: false }
      }
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
