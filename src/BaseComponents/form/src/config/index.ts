import { FormPropsTypes, OptionsTypes } from '../types/FormTypes'
// myform 配置
const options: OptionsTypes[] = [
  {
    type: 'input',
    inputType: 'text',
    label: '名字',
    value: 'name',
    placeholder: '请输入名字',
    width: '220px',
  },
  {
    type: 'input',
    inputType: 'password',
    label: '密码',
    value: 'pwd',
    placeholder: '请输入名字',
    width: '220px',
  },
  {
    type: 'select',
    label: '筛选',
    value: 'select',
    width: '220px',
    selectItem: [
      { label: '配置1', value: '配置1' },
      { label: '配置2', value: '配置2' },
    ],
  },
  {
    type: 'checkbox',
    label: '爱好',
    value: 'checkList',
    checkList: ['看书', '打游戏'],
  },
  {
    type: 'radio',
    label: '性别',
    value: 'radio',
    radio: [
      { label: 0, name: '男' },
      { label: 1, name: '女' },
    ],
  },
  {
    type: 'btn',
    value: '',
    btnList: [
      {
        type: 'primary',
        text: '提交',
        nativeType: 'submit',
      },
      {
        type: 'default',
        text: '取消',
        nativeType: 'button',
        handle: (value: any) => {
          console.log(value)
        },
      },
    ],
  },
]
const handlesubmit = async () => {
  alert(111)
  // e.target.validate()
}
export const baseFormConfig: FormPropsTypes = {
  options,
  lableWidth: '120px',
  inline: true,
  handlesubmit,
}
