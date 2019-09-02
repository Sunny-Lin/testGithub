import { XhrObject } from 'tp-common'

export default {
  uploadTYCExcel: new XhrObject({
    name: '上传Excel同义词文件',
    serverName: 'kinship-domain',
    contentType: 'multipart/form-data',
    isBase: true,
    path: '/uploadTYCExcel',
    method: 'post',
    useData: true,
    sourceData: true,
    data: []
  }),
  getClass: new XhrObject({
    name: '获取同义词分类列表',
    serverName: 'kinship-domain',
    isBase: true,
    path: '/findAllSyType',
    method: 'get',
    params: []
  })
}
