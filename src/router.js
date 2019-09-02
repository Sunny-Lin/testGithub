import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/scripts-group',
      name: '版本管理',
      meta: {
        title: '版本管理',
        routeType: 'outer'
      },
      component: () =>
        import(/* webpackChunkName: "scripts-group" */ './views/scripts-group')
    },
    {
      path: '/scripts-management',
      name: '数据库结构管理',
      meta: {
        title: '数据库结构管理',
        routeType: 'outer'
      },
      component: () =>
        import(
          /* webpackChunkName: "scripts-management" */ './views/scripts-management'
        )
    },
    {
      path: '/monitoring-data',
      name: '数据版本管理',
      meta: {
        title: '数据版本管理',
        routeType: 'outer'
      },
      component: () =>
        import(
          /* webpackChunkName: "monitoring-data" */ './views/monitoring-data'
        )
    },
    {
      path: '/structural-comparison',
      name: '多环境数据库结构对比',
      meta: {
        title: '多环境数据库结构对比',
        routeType: 'outer'
      },
      component: () =>
        import(
          /* webpackChunkName: "structural-comparison" */ './views/structural-comparison/index.vue'
        )
    },
    {
      path: '/export-database',
      name: '导出数据库结构',
      meta: {
        title: '导出数据库结构',
        routeType: 'outer'
      },
      component: () =>
        import(
          /* webpackChunkName: "export-database" */ './views/export-database/index.vue'
        )
    },
    {
      path: '/export-records',
      name: '导出数据库记录',
      meta: {
        title: '导出数据库记录',
        routeType: 'outer'
      },
      component: () =>
        import(
          /* webpackChunkName: "export-records" */ './views/export-records/index.vue'
        )
    },
{
  path: '/import-records',
    name: '导入数据库记录',
  meta: {
  title: '导入数据库记录',
    routeType: 'outer'
},
  component: () =>
  import(
    /* webpackChunkName: "import-records" */ './views/import-records/index.vue'
    )
},
    {
      path: '/terminology-import',
      name: '标准术语导入',
      meta: {
        title: '标准术语导入',
        routeType: 'outer'
      },
      component: () =>
        import(
          /* webpackChunkName: "terminology-import" */ './views/terminology-import/index.vue'
        )
    },
    {
      path: '/regular-import',
      name: '后结构化-诊断正则导入',
      meta: {
        title: '后结构化-诊断正则导入',
        routeType: 'outer'
      },
      component: () =>
        import(
          /* webpackChunkName: "regular-import" */ './views/regular-import/index.vue'
        )
    },
    {
      path: '/synonym-import',
      name: '同义词导入',
      meta: {
        title: '同义词导入',
        routeType: 'outer'
      },
      component: () =>
        import(
          /* webpackChunkName: "synonym-import" */ './views/synonym-import/index.vue'
        )
    }
  ]
})
