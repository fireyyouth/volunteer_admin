<template>
    <div class="page">
        <div class="content">
            <div class="header">
                <p>志愿者活动</p>
                <el-button type="primary" plain @click="router.back()">返回活动列表</el-button>
            </div>
            <div class="activity-info">
                <div>
                    <img :src="activity.image" />
                </div>
                <div>
                    <h2>{{ activity.name }}</h2>
                    <p> 活动编号: {{ activity.id }}</p>
                    <p> 活动时间: {{ activity.start_time }} - {{ activity.end_time }}</p>
                    <p> 发布时间: {{ activity.create_time }}</p>
                    <p> 活动人数: {{ activity.volunteer_count }}</p>
                    <p> 参与条件: {{ activity.volunteer_condition }}</p>
                    <p> 负责人: {{ activity.responsible_person_name }}</p>
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

const route = useRoute();
const router = useRouter();

const activity = ref({
    id: 1,
    name: '活动1',
    start_time: '2025-04-16 10:00:00',
    end_time: '2025-04-16 12:00:00',
    create_time: '2025-04-16 10:00:00',
    volunteer_count: 10,
    volunteer_condition: '无',
    responsible_person_name: '张三',
    image: 'https://q0.itc.cn/q_70/images01/20240423/ee79b1283f204de48663f1f0ab3afccf.jpeg',
})

request.get('/main/activity/' + route.params.id)
    .then(response => {
        activity.value = response.data.data;
    })
    .catch(error => {
        console.error(error);
    })
    .finally(() => {
    })
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
    height: 450px;
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
    height: 400px;
}
</style>