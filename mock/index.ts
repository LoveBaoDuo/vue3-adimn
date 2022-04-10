// test.ts

import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/mock/get',
    method: 'POST',
    body: {
      pageSize: 10,
      pageNum: 1
    },
    response: () => {
      return {
        code: 200,
        data: {
          'array|10000': [
            {
              'parkinNagem|+1': ['Hello', 'Mock.js', '!'],
              'addres|+1': ['民治', '龙华', '五和'],
              'carsNumber|+1': [0, 1],
              'status|+1': [0, 1]
            }
          ],
          total: 10000
        }
      }
    }
  }
] as unknown as MockMethod[]
