<template>
    <h1>用户管理</h1>

    <el-dialog v-model="dialogVisible" title="编辑用户信息" width="30%">
        <el-form :model="form" label-width="120px">
            <el-form-item label="工号">
                {{ form.identifier }}
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="form.gender">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                </el-select>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" />
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="form.phone" />
            </el-form-item> 
        </el-form>
        <template #footer>
            <el-button type="primary" @click="handleUpdate">更新</el-button>
            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        </template>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="identifier" label="工号" />
        <el-table-column prop="username" label="姓名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="update_time" label="更新时间" :formatter="formatTime" />
        <el-table-column label="操作">
            <template #default="scope">
                <div class="button-group">
                    <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </div>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { ref } from 'vue';
import { request } from '~/utils';
import { ElMessage } from 'element-plus';

const tableData = ref([]);
const dialogVisible = ref(false);

const form = ref({})

const formatTime = (row, column, cellValue) => {
    return new Date(cellValue).toLocaleString();
}

function fetchData() {
    fetch('/api/main/user')
        .then(res => res.json())
        .then(data => {
            tableData.value = data.data;
        });
}

fetchData();

const handleEdit = (row) => {
    dialogVisible.value = true;
    form.value = row;
}

const handleUpdate = () => {
    request.post(`/api/main/user/${form.value.id}`, {
        username: form.value.username,
        gender: form.value.gender,
        email: form.value.email,
        phone: form.value.phone
    })
        .then(response => {
            ElMessage.success(response.data.detail);
            fetchData();
            dialogVisible.value = false;
        })
        .catch(error => {
            ElMessage.error(error);
        });
}

const handleDelete = (row) => {
    request.delete(`/api/main/user/${row.id}`)
        .then(response => {
            ElMessage.success(response.data.detail);
            fetchData();
        })
        .catch(error => {
            ElMessage.error(error.toString());
        });
}

</script>

<style scoped>
.button-group {
    display: flex;
    justify-content: space-between;
}
</style>