<template>
    <h1>已登记车辆</h1>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="owner" label="车主" />
            <el-table-column prop="number" label="车牌号" />
            <el-table-column prop="vehicle_type" label="车辆类型" />
            <el-table-column prop="brand" label="车辆品牌" />
            <el-table-column prop="register_time" label="注册时间" :formatter="formatTime" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';

console.log('vehiclelist setup');

const tableData = ref([]);

function fetchData() {
    fetch('/api/main/vehicle')
        .then(res => res.json())
        .then(data => {
            tableData.value = data.data;
        });
}

fetchData();

const formatTime = (row, column, cellValue) => {
    return new Date(cellValue).toLocaleString()
}

const handleDelete = async (row) => {
    try {
        const res = await fetch(`/api/main/vehicle/${row.id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        });
        const data = await res.json();
        if (res.ok) {
            ElMessage.success(data.detail);
            fetchData();
        } else {
            ElMessage.error(data.detail);
        }
    } catch (error) {
        ElMessage.error('车辆删除失败:' + error.toString());
    }
}
</script>
