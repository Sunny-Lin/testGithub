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
    label: 'bug号',
    type: 'string',
    key: 'bugNum',
    disabled: false,
    value: '',
    placeholder: '请输入bug号',
    rules: { required: false, message: '请输入bug号', trigger: 'blur' }
  },
  {
    label: '描述',
    type: 'text',
    key: 'describe',
    disabled: false,
    value: '',
    placeholder: '请输入描述',
    rules: { required: false, message: '请输入描述', trigger: 'blur' }
  }
]

export default data
