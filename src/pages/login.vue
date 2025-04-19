<template>
  <div class="login-page">
    <h1 class="title">志愿者活动平台登录</h1>
    <div class="login-container">
      <el-form :model="userForm" ref="userFormRef" label-width="auto" style="max-width: 600px"
      :rules="user_rules">
      <el-form-item prop="account">
        <el-input v-model="userForm.account" :prefix-icon="User" placeholder="请输入账号" />
      </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="userForm.password" :prefix-icon="Lock" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit()" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button type="text" @click="router.push('/register')">注册用户</el-button>
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
import { request } from '~/utils'

const userForm = reactive({
  account: '',
  password: '',
})

const loading = ref(false)

const user_rules = reactive({
  account: [
    { required: true, message: '请输入账号', trigger: 'change' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
  ]
})


const router = useRouter()

const userFormRef = useTemplateRef<FormInstance>('userFormRef')

const onSubmit = async () => {
  try {
    console.log('validating')
    await userFormRef.value?.validate()
  } catch (error) {
    console.log('validate error', error)
    return
  }
  loading.value = true
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'username=' + userForm.account + '&password=' + userForm.password
    })
    const data = await response.json()
    console.log(data)
    if (response.status !== 200) {
      ElMessage.error("登录失败")
      return
    }
    ElMessage.success("登录成功")
    store.value.profile = data.data
    await new Promise(resolve => setTimeout(resolve, 500))
    if (data.data.roles.map((x: { name: string }) => x.name).includes('ADMIN')) {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }
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