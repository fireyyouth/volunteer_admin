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
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/dashboard/bulletin_board">
      <span>公告栏</span>
    </el-menu-item>
    <el-menu-item index="/dashboard/profile">
      <span>个人中心</span>
    </el-menu-item>
    <el-menu-item v-if="store.profile?.role === 'admin'" index="/dashboard/user">
      <span>用户管理</span>
    </el-menu-item>
    <el-sub-menu v-if="['visitor', 'admin'].includes(store.profile?.role)" index="visit_mgt">
      <template #title>
        <span>外来车辆管理</span>
      </template>
      <el-menu-item index="/dashboard/visit/reservation_history">
        <span>预约记录</span>
      </el-menu-item>
      <el-menu-item v-if="store.profile?.role === 'visitor'" index="/dashboard/visit/reservation">
        <span>访客预约</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-if="['admin', 'student', 'teacher'].includes(store.profile?.role)" index="vehicle_mgt">
      <template #title>
        <span>车辆管理</span>
      </template>
      <el-menu-item index="/dashboard/vehicle/list">
        <span>已登记车辆</span>
      </el-menu-item>
      <el-menu-item v-if="['student', 'teacher'].includes(store.profile?.role)" index="/dashboard/vehicle/register">
        <span>车辆登记</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-if="['admin', 'teacher'].includes(store.profile?.role)" index="parking_mgt">
      <template #title>
        <span>停车管理</span>
      </template>
      <el-menu-item v-if="store.profile?.role === 'teacher'" index="/dashboard/parking/reservation">
        <span>车位预约</span>
      </el-menu-item>
      <el-menu-item index="/dashboard/parking/reservation_history">
        <span>预约记录</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu v-if="store.profile?.role === 'admin'" index="passage_mgt">
      <template #title>
        <span>通行管理</span>
      </template>
      <el-menu-item index="/dashboard/passage/list">
        <span>通行记录</span>
      </el-menu-item>
      <el-menu-item index="/dashboard/passage/statistics">
        <span>数据统计</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
