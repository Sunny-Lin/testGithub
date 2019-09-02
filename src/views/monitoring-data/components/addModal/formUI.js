const data = [
  {
    label: '分组id',
    type: 'cascader',
    key: 'groupId',
    disabled: false,
    value: [],
    placeholder: '请选择分组',
    rules: {
      type: 'array',
      required: true,
      message: '请选择分组',
      trigger: 'change'
    }
  },
  {
    label: '用户名',
    type: 'string',
    key: 'tableOwner',
    disabled: false,
    value: '',
    placeholder: '请输入用户名',
    rules: { required: true, message: '请输入用户名', trigger: 'blur' }
  },
  {
    label: '表名',
    type: 'string',
    key: 'tableName',
    disabled: false,
    value: '',
    placeholder: '请输入表名',
    rules: { required: true, message: '请输入表名', trigger: 'blur' }
  }
  // {
  //   label: '描述',
  //   type: 'text',
  //   key: 'describe',
  //   disabled: false,
  //   value: '',
  //   placeholder: '请输入描述',
  //   rules: { required: false, message: '请输入描述', trigger: 'blur' }
  // }
]

export default data
