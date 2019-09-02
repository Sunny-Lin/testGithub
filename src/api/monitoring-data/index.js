import { XhrObject } from 'tp-common'

export default {
  getMonitorData: new XhrObject({
    name: '获取数据变动列表数据',
    serverName: 'default-base',
    isBase: true,
    path: '/monitor/list',
    method: 'get',
    params: [
      { name: 'index' },
      { name: 'size' },
      { name: 'screen' },
      { name: 'tableName' },
      { name: 'groupId' },
      { name: 'timeTo' },
      { name: 'timeFrom' },
      { name: 'describe' }
    ]
  }),
  delMonitor: new XhrObject({
    name: '删除数据变动',
    serverName: 'default-base',
    // contentType: 'application/json',
    method: 'DELETE',
    path: '/monitor/delete',
    isBase: true,
    params: [{ name: 'id' }]
  }),
  getExportData: new XhrObject({
    name: '导出dmp文件',
    serverName: 'default-base',
    isBase: true,
    path: '/monitor/export',
    method: 'get',
    params: [
      { name: 'screen' },
      { name: 'tableName' },
      { name: 'groupId' },
      { name: 'timeTo' },
      { name: 'timeFrom' },
      { name: 'describe' },
      { name: 'idList' }
    ]
  }),
  eventMark: new XhrObject({
    name: '标记更新',
    serverName: 'default-base',
    contentType: 'application/json',
    isBase: true,
    path: '/monitor/mark',
    sourceData: true,
    method: 'put',
    useData: true,
    data: []
  }),
  add: new XhrObject({
    name: '新增',
    serverName: 'default-base',
    contentType: 'application/json',
    isBase: true,
    path: '/monitor/create',
    // sourceData: true,
    method: 'post',
    useData: true,
    data: [{ name: 'groupId' }, { name: 'tableOwner' }, { name: 'tableName' }]
  })
}
