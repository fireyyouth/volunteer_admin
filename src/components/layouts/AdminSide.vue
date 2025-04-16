<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  House,
  PieChart,
  Calendar,
  Paperclip
} from '@element-plus/icons-vue'
import { store } from '~/store'
// const isCollapse = ref(true)
function handleOpen(key: string, keyPath: string[]) {
  // eslint-disable-next-line no-console
  console.log(key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  // eslint-disable-next-line no-console
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    router
    default-active="1"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-sub-menu index="/admin/user">
      <template #title>
        <span>用户管理</span>
      </template>
      <el-menu-item index="/admin/user/info">
        <span>信息管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/user/volunteer_hour">
        <span>时长管理</span>
      </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="/admin/activity">
      <template #title>
        <span>活动管理</span>
      </template>
      <el-menu-item index="/admin/activity/application">
        <span>活动申请管理</span>
      </el-menu-item>
      <el-menu-item index="/admin/activity/info">
        <span>活动信息管理</span>
      </el-menu-item>
    </el-sub-menu>

  </el-menu>
</template>
