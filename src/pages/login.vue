<template>
  <div class="login-page">
    <div class="login-container">
      <h1 class="title">校园车辆管理系统</h1>
      <el-form :model="teacherForm" ref="teacherFormRef" label-width="auto" style="max-width: 600px"
      :rules="teacher_rules">
      <el-form-item prop="identifier">
        <el-input v-model="teacherForm.identifier" :prefix-icon="User" placeholder="请输入8位工号/学号, 或18位身份证号" />
      </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="teacherForm.password" :prefix-icon="Lock" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button type="text" @click="router.push('/register')">还没有账号？点击注册</el-button>
      </el-form-item>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useTemplateRef, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { store } from '~/store'

const teacherForm = reactive({
  identifier: '',
  password: '',
})

const loading = ref(false)

const teacher_rules = reactive({
  identifier: [
    { required: true, message: '请输入工号或者学号', trigger: 'change' },
    { pattern: /^([0-9]{8}|[0-9]{18})$/, message: '格式为 8 位数字或 18 位数字', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
  ]
})


const router = useRouter()

const teacherFormRef = useTemplateRef<FormInstance>('teacherFormRef')

const onSubmit = async () => {
  try {
    console.log('validating')
    await teacherFormRef.value?.validate()
  } catch (error) {
    console.log('validate error', error)
    return
  }
  loading.value = true
  try {
    const response = await fetch(`/api/main/login`, {
      method: 'POST',
      body: JSON.stringify(teacherForm),
    })
    const data = await response.json()
    console.log(data)
    if (response.status !== 200) {
      ElMessage.error(data.detail)
      return
    }
    ElMessage.success(data.detail)
    store.value.profile = data.data
    await new Promise(resolve => setTimeout(resolve, 500))
    router.push('/dashboard')
  } catch (error) {
    ElMessage.error(error.toString())
  } finally {
    loading.value = false;
  }
}

</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #f3e8ff, #e0f2fe);
}

.login-container {
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

button {
  width: 100%;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: gray;
}
</style>