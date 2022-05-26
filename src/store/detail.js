const { reqGoodsInfo } = require('@/api')

const state = {
  goodInfo: {},
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },
}
const actions = {
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
}
const getters = {
  categoryView(state) {
    // 比如：state.goodInfo初始状态空对象，空对象的categoryView属性值undefined
    // 当前计算出来的categoryView属性值至少是一个空对象，假的报错就不会有了
    return state.goodInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || {}
  },
  valuesSkuJson(state) {
    return state.goodInfo.valuesSkuJson || {}
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
