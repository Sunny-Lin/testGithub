import { TpcTableAction } from 'tp-common'

let columns = that => [
  {
    title: '序号',
    align: 'center',
    width: 80,
    render: (h, params) => {
      let indexVal = params.index + 1
      return h('div', [h('span', {}, indexVal)])
    }
  },
  {
    title: '文件名称',
    key: 'fileName',
    align: 'center'
  },
  {
    title: '上传时间',
    key: 'createTime',
    align: 'center'
  },
  {
    title: '状态',
    key: 'status',
    align: 'center',
    render: (h, params) => {
      const data = {
        1: '上传中',
        2: '上传成功',
        3: '上传失败'
      }

      return h('div', {}, data[`${params.row.status}`])
    }
  },
  {
    title: '操作',
    align: 'center',
    width: 200,
    render: (h, { row }) => {
      if (row.status === 2) {
        return h(TpcTableAction, {
          props: {
            actionList: [
              {
                text: '下载',
                hType: 'down'
              }
            ]
          },
          on: {
            update: ({ type, event }) => {
              switch (type) {
                case 'down': {
                  // console.log(row.besId)
                  that.downLoad(row.besId)
                  break
                }
              }
            }
          }
        })
      } else {
        return h('div', {}, '/')
      }
    }
  }
]

export default columns
