<template>
  <div>
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="保存"
      @click-right="onClickRight"
      @click-left="$emit('close')"
    ></van-nav-bar>
    <van-field
      v-model="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="17"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
// import updateUserName from '@/api/user.js'
import { updateUserName } from '@/api/user.js'
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  created() {
    this.localName = this.value
  },
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.localName.trim() === '') return this.$toast('请输入昵称')
        await updateUserName({
          name: this.localName
        })
        this.$emit('input', this.localName)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        // console.log(error)
        // this.$toast('更新失败')
        console.dir(error)
        if (error.response && error.response.status === 409) {
          return this.$toast('用户名已存在')
        }
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style></style>
