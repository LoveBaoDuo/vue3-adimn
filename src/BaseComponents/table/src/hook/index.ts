import useTableDataStore from '@/BaseComponents/table/src/tableStore'
import { tableOptions } from '../types/tableTypes'
import { computed, onBeforeMount, reactive, toRefs, watch } from 'vue'
// 获取列表数据的方法
const getTableDataHook = async (TableReqParams: any, url: string) => {
  // 实例化列表状态管理的pinia
  const useTableData = useTableDataStore()
  // 获取列表数据
  useTableData.getTable(
    TableReqParams.pageSize,
    TableReqParams.currentPage,
    url
  )
  // 获取表单数据
  await useTableData.getTableData(
    TableReqParams.pageSize,
    TableReqParams.currentPage,
    url
  )
  TableReqParams.total = useTableData.total
  TableReqParams.tableData = useTableData.tableData
}
export default (url: string) => {
  // 请求列表数据的参数
  const TableReqParams = reactive({
    currentPage: 1,
    pageSize: 10,
    tableData: [],
    total: 0,
  })
  onBeforeMount(() => {
    getTableDataHook(TableReqParams, url)
  })
  // 监听 currentPage 和 pageSize 的值是否改变
  watch(
    [() => TableReqParams.pageSize, () => TableReqParams.currentPage],
    () => {
      getTableDataHook(TableReqParams, url)
    }
  )
  // 计算出当前的数据
  const pageAll = computed(() =>
    Math.ceil(TableReqParams.total / TableReqParams.pageSize)
  )
  return { ...toRefs(TableReqParams), pageAll }
}

// 获取表格的配置
export const getTableOptionsHook = (options: tableOptions): tableOptions => {
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
