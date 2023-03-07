<template>

    <div class="box">
        <el-row class="el-row">
            <el-card class="box-card"
                     v-for="(goods,index) in goodsList"
                     :body-style="{ padding: '10px' }">
                <div class="goods-img" @click="goodsDetail">
                    <img :src="goods.img" alt="">
                </div>
                <div class="price">
                    <strong>{{ '￥'+ goods.dis_price }}</strong>
                    <span>{{ '包邮' }}</span>
                    <p>{{ goods.sales + '人付款'}}</p>
                </div>
                <div class="goods-title" @click="goodsDetail">
                    <span>{{ goods.name }}</span>
                </div>
                <div class="shop-name" @click="allGoodsByShopName(goods.sid)">
                    <span>{{ goods.shop_name }}</span>
                    <span>{{ goods.address }}</span>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "SearchGoodsByName",
        data() {
            return {}
        },
        computed: {
            goodsList() {
                return this.$store.state.searchGoodsList
            }
        },
        methods: {
            // 点击图片或者商品名称，跳转到商品详情组件
            goodsDetail(){
                this.$router.replace('/goodsDetail')
            },
            // 点击店铺名查询该店铺下所有商品
            allGoodsByShopName(sid) {
                this.$axios.get('/goods/findGoodsBySid/' + sid)
                    .then(resp => {
                        this.$store.commit('getSearchGoods',resp.data.data)
                        this.$router.replace('/searchGoods')
                    })
            },
        }
    }
</script>

<style scoped>
    .box {
        width: 1180px;
        margin: 0 auto;
        padding: 10px;
        /*border: 1px solid red;*/
    }

    .el-row {
        margin-left: 30px;
        padding: 10px;
        /*border: 1px solid red;*/
    }

    .box-card {
        width: 240px;
        /*height: 200px;*/
        float: left;
        margin-right: 40px;
        /*border: 1px solid orangered;*/
        position: relative;
        justify-content: center;
        margin-top: 10px;
    }

    .box-card:hover {
        box-shadow: 0 0 25px gray;
        border: 1px solid orangered;
    }

    .goods-img > img {
        width: 220px;
        height: 260px;
        cursor: pointer;
    }

    .goods-img > img:hover {
        /*transform: scale(2);*/
    }

    .price {
        color: orangered;
        font-size: 18px;
    }

    .price > span {
        display: inline-block;
        background-color: orangered;
        margin-left: 5px;
        font-size: 10px;
        color: white;
        width: 30px;
        height: 16px;
        line-height: 16px;
        text-align: center;
    }

    .price > p {
        display: inline-block;
        float: right;
        margin-top: 8px;
        font-size: 12px;
        color: gray;
    }

    .price > span, .price > strong, .price > p {
        vertical-align: middle;
    }

    .goods-title {
        font-size: 12px;
        margin-top: 10px;
        cursor: pointer;
    }

    .shop-name {
        font-size: 12px;
        color: gray;
        margin: 10px 0;
        cursor: pointer;
    }

    .shop-name > span:nth-of-type(2) {
        float: right;
        cursor: text;
    }

    .shop-name > span:nth-of-type(1):hover, .goods-title:hover {
        color: orangered;
        /*下划线*/
        text-decoration: underline;
    }


</style>
