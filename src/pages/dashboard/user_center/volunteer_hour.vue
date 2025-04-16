<template>
    <div>
        总时长：{{ totalHours }}
    </div>
    <el-table :data="tableData">
        <el-table-column prop="volunteer_hours" label="时长" />
        <el-table-column prop="activity_name" label="活动名称" />
    </el-table>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

const tableData = ref([
    {
        volunteer_hours: 10,
        activity_name: '活动1'
    }
])

const totalHours = computed(() => {
    return tableData.value.reduce((total, item) => total + item.volunteer_hours, 0)
})

</script>