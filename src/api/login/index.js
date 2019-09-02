import { XhrObject } from 'tp-common'

export default {
  login: new XhrObject({
    name: '登录',
    serverName: 'default-base',
    contentType: 'application/json',
    method: 'post',
    path: '/login',
    isBase: true,
    useData: true,
    data: [{
      name: 'loginname'
    }, {
      name: 'password'
    }]
  })
}
