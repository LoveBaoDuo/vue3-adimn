export interface OptionsTypes {
  type: string // 判断显示什么form组件
  inputType?: string // input框的类型
  label?: string // input框的标签名
  value: string // input框的对应值的标识符
  placeholder?: string
  selectItem?: any[]
  width?: string // 输入框的宽度
  lableWidth?: string // 标签的宽度
  checkList?: any[]
  radio?: any[]
  slotName?: string
  btnList?: {
    type: string // 按钮的类型
    text: string // 按钮的文本
    nativeType: 'button' | 'submit' | 'reset' // 按钮原生类型
    handle?(e: any): void // 触发的事件
  }[]
}

export interface FormPropsTypes {
  options: OptionsTypes[]
  lableWidth?: string
  labelAlign?: 'top' | 'left' | 'right' // lable 标签名的对齐方式
  inline?: boolean // 为 true 以让表单域变为行内的表单域
  handlesubmit?(value: any): void
}
