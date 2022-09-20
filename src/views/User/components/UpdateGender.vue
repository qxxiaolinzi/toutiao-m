<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @change="onChange"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserName } from '@/api/user.js'

export default {
  data() {
    return {
      columns: ['男', '女']
      // gender: this.value
    }
  },
  props: {
    value: {
      type: Number
      // required: true
    }
  },
  methods: {
    onChange(picker, value, index) {
      this.gender = index
    },
    async onConfirm(value, index) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserName({
          gender: `${index}`
        })
        console.dir(this.gender)
        this.$emit('input', this.gender)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style></style>
