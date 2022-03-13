### 1. 运行项目

```js
// npm
npm run serve
npm run serve:open
// 或 yarn 
yarn serve
yarn serve:open
```

### 2. 内置二次封装的element-plus组件参数配置

#### 1. el-table

##### 1. table-options

| 参数     | 说明             | 类型             | 是否必须 |
| -------- | ---------------- | ---------------- | -------- |
| `thead`  | 每一列表格的配置 | 详细见`headType` | 是       |
| `url`    | 请求数据的链接   | string           | 是       |
| checkbox | 是否开启多选     | Boolean          | 否       |
| index    | 是否开启索引     | Boolean          | 否       |
| border   | 是否有边框       | Boolean          | 否       |
| width    | 表格的宽         | string           | 否       |
| height   | 表格的高         | string           | 否       |

##### 2. `thead`的参数

| 参数    | 说明                                                         | 类型                              | 是否必须 |
| ------- | ------------------------------------------------------------ | --------------------------------- | :------: |
| type    | 每列表格的类型`normal默认` `function 显示通过函数返回值` `switch` `handle按钮` `slot插槽` | string                            |    是    |
| label   | 每列表格的标签名                                             | string                            |    是    |
| prop    | 每列表格数据对应的字段                                       | string                            |    是    |
| filters | 筛选配置                                                     | { text: string, value: string }[] |    否    |
| width   | 每列的宽度                                                   | string                            |    否    |
| sort    | 是否开启排序                                                 | Boolean                           |    否    |
| fixed   | 是否固定                                                     | `left` 或 `right`                 |    否    |
| `btn`   | 表格的按钮                                                   | 详细见`btnType`                   |    否    |
| handle  | function类型必须传入的方法                                   | (row: any): any                   |    否    |

##### 3.`btnType的参数`

| 参数          | 说明                                                         | 类型                         | 是否必须 |
| ------------- | ------------------------------------------------------------ | ---------------------------- | -------- |
| text          | 按钮的显示文本                                               | string                       | 是       |
| `handleClick` | 按钮点击事件执行的函数                                       | (e: Event, value: any): void | 是       |
| type          | 按钮的样式类型                                               | string                       | 否       |
| icon          | icon图标                                                     | string                       | 否       |
| size          | 按钮大小值见 [el-button](https://element-plus.gitee.io/zh-CN/component/button.html#%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95) | string                       | 否       |

##### 4. 事件

| 参数             | 说明               |
| ---------------- | ------------------ |
| selection-change | 触发多选框的事件   |
| switch-change    | 开关变化触发的事件 |

##### 5. 配置案例

```ts
// 测试函数
const text = (value: any) => {
  console.log(value)
}
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
  { type: 'function', label: '可停', prop: 'carsNumber', handle: addresFun },
  { type: 'switch', label: '状态', prop: 'status' },
  {
    type: 'handle',
    label: '操作',
    prop: '',
    width: '300',
    // fixed: 'right',
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
```



#### 2. el-form

#### Attributes

| 参数             | 说明           | 类型                                                         | 是否必须 |
| ---------------- | -------------- | ------------------------------------------------------------ | -------- |
| `FormPropsTypes` | form的配置     | 详情见`OptionsTypes`                                         | 是       |
| `formData`       | form传入数据   | 数据的属性要与`FormPropsTypes`中的`OptionsTypes`的value相对于 | 是       |
| `rules`          | form的校验规则 |                                                              | 是       |



##### 1. `FormPropsTypes`

| 参数           | 说明                       | 类型                       | 是否必须 |
| -------------- | -------------------------- | -------------------------- | -------- |
| Options        | 表单input的配置            | 详情见`OptionsTypes`       | 是       |
| `lableWidth`   | 标签的宽度                 | string                     | 否       |
| `labelAlign`   | `lable` 标签名的对齐方式   | `top` 或 `left` 或 `right` | 否       |
| inline         | 是否表单域变为行内的表单域 | Boolean                    | 否       |
| `handlesubmit` | 表单提交事件触发的函数     | (value: any): void         | 否       |

配置案例

```ts
const FormOptions="{
        Options,
        lableWidth: '120px',
        inline: true,
        handlesubmit: validate,
      }
```



##### 2. `OptionsTypes`

| 参数         | 说明                               | 类型   | 是否必须 |
| ------------ | ---------------------------------- | ------ | -------- |
| type         | 判断显示什么form组件 如radio input | string | 是       |
| `inputType`  | input框的类型                      | string | 否       |
| label        | 标签名                             | string | 否       |
| value        | 对应传入数据的属性名               | string | 是       |
| placeholder  | input 的提示语                     | string | 否       |
| `selectItem` | 下拉框的配置                       | Array  | 否       |
| width        | 每个表单元素的宽度                 | string | 否       |
| `lableWidth` | 单独设置相对应的标签宽度           | string | 否       |
| checkList    | 多选框的配置                       | string | 否       |

| 参数      | 说明       | 类型              | 是否必须 |
| --------- | ---------- | ----------------- | -------- |
| radio     | 单选框     | Array             | 否       |
| `btnList` | 按钮的配置 | 详细见下`btnList` | 否       |

配置案例

```ts
// myform 配置
const Options: OptionsTypes[] = [
  {
    type: 'input',
    inputType: 'text',
    label: '名字',
    value: 'name',
    placeholder: '请输入名字',
    width: '220px',
  },
  {
    type: 'input',
    inputType: 'password',
    label: '密码',
    value: 'pwd',
    placeholder: '请输入名字',
    width: '220px',
  },
  {
    type: 'select',
    label: '筛选',
    value: 'select',
    width: '220px',
    selectItem: [
      { label: '配置1', value: '配置1' },
      { label: '配置2', value: '配置2' },
    ],
  },
  {
    type: 'checkbox',
    label: '爱好',
    value: 'checkList',
    checkList: ['看书', '打游戏'],
  },
  {
    type: 'radio',
    label: '性别',
    value: 'radio',
    radio: [
      { label: 0, name: '男' },
      { label: 1, name: '女' },
    ],
  },
  {
    type: 'btn',
    value: '',
    btnList,
  },
]
```



##### 3. btnList

| 参数         | 说明           | 类型                      | 是否必须 |
| ------------ | -------------- | ------------------------- | -------- |
| type         | 按钮的类型     | string                    | 是       |
| text         | 按钮的文本     | string                    | 是       |
| `nativeType` | 按钮原生类型   | `button` `submit` `reset` | 是       |
| handle       | 按钮的点击事件 | (e: any): void            | 否       |

配置案例

```ts
const btnList = [
      {
        type: 'primary',
        text: '提交',
        nativeType: 'submit',
      },
      {
        type: 'default',
        text: '取消',
        nativeType: 'button',
        handle: text,
      },
    ]
```

