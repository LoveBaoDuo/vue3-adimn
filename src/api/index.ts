import request from '@/utils/request'
export const getMockData = (url: string) => {
  return request({
    method: 'GET',
    url: url,
  })
}
