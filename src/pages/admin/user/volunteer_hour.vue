<template>
    <h1>志愿时长排行榜</h1>
    <el-table :data="sortedUserTable" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="identifier" label="账号" />
        <el-table-column prop="username" label="姓名" />
        <el-table-column prop="volunteer_hour" label="志愿时长" />
        <el-table-column prop="update_time" label="更新时间" :formatter="formatTime" />
    </el-table>
</template>

<script setup>
import { ref, computed } from 'vue'
import { request } from '~/utils'

const tableData = ref([
    {
        identifier: '123456789',
        username: '张三',
        volunteer_hour: 10,
        update_time: new Date().toISOString()
    },
    {
        identifier: '123456789',
        username: '李四',
        volunteer_hour: 20,
        update_time: new Date().toISOString()
    },
    {
        identifier: '123456789',
        username: '王五',
        volunteer_hour: 5,
        update_time: new Date().toISOString()
    }
])

const sortedUserTable = computed(() => {
    return tableData.value.sort((a, b) => b.volunteer_hour - a.volunteer_hour)
})

const fetchTableData = async () => {
    const response = await fetch('/api/main/volunteer_hour')
    const data = await response.json()
    tableData.value = data
}

fetchTableData()

const formatTime = (time) => {
    return new Date(time).toLocaleString()
}
</script>