// import store from '@/store'
import request from '@/utils/request'
// user.js是根据后端给的划分
export const Login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户的基本信息
 * @returns Promise实例对象
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}

/**
 * 上传图片
 * @param {*} file 裁剪过后的图片的file对象
 * @returns
 */

export const uploadPhoto = (file) => {
  const fm = new FormData()
  fm.append('photo', file)

  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

export const getUserProfile = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

export const updateUserName = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
