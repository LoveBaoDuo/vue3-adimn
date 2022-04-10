import { FormConfig } from '../types/FormTypes'
// myform 配置
export const loginFormConfig: FormConfig[] = [
  {
    type: 'input',
    value: '',
    prop: 'username',
    label: '用户名',
    attrs: {
      style: {
        width: '100%',
        minWidth: '200px'
      }
    },
    rules: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      { min: 2, max: 6, message: '用户名在2-6位之间', trigger: 'blur' }
    ]
  },
  {
    type: 'input',
    value: '',
    prop: 'password',
    label: '密码',
    rules: [
      { required: true, message: '密码不能为空', trigger: 'blur' },
      { min: 6, max: 15, message: '密码在2-6位之间', trigger: 'blur' }
    ],
    attrs: {
      showPassword: true
    }
  },
  {
    type: 'select',
    value: '1',
    placeholder: '请选择职位',
    prop: 'role',
    label: '职位',
    rules: [{ required: true, message: '职位不能为空', trigger: 'blur' }],
    attrs: {
      style: {
        width: '100%'
      }
    },
    children: [
      {
        type: 'option',
        label: '经理',
        value: '1'
      },
      {
        type: 'option',
        label: '主管',
        value: '2'
      },
      {
        type: 'option',
        label: '员工',
        value: '3'
      }
    ]
  },
  {
    type: 'checkbox-group',
    value: [],
    placeholder: '请选择爱好',
    prop: 'like',
    label: '爱好',
    rules: [{ required: true, message: '爱好不能为空', trigger: 'blur' }],
    attrs: {
      style: {
        width: '100%'
      }
    },
    children: [
      {
        type: 'checkbox',
        label: '足球',
        value: '1'
      },
      {
        type: 'checkbox',
        label: '篮球',
        value: '2'
      },
      {
        type: 'checkbox',
        label: '乒乓球',
        value: '3'
      }
    ]
  },
  {
    type: 'radio-group',
    value: '',
    placeholder: '请选择爱好',
    prop: 'sads',
    label: '爱好',
    rules: [{ required: true, message: '爱好不能为空', trigger: 'blur' }],
    attrs: {
      style: {
        width: '100%'
      }
    },
    children: [
      {
        type: 'radio',
        label: '足球',
        value: '1'
      },
      {
        type: 'radio',
        label: '篮球',
        value: '2'
      },
      {
        type: 'radio',
        label: '乒乓球',
        value: '3'
      }
    ]
  },
  {
    type: 'date-picker',
    value: '',
    placeholder: '请选择时间',
    prop: 'time',
    label: '时间',
    attrs: {
      style: {
        width: '100%'
      },
      type: 'daterange',
      rangeSeparator: '-',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      valueFormat: 'YYYY-MM-DD'
    }
  }
]
