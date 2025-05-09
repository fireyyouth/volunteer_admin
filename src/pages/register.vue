<template>
    <div class="register-page">
        <h1>志愿者活动平台注册</h1>
        <el-form :model="form" ref="formRef" label-width="100px" class="register-form" :rules="rules">
            <el-form-item label="姓名" prop="name">
                <el-input type="text" v-model="form.name" placeholder="请输入姓名" :validate-event="false" />
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="form.account" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" :validate-event="false" />
            </el-form-item>
            <el-form-item label="确认密码" prop="password_confirmation">
                <el-input type="password" v-model="form.password_confirmation" placeholder="请确认密码" :validate-event="false" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="form.email" placeholder="请输入邮箱" :validate-event="false" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="form.gender" :validate-event="false">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" @click="handleRegister" :loading="loading">注册</el-button>
            </el-form-item>
            <el-form-item label=" ">
                <a @click="router.push('/login')">已有账号, 直接登录</a>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { request } from '~/utils'
import type { FormInstance } from 'element-plus'
import { useTemplateRef } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const loading = ref(false)
const formRef = useTemplateRef<FormInstance>('formRef')

const form = ref({
    account: '',
    password: '',
    password_confirmation: '',
    name: '',
    gender: '',
    email: '',
})

const rules = ref({
    account: [
        { required: true, message: '请输入工号', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    password_confirmation: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        {
            validator: (_rule: any, value: string, callback: (error?: Error) => void) => {
                if (value !== form.value.password) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ],
    name: [
        { required: true, message: '请输入姓名', trigger: 'blur' },
    ],
    gender: [
        { required: true, message: '请输入性别', trigger: 'blur' },
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
    ],
    phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^[0-9]{11}$/, message: '格式为 11 位数字', trigger: 'blur' },
    ]
})

const handleRegister = async () => {
    try {
        console.log('validating')
        await formRef.value?.validate()

    } catch (error) {
        console.log('validate error', error)
        return
    }
    loading.value = true
    try {
        const form_copy = JSON.parse(JSON.stringify(form.value))
        delete form_copy.password_confirmation
        const response = await request.post(`/api/user/register`, form_copy)
        ElMessage.success('注册成功')
        await new Promise(resolve => setTimeout(resolve, 500))
        router.push('/login')
    } catch (error) {
        console.log('exception')
        ElMessage.error(error.response?.data?.detail)
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.register-page {
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #f3e8ff, #e0f2fe);
}

.register-form {
    background-color: white;
    width: 500px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

button {
  width: 100%;
}

</style>
