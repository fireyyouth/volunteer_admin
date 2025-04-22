<template>
    <h1>时长管理</h1>
    <el-dialog v-model="dialogVisible" title="编辑时长要求">
        <el-form inline>
            <el-form-item label="时长要求">
                <el-input v-model="hostHourRequirementEdit" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="saveHostHourRequirement">保存</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-descriptions border>
        <el-descriptions-item label="活动举行者时长要求">
            <el-input v-model="hostHourRequirement" readonly />
        </el-descriptions-item>
        <el-descriptions-item label="操作">
            <el-button type="primary" @click="dialogVisible = true">编辑</el-button>
        </el-descriptions-item>
    </el-descriptions>
    <h2>志愿时长排行榜</h2>
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

const hostHourRequirement = ref(0)
const hostHourRequirementEdit = ref(0)


const fetchHostHourRequirement = async () => {
    const response = await request.get('/api/setting/')
    hostHourRequirement.value = response.data.hostHourRequirement
}

const saveHostHourRequirement = async () => {
    try {
        const response = await request.put('/api/setting/', { hostHourRequirement: hostHourRequirementEdit.value })
        ElMessage.success('保存成功')
        dialogVisible.value = false
        hostHourRequirement.value = response.data.hostHourRequirement
    } catch (error) {
        ElMessage.error(error.response?.data?.detail)
    }
}

const dialogVisible = ref(false)

fetchTableData()
fetchHostHourRequirement()
</script>