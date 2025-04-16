<template>
    <h1>通行记录</h1>
    <el-form :model="searchForm" label-width="100px">
        <el-form-item label="车辆类型">
                <el-select v-model="searchForm.vehicle_type" multiple placeholder="请选择车辆类型">
                    <el-option label="自行车" value="自行车" />
                    <el-option label="汽车" value="汽车" />
                    <el-option label="校车" value="校车" />
                </el-select>
            </el-form-item>
        </el-form>
    <div class="passage-log-page">
        <el-table :data="pageData" style="width: 100%">
            <el-table-column prop="create_time" label="时间" :formatter="formatTime" />
            <el-table-column prop="vehicle_number" label="车牌号" />
            <el-table-column prop="vehicle_type" label="车辆类型" />
            <el-table-column prop="gate" label="校门" />
            <el-table-column prop="direction" label="方向" />
        </el-table>
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 50, 100]"
            layout="prev, pager, next"
            :total="filteredData.length"
        />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const tableData = ref([]);

const searchForm = ref({
    vehicle_type: [],
});

const filteredData = computed(() => {
    return tableData.value.filter(item => {
        return searchForm.value.vehicle_type.length === 0 || searchForm.value.vehicle_type.includes(item.vehicle_type);
    });
});

const pageData = computed(() => {
    return filteredData.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value);
});


const currentPage = ref(1);
const pageSize = ref(15);

fetch('/api/main/passage_log')
    .then(res => res.json())
    .then(data => {
        tableData.value = data.data.sort((a, b) => new Date(b.create_time) - new Date(a.create_time));
    });

const formatTime = (row, column, cellValue) => {
    return new Date(cellValue).toLocaleString()
}
</script>

<style scoped>
.passage-log-page {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>


