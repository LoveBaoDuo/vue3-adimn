<script setup lang="ts">
// 导入表单元素
// import MyForm from '@/BaseComponents/form/index.vue'
// 导入 表单元素的配置文件
import { loginFormConfig } from '@/BaseComponents/form/src/config/login.config'
import MyForms from '@/BaseComponents/form/src/index.vue'
// 导入登入相关的 状态管理
// import useLoginStore from '@/store/loginStore'
// import { useRouter } from 'vue-router'
// import { $message } from '@/utils/auth'
// const router = useRouter()
// const useLogin = useLoginStore()
// // 登入数据
// const userInfo = reactive({
//   username: '',
//   password: ''
// })
// 表单的数据校验
// 表单校验规则
// const rules = {
//   username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
//   password: [
//     { required: true, message: '请输入密码', trigger: 'blur' },
//     { min: 6, max: 12, message: '密码长度6-12为', trigger: 'blur' }
//   ]
// }
// 提交表单
const handleSumbie = async (form: ElFormInstance, model: any) => {
  form.validate(valid => {
    if (valid) {
      console.log(model)
    } else {
      console.log('表单填写有误')
    }
  })
}
// 重置表单
const handleRest = (form: ElFormInstance, model: any) => {
  form.resetFields()
}
</script>
<script lang="ts">
import { defineComponent } from 'vue'
import type { ElForm } from 'element-plus'
type ElFormInstance = InstanceType<typeof ElForm>
export default defineComponent({ name: 'LoginVue' })
</script>
<template>
  <div id="login-container">
    <el-card>
      <div class="loginTitle">
        <h1>后台管理系统</h1>
      </div>
      <div class="loginForm">
        <MyForms label-width="80px" :FormOptions="loginFormConfig">
          <template #action="{ form, model }">
            <el-button type="primary" @click="handleSumbie(form!, model)"
              >登入</el-button
            >
            <el-button @click="handleRest(form!, model)">重置</el-button>
          </template>
        </MyForms>
      </div>
    </el-card>
  </div>
</template>
<style lang="less" scoped>
#login-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('/imgs/cool-background.png');
  background-color: skyblue;
  .loginTitle {
    font-size: 20px;
    color: #606266;
    text-align: center;
  }
}
.el-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .loginForm {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .loginBtn {
    margin-top: 10px;
  }
  .verBtn {
    // width: 30px;
    display: flex;
    justify-content: end;
  }
}
</style>
