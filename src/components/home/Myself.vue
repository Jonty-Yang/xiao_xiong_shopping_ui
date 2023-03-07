<template>

    <div>
        <!--头像和昵称-->
        <div class="header">
            <img src="../../assets/banner3.jpg" alt="">
            <h3>{{'欢迎'+user.username}}</h3>
        </div>
        <div class="middle">
            <ul>
                <li>
                    <span class="number">
                        {{ cartList.length }}
                    </span>
                    <span @click="allCart">购物车</span>
                </li>
                <li>
                    <span class="number">
                        {{ noReceipt }}
                    </span>
                    <span>待收货</span>
                </li>
                <li>
                    <span class="number">
                        {{ noSendGoods }}
                    </span>
                    <span>待发货</span>
                </li>
                <li>
                    <span class="number">
                        {{ noComment }}
                    </span>
                    <span>待评价</span>
                </li>
            </ul>
        </div>
        <div class="footer">
            <ul>
                <li>
                    <i class="el-icon-s-check"></i>
                    <span>个人中心</span>
                </li>
                <li @click="collectionGoods">
                    <i class="el-icon-star-off"></i>
                    <span>宝贝收藏</span>
                </li>
                <li>
                    <i class="el-icon-suitcase-1"></i>
                    <span>关注的店</span>
                </li>
                <li>
                    <i class="el-icon-time"></i>
                    <span>我的足迹</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Myself",
        data() {
            return {
                user: {},
                cartList: [],
                ordersList: [],
                noReceipt: 0,   //待发货
                noSendGoods: 0, //待收货
                noComment: 0,   //待评价
            }
        },
        created() {
            this.user = this.$store.state.userLogin
            this.getCartInfo()
        },
        methods: {
            getCartInfo() {
                // 查询购物车表， 获取该用户购物车有多少商品
                this.$axios.get('/cart/findCartByUid/' + this.user.uid)
                    .then(resp => {
                        this.cartList = resp.data.data
                        this.$store.commit('cartList',this.cartList)
                    })
                // 查询订单表，获取待发货，待收货，待评论等数据
                this.$axios.get('/orders/findOrdersByUid/' + this.user.uid)
                .then( resp => {
                    console.log("ordersList",resp.data.data)
                    this.ordersList = resp.data.data
                    this.ordersList.forEach((o,i) => {
                        if(o.noReceipt == 0){
                            this.noReceipt++
                        }
                        if(o.noSendGoods == 0){
                            this.noSendGoods++
                        }
                        if(o.noComment == 0){
                            this.noComment++
                        }
                    })
                })
            },
            allCart(){
                this.$router.replace('/shopCart')
            },
            // 点击宝贝收藏
            collectionGoods(){
                this.$axios.get('/collection/findAllByUid/' + this.$store.state.userLogin.uid)
                .then( resp => {
                    console.log("collectionGoods:",resp.data.data)
                    this.$store.commit('collectionGoods',resp.data.data)
                    this.$router.replace('/collectionGoods')
                })
            }
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .header > img {
        display: block;
        margin: 10px auto;
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }

    .header > h3 {
        text-align: center;
    }

    .header {
        height: 180px;
        /*border: 1px solid gray;*/
    }

    ul {
        margin: 0 auto;
    }

    ul > li {
        list-style: none;
        display: inline-block;
        margin-left: 5px;
        width: 67px;
        text-align: center;
        font-size: 14px;
        cursor: pointer;
    }

    ul > li:hover {
        color: orangered;
    }

    ul > li > i {
        display: block;
        margin: 5px 0;
        font-size: 23px;
    }

    .number {
        display: block;
        color: orangered;
        margin: 5px 0;
        font-weight: bolder;
    }

    .middle {
        height: 80px;
        /*border: 1px solid red;*/
        margin: 20px 0;
    }

    .footer {
        height: 80px;
        /*border: 1px solid yellow;*/
    }
</style>