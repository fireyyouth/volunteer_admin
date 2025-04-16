<template>
    <h1>通行统计</h1>
    <el-form inline :model="searchForm" label-width="100px">
        <el-form-item label="时间范围">
            <el-date-picker v-model="searchForm.date_range" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </el-form-item>
        <el-form-item label="车辆类型">
            <el-select v-model="searchForm.vehicle_type" multiple placeholder="请选择车辆类型">
                <el-option label="自行车" value="自行车" />
                <el-option label="汽车" value="汽车" />
                <el-option label="校车" value="校车" />
            </el-select>
        </el-form-item>
    </el-form>
    <div class="chart-container">
        <Bar v-if="barData.labels.length"  :data="barData" :options="barOptions" />
        <Pie v-if="pieData.labels.length"  :data="pieData" :options="pieOptions" />
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { Bar, Pie } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement,
    CategoryScale,
    LinearScale,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { ElMessage } from 'element-plus';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, zoomPlugin, ArcElement);


const pieOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
});

const barOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            title: {
                display: false,
                color: '#555'
            },
            ticks: {
                color: '#555',
                autoSkip: true,
                maxTicksLimit: 10
            },
            grid: {
                color: 'rgba(200, 200, 200, 0.2)'
            }
        },
        y: {
            title: {
                display: true,
                text: '每小时通行车辆',
                color: '#555'
            },
            ticks: {
                color: '#555'
            },
            grid: {
                color: 'rgba(200, 200, 200, 0.2)'
            }
        }
    }
});

const passageLogToPie = (passage_log) => {
    const vehicle_type_count = {};
    for (const item of passage_log) {
        if (!vehicle_type_count[item.vehicle_type]) {
            vehicle_type_count[item.vehicle_type] = 1;
        } else {
            vehicle_type_count[item.vehicle_type]++;
        }
    }
    return {
        labels: Object.keys(vehicle_type_count),
        datasets: [{
            label: '通行次数',
            data: Object.values(vehicle_type_count),
            backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
            ],
        }]
    };
};

const passageLogToChart = (passage_log) => {
    let logCountByHour = {};
    
    for (const item of passage_log) {
        const time = new Date(item.create_time);
        time.setMinutes(0);
        time.setSeconds(0);
        time.setMilliseconds(0);

        if (!logCountByHour[time]) {
            logCountByHour[time] = 1;
        } else {
            logCountByHour[time]++;
        }
    }
    
    const data = [];
    const labels = [];
    for (const time of Object.keys(logCountByHour).sort((a, b) => new Date(a) - new Date(b))) {
        labels.push(new Date(time).toLocaleString());
        data.push(logCountByHour[time]);
    }

    return {
        labels,
        datasets: [
            {
                label: '每小时通行车辆',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
                hoverBorderColor: 'rgba(75, 192, 192, 1)',
                data
            }
        ]
    };
};

const searchForm = ref({
    vehicle_type: [],
    date_range: []
});

const fullData = ref([]);

const filteredData = computed(() => {
    return fullData.value.filter(item => {
        return searchForm.value.vehicle_type.length === 0 || searchForm.value.vehicle_type.includes(item.vehicle_type);
    }).filter(item => {
        return searchForm.value.date_range.length === 0 || (new Date(item.create_time) >= new Date(searchForm.value.date_range[0]) && new Date(item.create_time) <= new Date(searchForm.value.date_range[1]));
    });
});

const barData = computed(() => {
    return passageLogToChart(filteredData.value);
});

const pieData = computed(() => {
    return passageLogToPie(filteredData.value);
});

(async () => {
    const response = await fetch('/api/main/passage_log');
    const data = await response.json();
    if (!response.ok) {
        ElMessage.error(data.detail);
    } else {
        fullData.value = data.data;
    }
})();

</script>

<style scoped>
.chart-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    width: 1600px;
    margin: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
}
</style>