<template>
    <div class="page">
        <div class="content">
            <div class="header">
                <p>志愿者活动</p>
                <el-button type="primary" plain @click="router.back()">返回活动列表</el-button>
            </div>
            <div class="activity-info">
                <div>
                    <img :src="activity.imageURL" />
                </div>
                <div>
                    <h2>{{ activity.title }}</h2>
                    <p> 活动编号: {{ activity.id }}</p>
                    <p> 活动时间: {{ activity.startDate }} - {{ activity.endDate }}</p>
                    <p> 创建时间: {{ new Date(activity.createdOn).toLocaleString() }}</p>
                    <p> 活动人数: {{ activity.participants?.length }}</p>
                    <p> 参与条件: {{ activity.volunteerCriteria }}</p>
                    <p> 负责人: {{ activity.creatorName }}</p>
                    <p> 状态: {{ activity.status }}</p>
                    <el-button type="primary" @click="handleJoinActivity">立即报名</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { store } from '~/store'
import { useRoute, useRouter } from 'vue-router';
import { request } from '~/utils';
import { ElMessage } from 'element-plus'

const route = useRoute();
const router = useRouter();

const activity = ref({})

request.get('/api/activity/' + route.params.id)
    .then(response => {
        activity.value = response.data;
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
    })

const handleJoinActivity = async() => {
    try {
        const response = await request.post('/api/apply/', {
            activity: {
                id: activity.value.id
            },
            kind: '参加'
        })
        ElMessage.success('已申请，请查看申请记录')
    } catch(error) {
        ElMessage.error(error.response.data.detail)
    }
}
</script>

<style scoped>
.activity-info {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;
}

.activity-info > div {
    flex: 1;
    height: 600px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 10px;
    background-color: white;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.page {
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(232, 232, 232);
}

.content {
    width: 80vw;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

img {
    width: 600px;
    height: 500px;
}
</style>