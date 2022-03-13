import { getMockData } from '@/api'
import { onBeforeMount, reactive, Ref, ref } from 'vue'
import { tableOptions } from '@/components/types/tableTypes'
export default class TableHook {
  // 当前页
  currentPage: Ref
  // 每页数据量
  pageSize: Ref
  // 服务端请求的Table数据
  tableData: Ref
  // 服务端请求的Table数据的数量
  length: Ref
  // 当前页的数据
  currentData: Ref
  // 表格的配置
  options: tableOptions | undefined
  constructor(url: string, currentPage = 1, pageSize = 10) {
    // 当前页码
    this.currentPage = ref<number>(currentPage)
    // 每页大小
    this.pageSize = ref<number>(pageSize)
    // 请求的总数据
    this.tableData = ref<[]>([])
    // 总数据的长度
    this.length = ref<number>(0)
    // 当前页数据
    this.currentData = ref<any[]>([])
    this.init(url)
  }
  init(url: string) {
    onBeforeMount(() => {
      this.getTableData(url)
    })
  }
  // 获取表格的配置
  getTableOptionsHook(options: tableOptions): tableOptions {
    // 初始化配置数据
    const tableDefaultOption = reactive<tableOptions>({
      thead: [],
      url: '',
      checkbox: true,
      index: true,
      border: false,
      width: '100%',
    })
    const tableOption = reactive<tableOptions>({
      ...tableDefaultOption,
      ...options,
    })
    return tableOption
  }
  // 获取数据
  getTableData = async (url: string) => {
    const result = await getMockData(url)
    // 返回获取到的数据
    this.tableData.value = result.data.array
    // 判断获取来的数据有存在total
    if (result.data.total) {
      console.log('存在total')
    } else {
      this.length.value = result.data.array.length
      // 分页截取对应的数据
      this.currentData.value = this.getCurrentpageDataHook(
        this.currentPage.value,
        this.pageSize.value
      )
    }
  }
  // 获取当前页数据的方法
  getCurrentpageDataHook(currentIndex: number, pageSize: number) {
    // 每页第一条数据的索引取值范围
    const start = (currentIndex - 1) * pageSize
    // 每页最后一条数据的索引取值范围
    const end = currentIndex * pageSize
    return this.tableData.value.filter(
      (item: any, index: number) => start <= index && index < end
    )
  }
}
