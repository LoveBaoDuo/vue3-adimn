// 列表配置
export interface TableOptions {
  // 列表字段
  label: string
  // 列表值
  prop: string
  // 插槽
  slot?: string
  // 单元格的自有属性
  attrs?: {
    // 设置单元格的宽度
    width?: string | number
    // 列是否允许拖动列宽调整
    resizable?: boolean
    // 将列固定在左侧或者右侧
    fixed?: 'left' | 'right'
    // 列对齐方式
    align?: 'left' | 'center' | 'right'
    // 表头列的对齐方式
    headerAlign?: 'left' | 'center' | 'right'
    // 当内容过长时显示为省略号
    showOverflow?: string | boolean
    // 列数据的格式化
    formatter?: ((val: any) => string) | any[] | string
    // 排序
    sortable?: boolean
  }
}
