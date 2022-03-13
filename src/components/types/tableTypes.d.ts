export interface btnType {
  text: string
  handleClick(e: Event, value: any): void
  type?: string
  icon?: string
  size?: string
}
export interface theadType {
  type: string
  label: string
  prop: string
  filters?: { text: string; value: string }[]
  width?: string
  sort?: boolean
  fixed?: 'right' | 'left'
  btn?: btnType[]
  handle?(row: any): any
  [x: string]: any
}
export interface tableOptions {
  thead: theadType[]
  url: string
  checkbox?: boolean
  index?: boolean
  border?: boolean
  width?: string
  height?: string
}
