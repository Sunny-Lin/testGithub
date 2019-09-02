const data = [
  {
    label: '事件',
    type: 'string',
    key: 'event',
    span: 3,
    isHide: false,
    disabled: false,
    value: '',
    placeholder: '请输入事件',
    rules: { required: true, message: '请输入事件', trigger: 'blur' }
  },
  {
    label: '用户名',
    type: 'string',
    key: 'username',
    span: 3,
    isHide: false,
    disabled: false,
    value: '',
    placeholder: '请输入用户名',
    rules: { required: true, message: '请输入用户名', trigger: 'blur' }
  },
  {
    label: '拥有者',
    type: 'string',
    key: 'owner',
    span: 3,
    isHide: false,
    disabled: false,
    value: '',
    placeholder: '请输入拥有者',
    rules: { required: true, message: '请输入拥有者', trigger: 'blur' }
  },
  {
    label: '对象名称',
    type: 'string',
    key: 'obbjname',
    span: 3,
    isHide: false,
    disabled: false,
    value: '',
    placeholder: '请输入对象名称',
    rules: { required: true, message: '请输入对象名称', trigger: 'blur' }
  },
  {
    label: '对象类型',
    type: 'string',
    key: 'objtype',
    span: 3,
    isHide: false,
    disabled: false,
    value: '',
    placeholder: '请输入对象类型',
    rules: { required: true, message: '请输入对象类型', trigger: 'blur' }
  },
  {
    label: '时间',
    type: 'date',
    key: 'time',
    span: 3,
    isHide: false,
    disabled: false,
    value: '',
    placeholder: '请选择时间',
    rules: {
      required: true,
      message: '请选择时间',
      trigger: 'blur'
    }
  },
  {
    label: '标记用户名',
    type: 'string',
    key: 'markUserName',
    span: 3,
    isHide: true,
    disabled: false,
    value: '',
    placeholder: '请输入标记用户名',
    rules: { required: true, message: '请输入标记用户名', trigger: 'blur' }
  },
  {
    label: '标记时间',
    type: 'string',
    key: 'markDate',
    span: 3,
    isHide: true,
    disabled: false,
    value: '',
    placeholder: '请输入标记时间',
    rules: { required: true, message: '请输入标记时间', trigger: 'blur' }
  },
  {
    label: '分组名称',
    type: 'string',
    key: 'groupName',
    span: 3,
    isHide: true,
    disabled: false,
    value: '',
    placeholder: '请输入分组名称',
    rules: { required: true, message: '请输入分组名称', trigger: 'blur' }
  },
  {
    label: '脚本',
    type: 'text',
    key: 'sqlText',
    span: 1,
    isHide: false,
    disabled: false,
    value: '',
    placeholder: '请输入脚本',
    rules: { required: true, message: '请输入脚本', trigger: 'blur' }
  }
]

export default data
