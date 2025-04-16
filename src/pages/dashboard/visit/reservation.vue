<template>
    <h1>访客预约</h1>
    <div class="form-container">
        <el-form class="form" :model="form" label-width="120px" :rules="rules" ref="formRef">
            <el-form-item label="日期" prop="date">
                <el-date-picker  v-model="form.date" type="date" placeholder="请选择日期" :validate-event="false" />
            </el-form-item>
            <el-form-item label="车辆" prop="vehicle_number">
                <el-input v-model="form.vehicle_number" placeholder="请输入车牌号码" :validate-event="false" />
            </el-form-item>
            <el-form-item label="事由" prop="reason">
                <el-input v-model="form.reason" placeholder="请输入事由" :validate-event="false" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">预约</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, watch } from 'vue'
import { store } from '~/store'
import { ElMessage } from 'element-plus'
import Cookies from 'js-cookie'

const form = ref({
    vehicle_number: '',
    date: '',
    reason: ''
})

watch(form, (newVal) => {
    console.log(newVal)
}, { deep: true })

const rules = ref({
    vehicle_number: [
        { required: true, message: '请输入车牌号码', trigger: 'blur' },
        { pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{5}$/, message: '车牌号格式不正确', trigger: 'blur' }
    ],
    date: [{ required: true, message: '请选择日期', trigger: 'blur' }],
    reason: [{ required: true, message: '请输入事由', trigger: 'blur' }]
})

const formRef = useTemplateRef('formRef')

const handleSubmit = async () => {
    try {
        await formRef.value.validate();
    } catch (error) {
        return;
    }
    fetch(`/api/main/visit_reservation?vehicle_number=${form.value.vehicle_number}&date=${form.value.date.toISOString()}&reason=${form.value.reason}`, {
        method: 'POST',
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    })
    .then(res => res.json())
    .then(data => {
        form.value.date = ''
        form.value.vehicle_number = ''
        ElMessage.success(data.detail)
    })
}
</script>

<style scoped>
.form {
    width: 400px;
    align-items: center;
}

.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
