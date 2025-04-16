<template>
    <el-form :inline="true">
        <el-form-item label="活动编号">
            <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="活动名称">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="负责人姓名">
            <el-input v-model="form.responsible_person_name" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleCreateActivity">搜索</el-button>
        </el-form-item>
    </el-form>
    <div class="activity-list">
        <div v-for="activity in activities" :key="activity.id" class="activity-item">
            <img :src="activity.image" @click="router.push(`/dashboard/activity/${activity.id}`)" />
            <h2>{{ activity.name }}</h2>
            <p> {{ activity.start_time }} - {{ activity.end_time }}</p>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
    id: '',
    name: '',
    responsible_person_name: '',
})

const handleCreateActivity = () => {
    console.log('create activity')
}

const activities = ref(Array(10).fill(
    {
        id: 1,
        name: '活动1',
        start_time: '2025-04-16 10:00:00',
        end_time: '2025-04-16 12:00:00',
        image: 'https://q0.itc.cn/q_70/images01/20240423/ee79b1283f204de48663f1f0ab3afccf.jpeg',
    }))
</script>

<style scoped>

.activity-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.activity-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
}

img {
    width: 500px;
    height: 300px;
    object-fit: cover;
}
</style>