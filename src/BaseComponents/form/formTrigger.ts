import type { ElForm } from 'element-plus'
import { onMounted, ref } from 'vue'
type ElFormInstance = InstanceType<typeof ElForm>
class FormHandle {
  formElement: ElFormInstance | undefined
  getFormElement() {
    const formElementRef = ref<ElFormInstance>()
    onMounted(() => {
      this.formElement = formElementRef.value
    })
    return formElementRef
  }
  // 触发按钮点击事件
  handleClick($event: any, handle?: (e: any) => void) {
    if (!handle) {
      return
    }
    // 重置表单
    try {
      this.formElement?.resetFields()
      handle($event)
    } catch (err) {
      console.log(err)
    }
  }
  // // 触发表单submit事件
  // async handlesubmit($event: Event, submit: any) {
  //   try {
  //     // 提交表单时进行表单校验
  //     await this.formElement?.validate()
  //     submit && submit(this.formElement)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
}
export default FormHandle
