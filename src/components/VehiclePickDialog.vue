<template>
    <el-dialog @opened="loadVehicles" v-model="dialogVisible" title="" width="600">
        <template #header>
            预约 <b>{{ props.startTime?.toLocaleString() }}</b> 到 <b>{{ props.endTime?.toLocaleString() }}</b> 的 <b>{{ props.selectedParkingSpot }}</b> 车位
        </template>
        <el-form ref="formRef" :model="form" label-width="130px" :rules="rules">
            <el-form-item label="选择车辆" prop="vehicle_id">
                <el-select v-model="form.vehicle_id" :validate-event="false">
                    <el-option v-for="vehicle in vehicles" :key="vehicle.id" :label="vehicle.number" :value="vehicle.id"/>
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" plain @click="handleReserveParkingSpot">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, defineProps, reactive, defineModel, defineEmits } from 'vue';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';

const props = defineProps<{
    startTime: Date;
    endTime: Date;
    selectedParkingSpot: string;
}>();

const dialogVisible = defineModel<boolean>('visible');

const form = ref({
    vehicle_id: '',
});

const emit = defineEmits(['refresh']);

const formRef = useTemplateRef<FormInstance>('formRef')

const rules = reactive({
    vehicle_id: [
        { required: true, message: '请选择车辆', trigger: 'blur' },
    ]
})

const vehicles = ref([]);

function loadVehicles() {
    fetch('/api/main/vehicle')
        .then(res => res.json())
        .then(data => {
            vehicles.value = data.data;
        });
}

const handleReserveParkingSpot = async () => {
    try {
        await formRef.value?.validate()
    } catch (error) {
        return
    }
    try {
        const response = await fetch(
            `/api/main/parking_spot/reservation?vehicle_id=${form.value.vehicle_id}&spot_number=${props.selectedParkingSpot}&start_time=${props.startTime?.toISOString()}&end_time=${props.endTime?.toISOString()}`,
            {
                method: 'POST',
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken')
                }
            }
        )
        const data = await response.json()
        if (response.ok) {
            ElMessage.success(data.detail)
            emit('refresh')
            dialogVisible.value = false;
        } else {
            ElMessage.error(data.detail)
        }
    } catch (error) {
        ElMessage.error('错误:' + error.toString())
    }
}

</script>
