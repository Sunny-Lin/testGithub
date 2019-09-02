const data = [
  {
    label: '版本号',
    type: 'string',
    key: 'version',
    disabled: false,
    value: '',
    placeholder: '请输入版本号',
    rules: { required: true, message: '请输入版本号', trigger: 'blur' }
  },
  // {
  //   label: '名称',
  //   type: 'string',
  //   key: 'name',
  //   disabled: false,
  //   value: '',
  //   placeholder: '请输入名称',
  //   rules: { required: false, message: '请输入名称', trigger: 'blur' }
  // },
  {
    label: '描述',
    type: 'text',
    key: 'desc',
    disabled: false,
    value: '',
    placeholder: '请输入描述',
    rules: { required: false, message: '请输入描述', trigger: 'blur' }
  }
]

export default data
