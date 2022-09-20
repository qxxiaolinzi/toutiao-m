<template>
  <div>
    <!-- 个人信息 -->
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 修改信息 -->
    <!-- 更新头像 -->
    <input
      type="file"
      ref="file"
      hidden
      accept=".png,.pdf.jpg"
      @change="selectPoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="avator" />
    </van-cell>

    <van-cell
      title="昵称"
      @click="isShowUpdateName = true"
      :value="user.name"
      is-link
    />
    <van-cell
      title="性别"
      @click="isShowUpdateGender = true"
      :value="user.gender ? '女' : '男'"
      is-link
    />
    <van-cell
      title="生日"
      @click="isShowUpdateBirthdy = true"
      :value="user.birthday || '2000 - 10 - 23'"
      is-link
    />

    <!-- 更新头像弹出层 -->
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avator
        v-if="isShowPhoto"
        :avator.sync="avator"
        :photo="photo"
      ></update-avator>
    </van-popup>

    <!-- 昵称弹层  -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <update-name
        v-if="isShowUpdateName"
        v-model="user.name"
        @close="isShowUpdateName = false"
      ></update-name>
    </van-popup>

    <!-- 性别 -->
    <van-popup
      v-model="isShowUpdateGender"
      style="width: 100%"
      position="bottom"
    >
      <update-gender
        v-if="isShowUpdateGender"
        v-model="user.gender"
        @close="isShowUpdateGender = false"
      ></update-gender>
    </van-popup>

    <!-- 生日 -->
    <van-popup
      v-model="isShowUpdateBirthdy"
      style="width: 100%"
      position="bottom"
    >
      <update-birthdy
        v-model="user.birthday"
        @close="isShowUpdateBirthdy = false"
      ></update-birthdy>
    </van-popup>
  </div>
</template>

<script>
import UpdateAvator from './components/UpdateAvator.vue'
import UpdateName from './components/UpdateName.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateBirthdy from './components/UpdateBirthdy.vue'

import { resolveToBase64 } from '@/utils'
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'userProfile',
  components: {
    UpdateAvator,
    UpdateName,
    UpdateGender,
    UpdateBirthdy
  },
  data() {
    return {
      user: {},
      isShowUpdateName: false,
      isShowUpdateGender: false,
      isShowUpdateBirthdy: false,
      isShowPhoto: false,
      photo: '',
      avator: ''
    }
  },
  created() {
    this.loadProfile()
  },
  methods: {
    async loadProfile() {
      try {
        const res = await getUserProfile()
        this.user = res.data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    async selectPoto() {
      // 获取用户选择的图片的file对象
      const file = this.$refs.file.files[0]
      // file 对象转成img.src可识别的属性
      // file对象转成base64
      const base64 = await resolveToBase64(file)

      // 传递base64给子组件
      this.photo = base64

      // 打开弹窗
      this.isShowPhoto = true

      // 解决不能连续选中同一张图片的bug
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
