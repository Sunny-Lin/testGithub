import { XhrObject } from 'tp-common'

export default {
  getExport: new XhrObject({
    name: '数据库结构导出',
    serverName: 'default-base',
    contentType: 'application/json',
    isBase: true,
    path: '/dbstructure/export',
    method: 'get',
    // useData: true,
    // sourceData: true,
    params: [{ name: 'desc' }, { name: 'version' }]
  })
}
