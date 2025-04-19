<template>
    <el-form :inline="true">
        <el-form-item label="活动名称">
            <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="负责人姓名">
            <el-input v-model="form.creatorName" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-form-item>
    </el-form>
    <div class="activity-list">
        <div v-for="activity in filteredActivities" :key="activity.id" class="activity-item">
            <img :src="activity.imageURL" @click="router.push(`/dashboard/activity/${activity.id}`)" />
            <h2>{{ activity.title }}</h2>
            <p> {{ activity.startDate }} - {{ activity.endDate }}</p>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '~/utils'
const router = useRouter()

const form = reactive({
    title: '',
    creatorName: '',
})

const filterTitle = ref('')
const filterCreatorName = ref('')

const handleSearch = () => {
    filterTitle.value = form.title
    filterCreatorName.value = form.creatorName
}

const activities = ref([])

const filteredActivities = computed(() => {
    let r = activities.value
    if (filterTitle.value) {
        r = r.filter(activity => activity.title.includes(filterTitle.value))
    }
    if (filterCreatorName.value) {
        r = r.filter(activity => activity.creatorName.includes(filterCreatorName.value))
    }
    return r
})

const fetchActivities = async () => {
    const response = await request.get('/api/activity/all')
    activities.value = await response.data
}

fetchActivities()
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