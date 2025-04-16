<script lang="ts" setup>
import { repository } from '~/../package.json'
import { User } from '@element-plus/icons-vue'
import { toggleDark } from '~/composables'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { store } from '~/store'
const router = useRouter()

function handleLogout() {
  fetch('/api/main/logout', {
    method: 'POST',
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
  <el-menu background-color="steelblue" text-color="#fff" active-text-color="#ffd04b" class="el-menu-demo" mode="horizontal" :ellipsis="false">
    <el-menu-item index="/">
      <div class="flex items-center justify-center gap-2">
        <span>志愿者活动管理平台</span>
      </div>
    </el-menu-item>

    <el-sub-menu index="user" h="full">
      <template #title>
        <el-icon>
          <User />
        </el-icon>
        <span>{{ store.profile?.username }}</span>
      </template>
      <el-menu-item index="logout" @click="handleLogout">退出登录</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style lang="scss">
.el-menu-demo {
  &.ep-menu--horizontal > .ep-menu-item:nth-child(1) {
    margin-right: auto;
  }
}
</style>
