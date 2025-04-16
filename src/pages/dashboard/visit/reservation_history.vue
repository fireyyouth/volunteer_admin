<template>
    <h1>访客预约记录</h1>
    <el-table :data="reservations">
        <el-table-column prop="visitor" label="访客" />
        <el-table-column prop="vehicle_number" label="车牌号" />
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="reason" label="事由" />
        <el-table-column prop="status" label="状态" :formatter="statusFormatter" />
        <el-table-column prop="create_time" label="创建时间" :formatter="formatTime" />
        <el-table-column prop="update_time" label="更新时间" :formatter="formatTime" />
        <el-table-column label="操作">
            <template #default="scope">
                <template v-if="scope.row.status === 'created'">
                    <div class="button-container">
                        <el-button v-if="store.profile?.role === 'admin'" type="text" plain @click="handleUpdate(scope.row, 'approved')">允许</el-button>
                        <el-button v-if="store.profile?.role === 'admin'" type="text" plain @click="handleUpdate(scope.row, 'rejected')">拒绝</el-button>
                        <el-button v-if="store.profile?.role === 'visitor'" type="text" plain @click="handleUpdate(scope.row, 'canceled')">取消</el-button>
                    </div>
                </template>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { store } from '~/store'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'

const statusMap = {
    'created': '待审批',
    'approved': '已批准',
    'rejected': '已拒绝',
    'canceled': '已取消'
}

const reservations = ref([])

function loadData() {
    fetch('/api/main/visit_reservation')
        .then(res => res.json())
        .then(data => {
            reservations.value = data.data
        })
}

loadData()

const handleUpdate = (row: any, status: string) => {
    fetch(`/api/main/visit_reservation/${row.id}?status=${status}`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    })
    .then(res => res.json())
    .then(data => {
        ElMessage.success(data.detail)
        loadData()
    })
}

const formatTime = (row, column, cellValue) => {
    return new Date(cellValue).toLocaleString()
}

const statusFormatter = (row, column, cellValue) => {
    return statusMap[cellValue]
}
</script>

<style scoped>
.button-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>

