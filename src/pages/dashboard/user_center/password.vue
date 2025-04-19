<template>
    <h1>修改密码</h1>
    <div class="password-form">
        <el-form ref="formRef" :model="form" label-width="auto" :rules="rules">
            <el-form-item label="旧密码" prop="old_password">
                <el-input type="password" v-model="form.old_password" />
            </el-form-item>
            <el-form-item label="新密码" prop="new_password">
                <el-input type="password" v-model="form.new_password" />
            </el-form-item>
            <el-form-item label="确认新密码" prop="new_password_confirmation">
                <el-input type="password" v-model="form.new_password_confirmation" />
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" @click="handleUpdatePassword">更新密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import { ElMessage } from 'element-plus'
import { store } from '~/store'
import { request } from '~/utils'

const form = ref({
    old_password: '',
    new_password: '',
    new_password_confirmation: '',
})

const formRef = useTemplateRef('formRef')

const rules = ref({
    old_password: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
    ],
    new_password: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, message: '密码长度至少为6位', trigger: 'blur' }
    ],
    new_password_confirmation: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        {
            validator: (_rule: any, value: string, callback: (error?: Error) => void) => {
                if (value !== form.value.new_password) {
                    callback(new Error('两次输入的密码不一致'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ],
})

const handleUpdatePassword = async () => {
    try {
        formRef.value.validate();
    } catch(err) {
        return;
    }
    try {
        const response = await request.put('/api/user/' + store.value.profile.id + '/password', {
            oldPassword: form.value.old_password,
            newPassword: form.value.new_password
        })
        if (response.status === 200) {
            ElMessage.success('更新密码成功')
        } else {
            ElMessage.error(response.data.detail)
        }
    } catch (error) {
        ElMessage.error(error.toString())
    }
}
</script>

<style scoped>
.password-form {
    width: 300px;
    margin: 20px auto;
}
</style>