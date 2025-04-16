<template>
    <h1>车位预约</h1>
    <el-form class="date-form" ref="formRef" :model="form" label-width="130px" :rules="rules">
        <el-form-item label-width="0" prop="timeRange">
            <el-date-picker
                v-model="form.timeRange"
                type="datetimerange"
                range-separator="至"
                placeholder="请选择时间范围"
            />
        </el-form-item>
        <div>
            <el-button type="primary" plain @click="handleSearch" :loading="loading">查询可用车位</el-button>
        </div>
    </el-form>

    <VehiclePickDialog
        ref="vehiclePickDialogRef"
        :startTime="form.timeRange[0]"
        :endTime="form.timeRange[1]"
        :selectedParkingSpot="selectedParkingSpot"
        v-model:visible="dialogVisible"
        @refresh="fetchParkingSpots(form.timeRange[0], form.timeRange[1])"
    />

    <div class="parking-container" v-if="queriedTimeRange" v-loading="loading">
        <p><b>{{ queriedTimeRange }}</b> 的车位预约状态 <span class="available-icon"></span> 可预约 · <span class="unavailable-icon"></span> 已被预约</p>
        <template v-for="(spots, district) in parkingSpots" :key="district">
            <div class="parking-section">
                <h3>{{ district }}</h3>
                <div class="parking-grid">
                    <template v-for="spot in spots" :key="spot.id" class="parking-spot">
                        <el-tooltip v-if="!spot.reserved" content="点击预约" placement="top">
                            <div class="parking-spot available" @click="handleSelectParkingSpot(spot.id.toString().padStart(2, '0'))">
                                <span>车位{{ spot.id.toString().padStart(2, '0') }}</span>
                            </div>
                        </el-tooltip>
                        <div v-else class="parking-spot unavailable">
                            <span>车位{{ spot.id.toString().padStart(2, '0') }}</span>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, useTemplateRef, watch } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus'
import Cookies from 'js-cookie'

interface RuleForm {
    timeRange: [Date, Date];
}

const rules = reactive<FormRules<RuleForm>>({
    timeRange: [
      { required: true, message: '请输入时间范围', trigger: 'blur' },
    ],
})


function datePlusHour(i) {
    let date = new Date();
    date.setMinutes(0);
    date.setSeconds(0);
    date.setHours(date.getHours() + i);
    return date;
}
const form = ref<RuleForm>({
    timeRange: [datePlusHour(1), datePlusHour(2)],
});



const dialogVisible = ref(false);

const queriedTimeRange = ref<string>('');

const selectedParkingSpot = ref('');

const formRef = useTemplateRef<FormInstance>('formRef')

const handleSelectParkingSpot = async (spotId: string) => {
    try {
        await formRef.value?.validate()
    } catch (error) {
        console.log(error)
        return
    }
    selectedParkingSpot.value = spotId;
    dialogVisible.value = true;
    console.log('dialogVisible', dialogVisible.value)
};


const parkingSpots = ref<Record<string, { id: string, reserved: boolean }[]>>({});

const loading = ref(false);

function fetchParkingSpots(startTime: Date, endTime: Date) {
    loading.value = true;
    fetch(`/api/main/parking_spot?start_time=${startTime?.toISOString()}&end_time=${endTime?.toISOString()}`).then(res => res.json()).then(data => {
        console.log(data);
        parkingSpots.value = data.data;
        queriedTimeRange.value = `${startTime.toLocaleString()} 到 ${endTime.toLocaleString()}`;
    }).catch(error => {
        ElMessage.error('查询失败:' + error.toString())
    }).finally(() => {
        console.log('finally')
        loading.value = false;
    })
}


async function handleSearch() {
    try {
        await formRef.value?.validate()
    } catch (error) {
        return
    }
    fetchParkingSpots(form.value.timeRange[0], form.value.timeRange[1]);
}
</script>

<style scoped>
    .date-form {
        display: flex;
        justify-content: center;
    }
    .parking-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }
    .parking-section {
        background-color: white;
        width: 95%;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 20px;
        border: 2px solid #eef2f3;
    }
    .parking-grid {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        gap: 10px;
        justify-content: center;
    }
    .parking-spot {
        width: 150px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        position: relative;
        color: white;
    }
    .parking-spot.available {
        background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
        color: rgb(22 101 52 / var(--tw-text-opacity, 1));
        cursor: pointer;
    }
    .parking-spot.available:hover {
        background-color: rgb(187 247 208 / var(--tw-bg-opacity, 1));
    }
    .parking-spot.unavailable {
        background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
        color: rgb(153 27 27 / var(--tw-text-opacity, 1));
    }
    .available-icon {
        display: inline-block;
        height: 1rem;
        width: 1rem;
        background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
    }
    .unavailable-icon {
        display: inline-block;
        height: 1rem;
        width: 1rem;
        background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
    }
    .dialog-footer {
        display: flex;
        justify-content: center;
    }
</style>