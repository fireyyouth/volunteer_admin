<template>
    <el-form :model="form" ref="formRef" label-width="auto" class="register-form" :rules="rules">
        <el-form-item label="活动名称" prop="title">
            <el-input type="text" v-model="form.title" placeholder="请输入活动标题" :validate-event="false" />
        </el-form-item>
        <el-form-item label="活动要求" prop="volunteerCriteria">
            <el-input type="text" v-model="form.volunteerCriteria" placeholder="请输入活动要求" :validate-event="false" />
        </el-form-item>
        <el-form-item label="活动开始时间" prop="startDate">
            <el-date-picker v-model="form.startDate" type="date" placeholder="选择活动开始时间" />
        </el-form-item>
        <el-form-item label="活动结束时间" prop="endDate">
            <el-date-picker v-model="form.endDate" type="date" placeholder="选择活动结束时间" />
        </el-form-item>
        <el-form-item label="志愿时长" prop="volunteerHour">
            <el-input-number v-model="form.volunteerHour" placeholder="请输入志愿时长" :validate-event="false" />
        </el-form-item>
        <el-form-item label="活动图片" prop="imageURL">
            <el-input type="text" v-model="form.imageURL" placeholder="请输入活动图片 URL" :validate-event="false" />
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" @click="onSubmit()">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { defineModel, defineProps, reactive, ref, useTemplateRef } from 'vue';
import type { UploadProps, FormInstance } from 'element-plus'
import { request } from '~/utils'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const props = defineProps({
    onSuccess: {
        type: Function,
        required: true
    }
})

const formRef = useTemplateRef<FormInstance>('formRef')

const form = reactive({
    title: '',
    volunteerCriteria: '',
    volunteerHour: 1,
    startDate: '',
    endDate: '',
    imageURL: '',
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
        const response = await request.post(
            `/api/activity/`,
            form
        )
        if (response.status === 200) {
            ElMessage.success('提交成功')
            props.onSuccess()
        } else {
            ElMessage.error('提交失败')
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

