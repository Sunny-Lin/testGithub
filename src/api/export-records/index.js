import { XhrObject } from 'tp-common'

export default {
  getTableData: new XhrObject({
    name: '获取导出记录列表数据',
    serverName: 'default-base',
    // contentType: 'application/json',
    isBase: true,
    path: '/dbstructure/log/list',
    method: 'get',
    params: [
      { name: 'index' },
      { name: 'size' },
      { name: 'name' },
      { name: 'version' },
      { name: 'timeFrom' },
      { name: 'timeTo' },
      { name: 'oper' },
      { name: 'desc' }
    ]
  })
}
