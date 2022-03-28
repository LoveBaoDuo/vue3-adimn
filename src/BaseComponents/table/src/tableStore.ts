import { defineStore } from 'pinia'
import { getMockData, MyRequest } from '@/api/index'
// 为 store state 声明类型
interface TableTypes {
  tableData: any
  total: number
}
const state: TableTypes = {
  tableData: [],
  total: 0,
}
export default defineStore('tableDataState', {
  state: () => state,
  actions: {
    // 获取 表格的数据
    async getTableData(pageSize: number, pageNum: number, url: string) {
      const result = await getMockData({ pageSize, pageNum }, url)
      this.tableData = result.data.array
      this.total = result.data.total
    },
    async getTable(pageSize: number, pageNum: number, url: string) {
      await MyRequest.post({
        url,
        // 请求级别的拦截器
        interceptors: {
          responseInterceptor: res => {
            console.log('测试请求级拦截')
            return res
          },
        },
      })
    },
  },
})
