import { TpcTableAction } from 'tp-common'

let columns = that => [
  {
    type: 'selection',
    width: 60,
    align: 'center'
  },
  {
    title: '分组名称',
    key: 'groupName',
    align: 'center'
  },
  {
    title: '拥有者',
    key: 'owner',
    align: 'center'
  },
  {
    title: '对象名称',
    key: 'obbjname',
    align: 'center'
  },
  {
    title: '对象类型',
    key: 'objtype',
    align: 'center'
  },
  {
    title: '时间',
    key: 'time',
    align: 'center'
  },
  {
    title: '标记用户名',
    key: 'markUserName',
    align: 'center'
  },
  {
    title: '标记时间',
    key: 'markDate',
    align: 'center'
  },
  {
    title: '事件',
    key: 'event',
    align: 'center'
  },
  {
    title: '用户名',
    key: 'username',
    align: 'center'
  },
  {
    title: '脚本',
    key: 'sqlText',
    slot: 'sqlText',
    align: 'center'
  },
  // {
  //   title: '状态',
  //   key: 'status',
  //   align: 'center',
  //   render: (h, { row }) => {
  //     let indexVal = row.status === 1 ? '正常' : row.status === 9 ? '删除' : ''
  //     return h('div', [h('span', {}, indexVal)])
  //   }
  // },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: 150,
    render: (h, { row }) => {
      let actionList = [
        {
          text: '查看详情',
          hType: 'look'
        },
        {
          text: '标记',
          hType: 'mark'
        },
        // {
        //   text: '修改',
        //   hType: 'edit'
        // },
        {
          text: '删除',
          hType: 'delete',
          color: '#ff3333'
        }
      ]
      return h(TpcTableAction, {
        props: {
          actionList
        },
        on: {
          update: ({ type }) => {
            switch (type) {
              case 'look': {
                that.type = 'look'
                that.clickRow = row
                that.fill.modal = true
                break
              }
              case 'mark': {
                that.clickRow = row
                that.markModal.markModalState = true
                // that.mark(row)
                break
              }
              case 'edit': {
                that.type = 'edit'
                that.clickRow = row
                that.fill.modal = true
                break
              }
              case 'delete': {
                that.clickRow = row
                that.delModal = true // 显示删除提示弹窗
                break
              }
            }
          }
        }
      })
    }
  }
]

export default columns
