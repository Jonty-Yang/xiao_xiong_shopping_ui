import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 全局token
    token:undefined || window.localStorage.getItem('token'),
    // 全局模糊查询的goods数据
    searchGoodsList:[],
    // 全局模糊搜索条件的回显数据
    searchGoodsLike:'',
    // 用户登录后全局数据
    userLogin:{},
    // 购物车数据
    cartList:[],
    // 商品详情数据
    goodsDetail:{},
    // 收藏商品数据
    collectionGoods:[]
  },
  getters: {

  },
  mutations: {
    // 用户登录后的全局token
    userLoginToken(state,token){
      state.token = token
      window.localStorage.setItem("token", token)
    },
    // 模糊查询的全局goods数据
    getSearchGoods(state,searchGoodsList){
      state.searchGoodsList = searchGoodsList
    },
    // 全局模糊搜索条件的回显数据
    searchGoodsCondition(state,searchGoodsLike){
      state.searchGoodsLike = searchGoodsLike
    },
    // 用户登录后全局数据
    userLogin(state,userLogin){
      state.userLogin = userLogin
    },
    // 全局购物车数据
    cartList(state,cartList){
      state.cartList = cartList
    },
    // 全局商品详情
    goodsDetail(state,goodsDetail){
      state.goodsDetail = goodsDetail
    },
    // 全局收藏商品数据
    collectionGoods(state,collectionGoods){
      state.collectionGoods = collectionGoods
    }
  },

  actions: {
  },
  modules: {
  }
})
