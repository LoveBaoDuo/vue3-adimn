import useTableDataStore from '@/BaseComponents/table/src/tableStore'
import { tableOptions } from '../types/tableTypes'
import { computed, onBeforeMount, reactive, toRefs, watch } from 'vue'

export default (url: string) => {
  //   // 当前页
  //   const currentPage = ref<number>(1)
  //   // 每页大小
  //   const pageSize = ref<number>(10)

  //   const tableData = ref()
  //   const total = ref<number>(0)
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
  const pageAll = computed(() =>
    Math.ceil(TableReqParams.total / TableReqParams.pageSize)
  )
  return { ...toRefs(TableReqParams), pageAll }
}
const getTableDataHook = async (TableReqParams: any, url: string) => {
  const useTableData = useTableDataStore()
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
