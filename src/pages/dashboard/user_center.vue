<template>
    <div class="flex">
        <el-menu router>
            <el-menu-item index="/dashboard/user_center/profile"><span>个人中心</span></el-menu-item>
            <el-menu-item index="/dashboard/user_center/password"><span>修改密码</span></el-menu-item>
            <el-menu-item index="/dashboard/user_center/activity"><span>活动管理</span></el-menu-item>
            <el-menu-item index="/dashboard/user_center/volunteer_hour"><span>时长明细</span></el-menu-item>
        </el-menu>
        <div w="full" py="4">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
        </div>
    </div>
</template>