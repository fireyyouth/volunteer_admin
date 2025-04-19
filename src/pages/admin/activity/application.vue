<template>
    <h1>活动申请管理</h1>
    <el-table :data="applicationTable">
        <el-table-column prop="kind" label="申请类型" />
        <el-table-column prop="user.name" label="申请人" />
        <el-table-column prop="activity.id" label="活动编号" />
        <el-table-column prop="activity.name" label="活动名称" />
        <el-table-column prop="activity.volunteerCount" label="活动人数" />
        <el-table-column prop="activity.startDate" label="开始时间" />
        <el-table-column prop="activity.endDate" label="结束时间" />
        <el-table-column prop="activity.creatorName" label="负责人" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
            <template #default="{ row }">
                <el-select v-if="row.status === 'created'" v-model="row.status" @change="handleStatusChange(row)">
                    <el-option label="approved" value="approved" />
                    <el-option label="rejected" value="rejected" />
                </el-select>
                <p v-else></p>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '~/utils'
import { ElMessage } from 'element-plus'

const router = useRouter()

const applicationTable = ref([])

const fetchApplicationTable = async () => {
    const response = await request.get('/api/apply/all')
    applicationTable.value = response.data
}

fetchApplicationTable()

const handleStatusChange = async (row) => {
    try {
        const response = await request.put(`/api/apply/${row.id}?status=${row.status}`, {})
        if (response.status === 200) {
            ElMessage.success('状态更新成功')
            fetchApplicationTable()
        } else {
            ElMessage.error('状态更新失败')
            row.status = 'created'
        }
    } catch (error) {
        ElMessage.error('状态更新失败')
        row.status = 'created'
    }
}
</script>