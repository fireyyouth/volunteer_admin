<template>
    <el-dialog title="活动" v-model="dialogVisible">
        <el-form :model="form" ref="formRef" label-width="auto" class="register-form" :rules="rules">
            <el-form-item label="活动名称" prop="name">
                <el-input type="text" v-model="form.name" placeholder="请输入活动名称" :validate-event="false" />
            </el-form-item>
            <el-form-item label="活动编号" prop="identifier">
                <el-input v-model="form.identifier" placeholder="请输入活动编号" />
            </el-form-item>
            <el-form-item label="活动开始时间" prop="start_time">
                <el-date-picker v-model="form.start_time" type="date" placeholder="选择活动开始时间" />
            </el-form-item>
            <el-form-item label="活动结束时间" prop="end_time">
                <el-date-picker v-model="form.end_time" type="date" placeholder="选择活动结束时间" />
            </el-form-item>
            <el-form-item label="活动图片" prop="image">
                <el-upload
                    class="avatar-uploader"
                    action="/main/api/upload_image"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                >
                    <img v-if="form.image" :src="form.image" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit()">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, reactive, ref, useTemplateRef } from 'vue';
import type { UploadProps, FormInstance } from 'element-plus'
import { request } from '~/utils'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const dialogVisible = defineModel<boolean>('visible');

const formRef = useTemplateRef<FormInstance>('formRef')

const form = reactive({
    identifier: '',
    name: '',
    start_time: '',
    end_time: '',
    image: '',
})

const rules = ref([
    { required: true, message: '请输入活动编号', trigger: 'blur' },
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    { required: true, message: '请输入活动开始时间', trigger: 'blur' },
    { required: true, message: '请输入活动结束时间', trigger: 'blur' },
])

const handleAvatarSuccess: UploadProps['onSuccess'] = async (response, uploadFile) => {
    const data = await response.json()
    form.image = URL.createObjectURL(data.url)
}

const onSubmit = async () => {
    try {
        await formRef.value?.validate()
    } catch (error) {
        return
    }
    try {
        const response = await fetch(
            `/api/main/activities/${props.activity_id}`,
            {
                method: 'PUT',
                headers: {
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                body: JSON.stringify(form)
            }
        )
        const data = await response.json()
        if (response.ok) {
            ElMessage.success(data.detail)
            dialogVisible.value = false;
        } else {
            ElMessage.error(data.detail)
        }
    } catch (error) {
        ElMessage.error('错误:' + error.toString())
    }
}

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>

