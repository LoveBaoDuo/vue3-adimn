// test.ts

import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/mock/get',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          'array|100': [
            {
              'parkinNagem|+1': ['Hello', 'Mock.js', '!'],
              'addres|+1': ['民治', '龙华', '五和'],
              'carsNumber|+1': [0, 1],
              'status|+1': [0, 1],
            },
          ],
        },
      }
    },
  },
] as MockMethod[]
