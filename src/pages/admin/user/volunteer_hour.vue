<template>
    <h1>志愿时长排行榜</h1>
    <el-table :data="sortedUserTable" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column prop="account" label="账号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="volunteerHour" label="志愿时长" />
    </el-table>
</template>

<script setup>
import { ref, computed } from 'vue'
import { request } from '~/utils'

const users = ref([])

const sortedUserTable = computed(() => {
    return users.value.sort((a, b) => b.volunteerHour - a.volunteerHour)
})

const fetchTableData = async () => {
    const response = await request.get('/api/user')
    users.value = response.data
}

fetchTableData()
</script>