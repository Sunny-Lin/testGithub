const data = [
  {
    label: '分组名称',
    type: 'string',
    key: 'groupName',
    value: '',
    isHide: true,
    placeholder: '请输入分组名称',
    rules: { required: true, message: '请输入分组名称', trigger: 'blur' }
  },
  {
    label: '父级',
    type: 'cascader',
    key: 'groupId',
    disabled: false,
    value: [],
    isHide: false,
    placeholder: '请选择分组',
    rules: {
      type: 'array',
      required: false,
      message: '请选择分组',
      trigger: 'change'
    }
  }
]

export default data
