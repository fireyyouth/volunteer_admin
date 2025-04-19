<script lang="ts" setup>
import { User } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { store } from '~/store'
const router = useRouter()

function handleLogout() {
  fetch('/api/logout', {
    method: 'GET',
  })
  .then(response => response.json())
  .then((data) => {
    ElMessage.success(data.detail)
  })
  .catch(error => {
    ElMessage.error(error.toString())
  })
  .finally(() => {
    router.push('/login')
    store.value.profile = undefined
  })
}

</script>

<template>
  <el-menu router class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="/dashboard/activity">
      <span>活动</span>
    </el-menu-item>
    <el-menu-item index="/dashboard/user_center">
      <span>个人中心</span>
    </el-menu-item>
    <el-sub-menu index="user" h="full">
      <template #title>
        <el-icon>
          <User />
        </el-icon>
        <span>{{ store.profile?.name }}</span>
      </template>
      <el-menu-item index="logout" @click="handleLogout">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style lang="scss">
.el-menu-demo {
  &.ep-menu--horizontal > .ep-menu-item:nth-child(2) {
    margin-right: auto;
  }
}
</style>
