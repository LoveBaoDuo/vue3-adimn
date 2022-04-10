import { RuleItem } from './Rulr'
import { CSSProperties } from 'vue'

// export interface OptionsTypes {
//   type: string // 判断显示什么form组件
//   inputType?: string // input框的类型
//   label?: string // input框的标签名
//   value: string // input框的对应值的标识符
//   placeholder?: string
//   selectItem?: any[]
//   width?: string // 输入框的宽度
//   lableWidth?: string // 标签的宽度
//   checkList?: any[]
//   radio?: any[]
//   slotName?: string
//   btnList?: {
//     type: string // 按钮的类型
//     text: string // 按钮的文本
//     nativeType: 'button' | 'submit' | 'reset' // 按钮原生类型
//     handle?(e: any): void // 触发的事件
//   }[]
// }

// export interface FormPropsTypes {
//   options: OptionsTypes[]
//   lableWidth?: string
//   labelAlign?: 'top' | 'left' | 'right' // lable 标签名的对齐方式
//   inline?: boolean // 为 true 以让表单域变为行内的表单域
//   handlesubmit?(value: any): void
// }
export interface FormConfig {
  // 判断显示什么form组件
  type:
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'radio'
    | 'radio-group'
    | 'select'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'transfer'
    | 'upload'
  // 表单的值
  value: any
  // 表单项的label
  label?: string
  // 表单的标识
  prop?: string
  // 表单项的验证规则
  rules?: RuleItem[]
  // 表单占位符
  placeholder?: string
  // 表单元素特有的属性
  attrs?: {
    // 能否被清空
    clearable?: boolean
    // 是否显示密码
    showPassword?: boolean
    // 是否禁用
    disabled?: boolean
    // css样式
    style?: CSSProperties
    // 显示类型
    type?: string
    // 日期的连接符
    rangeSeparator?: string
    // 日期开始占位符
    startPlaceholder?: string
    // 日期结束占位符
    endPlaceholder?: string
    // 选择日期值的格式
    valueFormat?: string
  }
  // 表单项的子元素
  children?: FormConfig[]
}
