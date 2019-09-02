let menu = [
  {
    active: false,
    childList: [
      {
        active: false,
        name: '测试菜单',
        url: '',          //菜单路径，文件夹
        type: -1,
        image: '',
        tag: '',
        meta: {
          routeType: 'outer',
          title: '测试菜单'
        }
      }
    ],
    collapsed: false,
    name: '测试菜单',
    url: '/',
    image: '',
    static: true,
    title: '测试'
  }
]
// 注意，如果要在tab显示菜单，对应的路由地址要设置
// meta: {
//       routeType: 'outer',
// }
// let menu = []
export default menu
