import { TableOptions } from '../types/TableOption'
export const baseTableConfig: TableOptions[] = [
  {
    label: 'parkinNagem',
    prop: 'parkinNagem',
    attrs: { resizable: true, align: 'center' }
  },
  {
    label: 'addres',
    prop: 'addres',
    attrs: { resizable: true, align: 'center' }
  },
  {
    label: 'carsNumber',
    prop: 'carsNumber',
    attrs: { resizable: true, align: 'center' }
  },
  {
    label: 'status',
    prop: 'status',
    slot: 'status',
    attrs: { resizable: true, align: 'center' }
  }
]
