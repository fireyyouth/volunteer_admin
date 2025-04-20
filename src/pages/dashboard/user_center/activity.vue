<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="我创建的" name="own">
            <el-dialog v-model="dialogVisible">
                <template #title>
                    <h3>新建活动</h3>
                </template>
                <ActivityDialog :onSuccess="onSubmitSuccess" />
            </el-dialog>
            <div>
                <el-button type="primary" @click="dialogVisible = true">新建活动</el-button>
            </div>
            <el-table :data="ownActivities">
                <el-table-column label="活动编号" >
                    <template #default="{ row }">
                        <a @click="router.push(`/dashboard/activity/${row.id}`)">{{ row.id }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="活动名称" />
                <el-table-column label="活动人数" >
                    <template #default="{ row }">
                        {{ row.participants.length }}
                    </template>
                </el-table-column>
                <el-table-column prop="startDate" label="开始时间" />
                <el-table-column prop="endDate" label="结束时间" />
                <el-table-column prop="createdOn" label="创建时间" :formatter="dateFormatter"/>
                <el-table-column prop="creatorName" label="负责人" />
                <el-table-column prop="status" label="状态" />
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="primary" v-if="row.status === '待审核'" @click="handleApply(row.id)">申请举行</el-button>
                        <el-button type="danger" @click="handleDeleteActivity(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="我参与的" name="join">
            <el-table :data="joinedActivities">
                <el-table-column label="活动编号" >
                    <template #default="{ row }">
                        <a @click="router.push(`/dashboard/activity/${row.id}`)">{{ row.id }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="活动名称" />
                <el-table-column label="活动人数" >
                    <template #default="{ row }">
                        {{ row.participants.length }}
                    </template>
                </el-table-column>
                <el-table-column prop="startDate" label="开始时间" />
                <el-table-column prop="endDate" label="结束时间" />
                <el-table-column prop="createdOn" label="创建时间" :formatter="dateFormatter" />
                <el-table-column prop="creatorName" label="负责人" />
                <el-table-column prop="status" label="状态" />
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button type="warning" @click="handleDeleteParticipation(row.id)">退出</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { store } from '~/store'
import { useRouter } from 'vue-router'
import { request } from '~/utils'
import { ElMessage } from 'element-plus'
import ActivityDialog from '~/components/ActivityDialog.vue'
const router = useRouter()

const dialogVisible = ref(false)

const activeName = ref('own')

const dateFormatter = (row: any, column: any, cellValue: any) => {
    return new Date(cellValue).toLocaleString()
}

const ownActivities = ref([])

const joinedActivities = ref([])

const fetchOwnActivities = async() => {
    const response = await request.get('/api/activity/own')
    ownActivities.value = response.data.sort((a: any, b: any) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
}
const fetchJoinedActivities = async () => {
    const response = await request.get('/api/activity/joined')
    joinedActivities.value = response.data.sort((a: any, b: any) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
}

function onSubmitSuccess() {
    dialogVisible.value = false
    loadData()
}

function loadData() {
    fetchOwnActivities()
    fetchJoinedActivities()
}

loadData()

const handleDeleteActivity = async (id: number) => {
    const response = await request.delete(`/api/activity/${id}`)
    if (response.status === 200) {
        ElMessage.success('删除成功')
        loadData()
    } else {
        ElMessage.error('删除失败')
    }
}

const handleDeleteParticipation = async (id: number) => {
    const response = await request.post(`/api/activity/${id}/leave`, {})
    if (response.status === 200) {
        ElMessage.success('退出成功')
        loadData()
    } else {
        ElMessage.error('退出失败')
    }
}

const handleApply = async (id: number) => {
    try {
        const response = await request.post(`/api/apply/`, {
            activity: {
                id: id
            },
            kind: '举办'
        })
        if (response.status === 200) {
            ElMessage.success('成功创建申请')
            loadData()
        } else {
            ElMessage.error('创建申请失败')
        }
    } catch (error) {
        ElMessage.error('创建申请失败')
    }
}
</script>