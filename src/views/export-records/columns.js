
let columns = that => [
  {
    title: '版本号',
    key: 'version',
    align: 'center'
  },
  {
    title: '创建时间',
    key: 'time',
    align: 'center'
  },
  {
    title: '日志类型',
    key: 'oper',
    align: 'center'
  },
  {
    title: '描述',
    key: 'desc',
    align: 'center'
  },
  {
    title: '执行状态',
    key: 'status',
    align: 'center'
  }
  // {
  //   title: '状态',
  //   key: 'status',
  //   align: 'center',
  //   render: (h, { row }) => {
  //     let indexVal = row.status === 1 ? '正常' : row.status === 9 ? '删除' : ''
  //     return h('div', [h('span', {}, indexVal)])
  //   }
  // },
]

export default columns
