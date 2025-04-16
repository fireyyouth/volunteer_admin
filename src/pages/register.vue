<template>
    <div class="register-page">

        <el-radio-group v-model="form.role">
            <el-radio value="teacher">教职工</el-radio>
            <el-radio value="student">学生</el-radio>
            <el-radio value="visitor">访客</el-radio>
        </el-radio-group>

        <el-form :model="form" ref="formRef" label-width="auto" class="register-form" :rules="rules[form.role]">
            <el-form-item :label="identifier_label[form.role]" prop="identifier">
                <el-input v-model="form.identifier" :placeholder="identifier_placeholder[form.role]" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" :validate-event="false" />
            </el-form-item>
            <el-form-item label="姓名" prop="username">
                <el-input type="text" v-model="form.username" placeholder="请输入姓名" :validate-event="false" />
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="form.gender" :validate-event="false">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="form.email" placeholder="请输入邮箱" :validate-event="false" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input type="phone" v-model="form.phone" placeholder="请输入手机号" :validate-event="false" />
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleRegister" :loading="loading">注册</el-button>
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
    role: 'teacher',
    identifier: '',
    password: '',
    username: '',
    gender: '',
    email: '',
    phone: '',
})

const identifier_label = {
    teacher: '工号',
    student: '学号',
    visitor: '身份证号'
}
const identifier_placeholder = {
    teacher: '请输入8位工号',
    student: '请输入8位学号',
    visitor: '请输入18位身份证号码'
}

const teacher_rules = ref({
    identifier: [
        { required: true, message: '请输入工号', trigger: 'blur' },
        { pattern: /^[0-9]{8}$/, message: '格式为 8 位数字', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    username: [
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

const student_rules = ref({
    identifier: [
        { required: true, message: '请输入学号', trigger: 'blur' },
        { pattern: /^[0-9]{8}$/, message: '格式为 8 位数字', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    username: [
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

const visitor_rules = ref({
    identifier: [
        { required: true, message: '请输入身份证号码', trigger: 'blur' },
        { pattern: /^[0-9]{18}$/, message: '格式为 18 位数字', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
    ],
    username: [
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
const rules = {
    teacher: teacher_rules,
    student: student_rules,
    visitor: visitor_rules
}

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
        console.log('registering')
        const response = await request.post(`/api/main/user`, form.value)
        console.log(response)
        if (response.status !== 200) {
            ElMessage.error(response.data.detail)
            return
        }
        ElMessage.success(response.data.detail)
        await new Promise(resolve => setTimeout(resolve, 500))
        router.push('/login')
    } catch (error) {
        console.log('exception')
        ElMessage.error(error.toString())
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
    width: 500px;
}

</style>
