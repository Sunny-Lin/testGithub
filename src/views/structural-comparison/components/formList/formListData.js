const data = [
  {
    label: 'IP',
    type: 'string',
    key: 'host',
    disabled: false,
    value: '',
    // value: '192.168.0.55',
    placeholder: '请输入IP',
    rules: { required: true, message: '请输入IP', trigger: 'blur' }
  },
  {
    label: '端口',
    type: 'string',
    key: 'port',
    disabled: false,
    value: '',
    // value: '1521',
    placeholder: '请输入端口',
    rules: { required: true, message: '请输入端口', trigger: 'blur' }
  },
  {
    label: '服务名',
    type: 'string',
    key: 'serviceName',
    disabled: false,
    value: '',
    // value: 'orcl188',
    placeholder: '请输入服务名',
    rules: { required: true, message: '请输入服务名', trigger: 'blur' }
  },
  {
    label: '用户/库',
    type: 'string',
    key: 'user',
    disabled: true,
    value: 'system',
    placeholder: '请输入用户/库',
    rules: { required: true, message: '请输入用户/库', trigger: 'blur' }
  },
  {
    label: '密码',
    type: 'string',
    key: 'pwd',
    disabled: false,
    value: '',
    // value: 'gztp2019',
    placeholder: '请输入密码',
    rules: { required: true, message: '请输入密码', trigger: 'blur' }
  },
  {
    label: '类型',
    type: 'select',
    key: 'type',
    disabled: false,
    value: '',
    // value: 'src',
    placeholder: '请选择类型',
    data: [
      {
        value: 'src',
        label: '源数据库'
      },
      {
        value: 'tag',
        label: '目标数据库'
      }
    ],
    rules: { required: true, message: '请选择类型', trigger: 'change' }
  }
]

export default data

// const data = [
//   {
//     label: 'IP',
//     type: 'string',
//     key: 'host',
//     disabled: false,
//     // value: '',
//     value: '192.168.0.55',
//     placeholder: '请输入IP',
//     rules: { required: true, message: '请输入IP', trigger: 'blur' }
//   },
//   {
//     label: '端口',
//     type: 'string',
//     key: 'port',
//     disabled: false,
//     // value: '',
//     value: '1521',
//     placeholder: '请输入端口',
//     rules: { required: true, message: '请输入端口', trigger: 'blur' }
//   },
//   {
//     label: '服务名',
//     type: 'string',
//     key: 'serviceName',
//     disabled: false,
//     // value: '',
//     value: 'orcl188',
//     placeholder: '请输入服务名',
//     rules: { required: true, message: '请输入服务名', trigger: 'blur' }
//   },
//   {
//     label: '用户/库',
//     type: 'string',
//     key: 'user',
//     disabled: true,
//     value: 'system',
//     placeholder: '请输入用户/库',
//     rules: { required: true, message: '请输入用户/库', trigger: 'blur' }
//   },
//   {
//     label: '密码',
//     type: 'string',
//     key: 'pwd',
//     disabled: false,
//     // value: '',
//     value: 'gztp2019',
//     placeholder: '请输入密码',
//     rules: { required: true, message: '请输入密码', trigger: 'blur' }
//   },
//   {
//     label: '类型',
//     type: 'select',
//     key: 'type',
//     disabled: false,
//     // value: '',
//     value: 'src',
//     placeholder: '请选择类型',
//     data: [
//       {
//         value: 'src',
//         label: '源数据库'
//       },
//       {
//         value: 'tag',
//         label: '目标数据库'
//       }
//     ],
//     rules: { required: true, message: '请选择类型', trigger: 'change' }
//   }
// ]

// export default data
