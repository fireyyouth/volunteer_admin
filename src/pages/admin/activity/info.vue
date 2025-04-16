<template>

    <el-dialog v-model="dialogVisible">
        <template #title>
            <h3>活动参与者</h3>
        </template>
        <el-table :data="activityParticipants">
            <el-table-column prop="identifier" label="账号" />
            <el-table-column prop="username" label="姓名" />
            <el-table-column prop="gender" label="性别" />
            <el-table-column prop="email" label="邮箱" />
        </el-table>
    </el-dialog>

    <h1>活动信息管理</h1>
    <el-table :data="activityTable">
        <el-table-column label="活动编号" >
            <template #default="{ row }">
                <a @click="router.push(`/dashboard/activity/${row.activity_id}`)">{{ row.activity_id }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称" />
        <el-table-column label="活动人数" >
            <template #default="{ row }">
                <a @click="showParticipants(row)">{{ row.volunteer_count }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="start_time" label="开始时间" />
        <el-table-column prop="end_time" label="结束时间" />
        <el-table-column prop="publish_time" label="发布时间" />
        <el-table-column prop="responsible_identifier" label="负责人账号" />
        <el-table-column prop="responsible_person" label="负责人" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
            <template #default="{ row }">
                <el-button type="danger" @click="handleDeleteActivity(row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activityTable = ref([
    {
        activity_id: 'A01',
        name: '活动1',
        volunteer_count: 10,
        start_time: '2025-04-16 10:00:00',
        end_time: '2025-04-16 12:00:00',
        publish_time: '2025-04-16 10:00:00',
        responsible_identifier: 'admin',
        responsible_person: '管理员',
        status: '待审核'
    }
])

const showParticipants = (row) => {
    dialogVisible.value = true;
    // todo: get participants from backend
}
const activityParticipants = ref([
    {
        identifier: '123456789',
        username: '张三',
        gender: '男',
        email: 'zhangsan@example.com'
    }
])

const dialogVisible = ref(false)

</script>