import { XhrObject } from 'tp-common'

export default {
  uploadAndSaveRegxExcel: new XhrObject({
    name: '上传正则Excel文件',
    serverName: 'kinship-domain',
    contentType: 'multipart/form-data',
    isBase: true,
    path: '/uploadAndSaveRegxExcel',
    method: 'post',
    useData: true,
    sourceData: true,
    data: []
  })
}
