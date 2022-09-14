import request from '@/utils/request'

/**
 * 获取用户频道，已通过请求拦截器添加token
 * @returns Promise实例对象
 */
export const getChannelAPI = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/**
 * 获取所有实例对象
 * @returns Promise
 */
export const getAllChannelAPI = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 * 删除频道
 * @param {Number/String} id 频道的id
 * @returns promise
 */

export const delChannelAPI = (id) => {
  return request({
    url: `/v1_0/user/channels/${id}`,
    method: 'DELETE'
  })
}

/**
 * 删除频道
 * @param {Number/String} id 新增频道的id
 * @param {Number} seq 新增频道添加的索引值
 * @returns Promise
 */

export const addChannelAPI = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}
