import { XhrObject } from 'tp-common'

export default {
  getTest: new XhrObject({
    name: '测试数据库连接信息是否有效',
    serverName: 'default-base',
    contentType: 'application/json',
    isBase: true,
    path: '/conn/test',
    method: 'post',
    useData: true,
    data: [
      { name: 'host' },
      { name: 'port' },
      { name: 'serviceName' },
      { name: 'user' },
      { name: 'pwd' },
      { name: 'type' }
    ]
  }),
  getListData: new XhrObject({
    name: '获取列表数据',
    serverName: 'default-base',
    contentType: 'application/json',
    isBase: true,
    path: '/conn/list',
    method: 'get',
    params: [{ name: 'owner' }, { name: 'tableName' }]
  }),
  getContrast: new XhrObject({
    name: '对比',
    serverName: 'default-base',
    contentType: 'application/json',
    isBase: true,
    path: '/conn/dbMatch',
    method: 'post',
    useData: true,
    data: [
      { name: 'param' }
    ]
  })
}
