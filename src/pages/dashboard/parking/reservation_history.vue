<template>
    <div>
        <h1>预约记录</h1>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="vehicle" label="预约车辆" width="180"></el-table-column>
            <el-table-column prop="owner" label="预约人" width="180"></el-table-column>
            <el-table-column prop="start_time" label="开始时间" :formatter="formatTime" width="180"></el-table-column>
            <el-table-column prop="end_time" label="结束时间" :formatter="formatTime" width="180"></el-table-column>
            <el-table-column prop="parking_spot" label="车位号"></el-table-column>
            <el-table-column prop="status" label="状态" :formatter="formatStatus"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <div v-if="scope.row.status === 'active'" class="operation-buttons">
                        <el-button @click="handleCancel(scope.row)">取消预约</el-button>
                        <el-button @click="handleSimulateParking(scope.row)">模拟停车</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'
const tableData = ref([])

const handleCancel = async (row) => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const res = await fetch(`/api/main/parking_spot/reservation/${row.id}?status=cancelled`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        const data = await res.json()
        if (res.ok) {
            ElMessage.success(data.detail)
            loadData()
        } else {
            ElMessage.error(data.detail)
        }
    } catch (error) {
        ElMessage.error('出错了:' + error.toString())
    }
}

const handleSimulateParking = async (row) => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const res = await fetch(`/api/main/parking_spot/reservation/${row.id}?status=done`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            }
        })
        const data = await res.json()
        if (res.ok) {
            ElMessage.success(data.detail)
            loadData()
        } else {
            ElMessage.error(data.detail)
        }
    } catch (error) {
        ElMessage.error('出错了:' + error.toString())
    }
}

const formatTime = (row, column, cellValue) => {
    return new Date(cellValue).toLocaleString()
}

const statusMap = {
    'active': '等待停车',
    'done': '已完成',
    'cancelled': '已取消'
}
function formatStatus(row, column, cellValue) {
    return statusMap[cellValue]
}

function loadData() {
    fetch('/api/main/parking_spot/reservation')
        .then(res => res.json())
        .then(data => {
        console.log(data)
        tableData.value = data.data
    })
}

loadData()

</script>

<style scoped>
.operation-buttons {
    display: flex;
    flex-direction: row;
    gap: 10px;
}
</style>

