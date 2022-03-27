export interface btnType {
  text: string
  handleClick(e: Event, value: any): void
  type?: string
  icon?: string
  size?: string
}
export interface theadType {
  type: string // 表格的类型
  label: string // 列标题
  prop: string // 列对应的数据字段
  filters?: { text: string; value: string }[] // 筛选的方法
  width?: string // 列的宽度
  sort?: boolean // 排序1
  fixed?: 'right' | 'left' // 列是否固定
  btn?: btnType[] // 当前列是否有按钮
  slotName?: string // 类型为 slot 时 设置 插槽名
  handle?(row: any): any // 类型为 function 时 操作的函数
  [x: string]: any
}
export interface tableOptions {
  thead: theadType[]
  url: string
  checkbox?: boolean // 是否开启多选
  index?: boolean // 是否开启索引
  border?: boolean
  width?: string
  height?: string
}
