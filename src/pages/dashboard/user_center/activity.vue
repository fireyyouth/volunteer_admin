<template>
    <el-tabs>
        <el-tab-pane label="我举办的" name="own">
            <el-table :data="ownTable">
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
                        <el-button type="danger" @click="handleDeleteActivity(row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="我参与的" name="join">
            <el-table :data="participatedTable">
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

const router = useRouter()

const ownTable = ref([
    {
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
        activity_id: 'A02',
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

const participatedTable = ref([
    {
        participation_id: 1,
        activity_id: "A01",
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

const fetchTableData = async () => {
    const response = await fetch('/api/main/activities')
    const data = await response.json()
    ownTable.value = data.filter(activity => activity.responsible_identifier === store.profile.identifier)
    participatedTable.value = data.filter(activity => activity.volunteer_identifier === store.profile.identifier)
}

fetchTableData()

const handleDeleteActivity = async (id: number) => {
    const response = await fetch(`/api/main/activities/${id}`, { method: 'DELETE' })
    if (response.ok) {
        ElMessage.success('删除成功')
        fetchTableData()
    } else {
        ElMessage.error('删除失败')
    }
}

const handleDeleteParticipation = async (id: number) => {
    const response = await fetch(`/api/main/activities/${id}/participation`, { method: 'DELETE' })
    if (response.ok) {
        ElMessage.success('删除成功')
        fetchTableData()
    } else {
        ElMessage.error('删除失败')
    }
}
</script>