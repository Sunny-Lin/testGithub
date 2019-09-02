import { XhrObject } from 'tp-common'

export default {
  dmpFileUpload: new XhrObject({
    // name: '导入dmp',
    // serverName: 'default-base',
    // contentType: 'application/json',
    // isBase: true,
    // path: '/dmpFile/dmpFileUpload',
    // method: 'get',
    // // useData: true,
    // // sourceData: true,
    // params: []
    name: '导入dmp',
    serverName: 'default-base',
    contentType: 'multipart/form-data',
    isBase: true,
    path: '/dmpFile/dmpFileUpload',
    method: 'post',
    useData: true,
    sourceData: true,
    data: []
  })
}
