const data = [
  {
    label: '分类',
    type: 'select',
    key: 'id',
    value: '',
    isHide: true,
    placeholder: '请选择分类',
    rules: {
      required: true,
      type: 'number',
      message: '请选择分类',
      trigger: 'blur'
    }
  }
]

export default data
