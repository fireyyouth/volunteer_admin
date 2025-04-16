<template>
    <h1>活动申请管理</h1>
    <el-table :data="applicationTable">
        <el-table-column prop="action" label="申请类型" />
        <el-table-column prop="applicant" label="申请人" />
        <el-table-column label="活动编号" >
            <template #default="{ row }">
                <a @click="router.push(`/dashboard/activity/${row.activity_id}`)">{{ row.activity_id }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称" />
        <el-table-column prop="volunteer_count" label="活动人数" />
        <el-table-column prop="start_time" label="开始时间" />
        <el-table-column prop="end_time" label="结束时间" />
        <el-table-column prop="publish_time" label="发布时间" />
        <el-table-column prop="responsible_identifier" label="负责人账号" />
        <el-table-column prop="responsible_person" label="负责人" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
            <template #default="{ row }">
                <el-select v-model="row.status">
                    <el-option label="待审核" value="待审核" />
                    <el-option label="通过" value="通过" />
                    <el-option label="拒绝" value="拒绝" />
                </el-select>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const applicationTable = ref([
    {
        action: '举行活动',
        applicant: '张三',
        activity_id: 'A01',
        name: '活动1',
        volunteer_count: 10,
        start_time: '2025-04-16 10:00:00',
        end_time: '2025-04-16 12:00:00',
        publish_time: '2025-04-16 10:00:00',
        responsible_identifier: 'admin',
        responsible_person: '管理员',
        status: '待审核'
    },
    {
        action: '参加活动',
        applicant: '李四',
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

const fetchApplicationTable = async () => {
    const response = await fetch('/api/main/application')
    const data = await response.json()
    applicationTable.value = data.data
}

fetchApplicationTable()

</script>