<template>
    <h1>公告栏</h1>
    <div class="content">
        <div>{{ new Date(bulletinBoard.update_time).toLocaleString() }}</div>
        <div v-if="store.profile?.role !== 'admin'" >
            <div>{{ bulletinBoard.content }}</div>
        </div>
        <div v-else>
            <el-input type="textarea" rows="10" v-model="bulletinBoard.content" :disabled="editDisabled" />
            <el-button v-if="editDisabled" @click="handleEdit">编辑</el-button>
            <template v-else>
                <el-button type="primary" @click="updateBulletinBoard">更新</el-button>
                <el-button @click="handleCancel">取消</el-button>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { store } from '~/store'
import { request } from '~/utils'
import { ElMessage } from 'element-plus'

const oldContent = ref('')
const bulletinBoard = ref({
    content: '',
    id: 0,
    update_time: ''
})
const editDisabled = ref(true)

function handleEdit() {
    oldContent.value = bulletinBoard.value.content
    editDisabled.value = false
}

function handleCancel() {
    bulletinBoard.value.content = oldContent.value
    editDisabled.value = true
}

const fetchBulletinBoard = () => {
    request.get('/api/main/bulletin_board')
        .then(response => {
            bulletinBoard.value = response.data[0];
        });
}

function updateBulletinBoard() {
    request.put(`/api/main/bulletin_board/${bulletinBoard.value.id}/`, { content: bulletinBoard.value.content })
        .then(response => {
            ElMessage.success('更新成功');
            fetchBulletinBoard();
            editDisabled.value = true;
        })
        .catch(error => {
            ElMessage.error(error);
        });
}

fetchBulletinBoard()

</script>

<style scoped>
.content {
    margin: 40px;
}
</style>
