import { tableOptions, theadType } from '../types/tableTypes'
enum stopcar {
  carStop = 1,
}
const addresFun = (row: any) => {
  return row === stopcar.carStop ? '可停' : '不可停'
}
const thead: theadType[] = [
  { type: 'normal', label: '名字', prop: 'parkinNagem' },
  {
    type: 'normal',
    label: '地区',
    prop: 'addres',
    sort: true,
    filters: [{ text: '民治', value: '民治' }],
  },
  {
    type: 'slot',
    label: '头像',
    prop: 'image',
    slot: [{ name: 'imageSolt' }],
  },
  { type: 'function', label: '可停', prop: 'carsNumber', handle: addresFun },
  // { type: 'switch', label: '状态', prop: 'status' },
  { type: 'slot', label: '状态', prop: 'status', slotName: 'switch' },
  {
    type: 'handle',
    label: '操作',
    prop: '',
    width: '300',
    btn: [
      {
        type: 'primary',
        text: '添加',
        icon: 'Edit',
        size: 'small',
        handleClick(e: Event, value: any) {
          console.log(e, value)
        },
      },
      {
        type: 'warning',
        text: '删除',
        icon: 'Delete',
        size: 'small',
        handleClick(e: Event, value: any) {
          console.log(e, value)
        },
      },
    ],
  },
]
export const baseTableConfig: tableOptions = {
  thead,
  url: '/get',
  border: true,
}
