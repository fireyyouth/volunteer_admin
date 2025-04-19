<template>
    <h1>申请记录</h1>
    <el-table :data="applys">
        <el-table-column prop="kind" label="申请类型" />
        <el-table-column label="活动名称">
            <template #default="{ row }">
                <a @click="router.push(`/dashboard/activity/${row.activity.id}`)">{{ row.activity.title }}</a>
            </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作">
            <template #default="{ row }">
                <el-button type="danger" @click="handleCancel(row.id)">取消</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { store } from '~/store'
import { useRouter } from 'vue-router'
import { request } from '~/utils'
import { ElMessage } from 'element-plus'

const router = useRouter()

const applys = ref([])

const fetchApplys = async () => {
    const response = await request.get('/api/apply/all')
    applys.value = response.data
}

fetchApplys()

const handleCancel = async (id: number) => {
    const response = await request.delete(`/api/apply/${id}`)
    if (response.status === 200) {
        ElMessage.success('删除成功')
        fetchApplys()
    } else {
        ElMessage.error('删除失败')
    }
}
</script>
