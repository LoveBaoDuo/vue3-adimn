export interface cascaderType {
  value?: string //选择后的值
  label?: string // 显示标签
  disabled?: boolean // 禁用
  children?: cascaderType[] // 子选择框
}
