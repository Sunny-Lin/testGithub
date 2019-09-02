import { XhrObject } from 'tp-common'

export default {
  getEventTableData: new XhrObject({
    name: '获取脚本列表数据',
    serverName: 'default-base',
    isBase: true,
    path: '/event/list',
    method: 'get',
    params: [
      { name: 'index' },
      { name: 'size' },
      { name: 'groupId' },
      { name: 'timeFrom' },
      { name: 'timeTo' },
      { name: 'screen' },
      { name: 'updateDateFrom' },
      { name: 'updateDateTo' }
    ]
  }),
  getEventMore: new XhrObject({
    name: '获取脚本详情',
    serverName: 'default-base',
    contentType: 'application/json',
    isBase: true,
    path: '/event/detail',
    method: 'get',
    params: [{ name: 'id' }]
  }),
  eventMark: new XhrObject({
    name: '标记更新',
    serverName: 'default-base',
    contentType: 'application/json',
    isBase: true,
    path: '/event/mark',
    sourceData: true,
    method: 'put',
    useData: true,
    data: []
  }),
  addScript: new XhrObject({
    name: '新增脚本',
    serverName: 'default-base',
    contentType: 'application/json',
    path: '/event/updateStudent',
    method: 'put',
    isBase: true,
    sourceData: true,
    useData: true,
    data: []
  }),
  getExportData: new XhrObject({
    name: '导出txt文件',
    serverName: 'default-base',
    isBase: true,
    path: '/event/export',
    method: 'get',
    params: [
      { name: 'timeFrom' },
      { name: 'timeTo' },
      { name: 'groupId' },
      { name: 'idList' }
    ]
  }),
  test: new XhrObject({
    name: 'test',
    serverName: 'default-base',
    contentType: 'application/json',
    isBase: true,
    path: 'xxx',
    method: 'post',
    sourceData: true,
    useData: true,
    data: []
  })
}
