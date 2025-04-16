<template>
    <ActivityDialog v-model="dialogVisible" />
    <div>
        <el-button type="primary" @click="handleCreateActivity">申请举行活动</el-button>
    </div>
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

const dialogVisible = ref(false)

const handleCreateActivity = () => {
    console.log('create activity')
    dialogVisible.value = true
}

const activities = ref(Array(4).fill(
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