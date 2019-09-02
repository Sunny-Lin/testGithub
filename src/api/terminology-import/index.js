import { XhrObject } from 'tp-common'

export default {
  uploadAndSaveBloodExcel: new XhrObject({
    name: '上传标准术语Excel文件',
    serverName: 'kinship-domain',
    contentType: 'multipart/form-data',
    isBase: true,
    path: '/uploadAndSaveBloodExcel',
    method: 'post',
    useData: true,
    sourceData: true,
    data: []
  }),
  getTableData: new XhrObject({
    name: '获取列表',
    serverName: 'kinship-domain',
    isBase: true,
    path: '/findAllBloodExcelStatus',
    method: 'get',
    params: [{ name: 'page' }, { name: 'size' }, { name: 'type' }]
  }),
  downLoadBloodReport: new XhrObject({
    name: '下载术语入库报告',
    serverName: 'kinship-domain',
    isBase: true,
    path: '/downLoadBloodReport',
    method: 'get',
    params: [{ name: 'id' }]
  })
}
