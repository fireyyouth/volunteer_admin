<template>
    <h1>车辆登记</h1>
    <div class="vehicle-page">
        <el-form class="vehicle-form" ref="formRef" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="车牌号码" prop="number" >
                <el-input v-model="form.number" :validate-event="false"/>
            </el-form-item>
            <el-form-item label="车辆类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择车辆类型"  :validate-event="false">
                    <template v-if="store.profile?.role === 'teacher'">
                        <el-option label="SUV" value="SUV" />
                        <el-option label="轿车" value="轿车" />
                        <el-option label="校车" value="校车" />
                    </template>
                    <el-option label="自行车" value="自行车" />
                </el-select>
            </el-form-item>
            <el-form-item label="车辆品牌" prop="brand">
                <el-input v-model="form.brand" :validate-event="false"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="register">登记</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef, reactive } from 'vue';
import Cookies from 'js-cookie';
import { ElMessage } from 'element-plus';
import type { FormRules } from 'element-plus';
import { useRouter } from 'vue-router';
import { store } from '~/store'

console.log('register setup');

const form = ref({
    number: '',
    type: '',
    brand: ''
});

interface RuleForm {
    number: string;
    type: string;
}

const rules = reactive<FormRules<RuleForm>>({
    number: [
        { required: true, message: '请输入车牌号', trigger: 'change' },
        { pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-Z0-9]{5}$/, message: '车牌号格式不正确', trigger: 'blur' }
    ],
    type: [{ required: true, message: '请输入车辆类型', trigger: 'change' }],
    brand: [{ required: true, message: '请输入车辆品牌', trigger: 'change' }]
});

const formRef = useTemplateRef('formRef');

const router = useRouter();

const register = async () => {
    try {
        await formRef.value.validate();
    } catch (error) {
        return;
    }
    try {
        const csrftoken = Cookies.get('csrftoken');
        const res = await fetch(`/api/main/vehicle?number=${form.value.number}&type=${form.value.type}`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrftoken
            }
        });
        const data = await res.json();
        if (res.ok) {
            ElMessage.success(data.detail);
            form.value.number = '';
            form.value.type = '';
            form.value.brand = '';
        } else {
            ElMessage.error(data.detail);
        }
    } catch (error) {
        ElMessage.error('注册失败:' + error.toString());
    }
}
</script>

<style scoped>
    .vehicle-page {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .vehicle-form {
        width: 400px;
        border: 1px solid #dcdfe6;
        border-radius: 10px;
        padding: 20px;
    }
</style>
