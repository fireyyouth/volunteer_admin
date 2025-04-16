<template>
    <h1>个人中心</h1>
    <el-descriptions border>
        <el-descriptions-item label="账号" :span="1">
            {{ form.identifier }}
        </el-descriptions-item>
        <el-descriptions-item label="姓名" :span="1">
            <el-input v-model="form.username" :disabled="inputDisabled" />
        </el-descriptions-item>
        <el-descriptions-item label="性别" :span="1">
            <el-select v-model="form.gender" :disabled="inputDisabled">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
            </el-select>
        </el-descriptions-item>
        <el-descriptions-item label="邮箱" :span="1">
            <el-input v-model="form.email" :disabled="inputDisabled" />
        </el-descriptions-item>
        <el-descriptions-item label="志愿时长" :span="1">
            {{ form.volunteer_hours }}
        </el-descriptions-item>
    </el-descriptions>
    <el-button v-if="inputDisabled" type="primary" @click="inputDisabled = false">编辑</el-button>
    <template v-else>
        <el-button type="primary" @click="handleUpdateProfile">更新</el-button>
        <el-button type="primary" @click="handleCancel">取消</el-button>
    </template>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { store } from '~/store';
import { request } from '~/utils';
import { ElMessage } from 'element-plus';

const roleMap = {
    teacher: '教职工',
    student: '学生',
    visitor: '访客',
    admin: '管理员'
}

const form = ref({
    ...store.value.profile,
});

const inputDisabled = ref(true);

const handleCancel = () => {
    inputDisabled.value = true;
    form.value = {
        ...store.value.profile,
    };
}

const handleUpdateProfile = async () => {
    const response = await request.post(`/api/main/user/${form.value.id}`, {
        username: form.value.username,
        gender: form.value.gender,
        email: form.value.email,
        phone: form.value.phone
    });
    if (response.status === 200) {
        ElMessage.success('更新成功');
        store.value.profile = response.data.data;
        form.value = {
            ...store.value.profile,
        };
        inputDisabled.value = true;
    }
};
</script>

<style scoped>
.profile-container {
    margin: 20px;
}
</style>
