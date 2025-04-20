<template>

    <el-dialog v-model="dialogVisible">
        <template #header>
            <h3>活动参与者</h3>
        </template>
        <el-table :data="activityParticipants">
            <el-table-column prop="account" label="账号" />
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="gender" label="性别" />
            <el-table-column prop="email" label="邮箱" />
        </el-table>
    </el-dialog>

    <el-dialog v-model="finishDialogVisible">
        <template #header>
            <h3>完成活动</h3>
        </template>
        <el-form>
            <el-form-item label="时长">
                <el-input-number v-model="volunteerHour" :min="0" :max="100" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleFinish">完成</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <h1>活动信息管理</h1>
    <el-table :data="activityTable">
        <el-table-column label="活动名称">
            <template #default="{ row }">
                <a @click="router.push(`/dashboard/activity/${row.id}`)">{{ row.title }}</a>
            </template>
        </el-table-column>
        <el-table-column label="活动人数" >
            <template #default="{ row }">
                <a @click="showParticipants(row)">{{ row.participants.length }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="startDate" label="开始时间" />
        <el-table-column prop="endDate" label="结束时间" />
        <el-table-column prop="createdOn" label="创建时间" />
        <el-table-column prop="creatorName" label="负责人" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
            <template #default="{ row }">
                <el-button type="primary" @click="finishDialogVisible = true; activityId = row.id">完成</el-button>
                <el-button type="danger" @click="handleDeleteActivity(row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { request } from '~/utils'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const activityTable = ref([])
const users = ref({})

const loadData = async () => {
    let response = await request.get('/api/activity/all')
    activityTable.value = response.data
    response = await request.get("/api/user")
    for (let item of response.data) {
        users.value[item.id] = item
    }
}

loadData()

const dialogVisible = ref(false)


const activityParticipants = ref([])

const showParticipants = async (row) => {
    console.log(row)
    activityParticipants.value = row.participants.map(id => users.value[id])
    dialogVisible.value = true
}

const handleDeleteActivity = async (id) => {
    try {
        await request.delete(`/api/activity/${id}`)
        ElMessage.success('删除成功')
        await loadData()
    } catch (error) {
        ElMessage.error(error.response?.data?.detail)
    }
}

const finishDialogVisible = ref(false)
const volunteerHour = ref(0)
const activityId = ref(0)

const handleFinish = async () => {
    try {
        await request.put(`/api/activity/${activityId.value}`, { volunteerHour: volunteerHour.value })
        ElMessage.success('成功')
        finishDialogVisible.value = false
        await loadData()
    } catch (error) {
        ElMessage.error(error.response?.data?.detail)
    }
}
</script>