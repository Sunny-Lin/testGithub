import { XhrObject } from 'tp-common'

export default {
  getGroupData: new XhrObject({
    name: '获取脚本分组数据',
    serverName: 'default-base',
    isBase: true,
    path: '/eventGroup/list',
    method: 'get',
    params: []
  }),
  addGroup: new XhrObject({
    name: '新增分组',
    serverName: 'default-base',
    contentType: 'application/json',
    method: 'post',
    path: '/eventGroup/create',
    isBase: true,
    sourceData: true,
    useData: true,
    data: []
  }),
  delGroup: new XhrObject({
    name: '删除分组',
    serverName: 'default-base',
    // contentType: 'application/x-www-form-urlencoded',
    method: 'DELETE',
    path: '/eventGroup/delete',
    isBase: true,
    params: [{ name: 'id' }]
  })
}
