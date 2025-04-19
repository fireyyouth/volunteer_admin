<template>
    <div>
        总时长：{{ totalHours }}
    </div>
    <el-table :data="joinedActivities">
        <el-table-column prop="volunteerHour" label="时长" />
        <el-table-column prop="endDate" label="获得时间" />
        <el-table-column prop="title" label="来源活动" />
    </el-table>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { request } from '~/utils'

const joinedActivities = ref([])

const fetchJoinedActivities = async () => {
    const response = await request.get('/api/activity/joined')
    joinedActivities.value = response.data
}

fetchJoinedActivities()

const totalHours = computed(() => {
    return joinedActivities.value.map(x => x.volunteerHour).reduce((total, item) => total + item, 0)
})

</script>