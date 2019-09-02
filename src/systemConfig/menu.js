let menu = [
  {
    active: false,
    childList: [
      {
        active: false,
        name: '版本管理',
        url: '/scripts-group',
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '版本管理'
        },
        childList: []
      }
    ],
    collapsed: false,
    name: '版本配置管理',
    url: '/',
    image: '',
    static: true,
    title: '版本配置管理'
  },
  {
    active: false,
    childList: [
      {
        active: false,
        name: '数据库结构管理',
        url: '/scripts-management',
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '数据库结构管理'
        },
        childList: []
      },
      {
        active: false,
        name: '数据版本管理',
        url: '/monitoring-data',
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '数据版本管理'
        },
        childList: []
      },
      {
        active: false,
        name: '多环境数据库结构对比',
        url: '/structural-comparison',
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '多环境数据库结构对比'
        },
        childList: []
      },
      {
        active: false,
        name: '导出数据库结构',
        url: '/export-database',
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '导出数据库结构'
        },
        childList: []
      },
      {
        active: false,
        name: '导出数据库记录',
        url: '/export-records',
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '导出数据库记录'
        },
        childList: []
      },
      {
        active: false,
        name: '导入数据库记录',
        url: '/import-records',
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '导入数据库记录'
        },
        childList: []
      }
    ],
    collapsed: false,
    name: '数据库脚本管理',
    url: '/',
    image: '',
    static: true,
    title: '数据库脚本管理'
  },
  {
    active: false,
    childList: [
      {
        active: false,
        name: '标准术语导入',
        url: '/terminology-import',
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '标准术语导入'
        },
        childList: []
      },
      {
        active: false,
        name: '后结构化-诊断正则导入',
        url: '/regular-import',
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '后结构化-诊断正则导入'
        },
        childList: []
      },
      {
        active: false,
        name: '同义词导入',
        url: '/synonym-import',
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '同义词导入'
        },
        childList: []
      }
    ],
    collapsed: false,
    name: '数据版本管理',
    url: '/',
    image: '',
    static: true,
    title: '数据版本管理'
  }
]
// 注意，如果要在tab显示菜单，对应的路由地址要设置
// meta: {
//       routeType: 'outer',
// }

export default menu
