import { FormPropsTypes, OptionsTypes } from '../types/FormTypes'
// myform 配置
const options: OptionsTypes[] = [
  {
    type: 'input',
    inputType: 'text',
    label: '用户名',
    value: 'username',
    placeholder: '请输入用户名',
    width: '250px',
  },
  {
    type: 'input',
    inputType: 'password',
    label: '密码',
    value: 'password',
    placeholder: '请输入密码',
    width: '250px',
  },
  {
    type: 'slot',
    value: 'btn',
    slotName: 'btn',
  },
]

export const LoginFormConfig: FormPropsTypes = {
  options,
  lableWidth: '80px',
  labelAlign: 'left',
  inline: false,
}
