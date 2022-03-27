<script setup lang="ts">
import { useRouter } from 'vue-router'
import avatar from '@/assets/logo.png'
import useLoginStore from '@/store/loginStore'
import { getLocalStorage } from '@/utils/auth'
// 面包屑的配置文件
import { breadDefaultConfig } from '@/BaseComponents/Breadcrumb/src/config/index'
const router = useRouter()
// 控制菜单的折叠
const isCollapse = useLoginStore().setCollapse
// 退出登录
const signOut = () => {
  useLoginStore().signOut()
  router.push({ path: '/login' })
}
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({ name: 'MyNavBar' })
</script>
<template>
  <div id="navbar-header">
    <!-- 上导航 -->
    <el-row
      justify="space-around"
      class="navTop"
      align="middle"
      :style="{ height: '60%' }"
    >
      <!-- 右导航 -->
      <el-col class="navLeft" :span="12">
        <!-- 汉堡按钮 -->
        <div @click="isCollapse">
          <MyIcons size="26px" name="expand"></MyIcons>
        </div>
        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }"
              >homepage</el-breadcrumb-item
            >
            <el-breadcrumb-item
              ><a href="/">promotion management</a></el-breadcrumb-item
            >
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
      <!-- 右侧导航 -->
      <el-col :span="12">
        <div class="navbar-right">
          <el-avatar :src="avatar" :size="25" fit="cover" />
          <span class="username">管理员</span>
          <el-dropdown>
            <span class="dropdown-link">
              <MyIcons name="setting" size="18px"></MyIcons>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :disabled="!getLocalStorage('TOKEN')"
                  ><router-link to="/use/admin/admincreate"
                    >账号</router-link
                  ></el-dropdown-item
                >
                <el-dropdown-item @click="signOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
    <el-row justify="space-around" align="middle" :style="{ height: '40%' }">
      <!-- 右导航 -->
      <el-col :span="12">
        <MyBreadcrumeb :breadConfig="breadDefaultConfig"></MyBreadcrumeb
      ></el-col>
      <!-- 右侧导航 -->
      <el-col :span="12"> </el-col>
    </el-row>
  </div>
</template>
<style lang="less" scoped>
#navbar-header {
  width: 100%;
  padding-bottom: 5px;
  box-sizing: border-box;
  .navbar-right {
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
    align-items: center;
  }
  .username {
    margin: 0 10px;
  }
  .navLeft {
    display: flex;
    align-items: center;
    line-height: 16px;
    .crumbs {
      margin-left: 5px;
      height: 100%;
    }
  }
  .navTop {
    margin-bottom: 5px;
    padding: 5px 0;
    border-bottom: 1px solid #e6e6e6;
  }
  .el-dropdown-menu__item {
    text-align: center;
  }
}
</style>
