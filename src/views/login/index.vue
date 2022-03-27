<script setup lang="ts">
// 导入表单元素
import MyForm from '@/BaseComponents/form/index.vue'
// 导入 表单元素的配置文件
import { LoginFormConfig } from '@/BaseComponents/form/src/config/login.config'
// 导入登入相关的 状态管理
import useLoginStore from '@/store/loginStore'
import { useRouter } from 'vue-router'
import { $message } from '@/utils/auth'
const router = useRouter()
const useLogin = useLoginStore()
// 登入数据
const userInfo = reactive({
  username: '',
  password: '',
})
// 表单的数据校验
// 表单校验规则
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 12, message: '密码长度6-12为', trigger: 'blur' },
  ],
}
// 提交表单
const handleSumbie = async () => {
  const result = await useLogin.UserLogin(userInfo)
  // 获取菜单列表
  await useLoginStore().getMenuTreeList({
    page_num: 0,
    page_size: 100,
  })
  if (result) {
    $message({ message: '登入成功', type: 'success', duration: 1000 })
    router.push({ path: '/' })
  }
}
</script>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({ name: 'LoginVue' })
</script>
<template>
  <div id="login-container">
    <el-card>
      <div class="loginTitle">
        <h1>后台管理系统</h1>
      </div>
      <div class="loginForm">
        <my-form
          :FormOptions="LoginFormConfig"
          :formData="userInfo"
          :rules="rules"
          @handleSumbie="handleSumbie"
        >
          <template #btn>
            <div class="loginBtn">
              <el-button
                type="primary"
                native-type="submit"
                :style="{ width: '100%' }"
                >登录</el-button
              >
            </div>
          </template>
        </my-form>
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
