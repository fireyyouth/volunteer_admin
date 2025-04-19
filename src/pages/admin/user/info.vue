<template>
    <h1>用户管理</h1>

    <el-dialog v-model="dialogVisible" title="编辑用户信息" width="30%">
        <el-form :model="form" label-width="120px">
            <el-form-item label="账号">
                {{ form.account }}
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="form.name" />
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
        </el-form>
        <template #footer>
            <el-button type="primary" @click="handleUpdate">更新</el-button>
            <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        </template>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="account" label="账号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="gender" label="性别" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="volunteerHour" label="志愿时长" />
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

function fetchData() {
    request.get('/api/user')
        .then(response => {
            tableData.value = response.data;
        });
}

fetchData();

const handleEdit = (row) => {
    dialogVisible.value = true;
    form.value = row;
}

const handleUpdate = () => {
    request.put(`/api/user/${form.value.id}`, {
        name: form.value.name,
        gender: form.value.gender,
        email: form.value.email,
    })
        .then(() => {
            ElMessage.success("更新成功");
            fetchData();
            dialogVisible.value = false;
        })
        .catch(error => {
            ElMessage.error(error);
        });
}

const handleDelete = (row) => {
    request.delete(`/api/user/${row.id}`)
        .then(() => {
            ElMessage.success("删除成功");
            fetchData();
        })
        .catch(error => {
            ElMessage.error(error);
        });
}

</script>

<style scoped>
.button-group {
    display: flex;
    justify-content: space-between;
}
</style>