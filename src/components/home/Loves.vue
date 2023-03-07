<template>

    <div class="box">
        <div class="love">
            <p>猜 你 喜 欢 </p>
            <span>个性推荐</span>
        </div>
        <el-row>
            <el-card class="box-card"
                     v-for="(goods,index) in goodsList"
                     :body-style="{ padding: '20px' }">
                <div class="goods-img" @click="goodsDetail(goods)">
                    <img :src="goods.img" alt="">
                </div>
                <div class="goods-title" @click="goodsDetail">
                    {{ goods.name }}
                </div>
                <div class="shop-name" @click="allGoodsByShopName(goods.sid)">
                    {{ goods.shop_name }}
                </div>
                <div class="price">
                    <span>￥</span><strong>{{ goods.dis_price }}</strong>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Loves",
        data() {
            return {
                goodsList: [{
                    shop_name: '',
                    dis_price: 0,
                    sales: 0,
                    sid: ''
                }]
            }
        },
        methods: {
            findGoodsLimit: function () {
                this.$axios.get("/goods/findAllGoodsLimit")
                    .then(resp => {
                        this.goodsList = resp.data.data
                        let list = resp.data.data;
                        console.log(list[0].dis_price)
                    })
            },
            // 点击店铺名查询该店铺下所有商品
            allGoodsByShopName(sid) {
                this.$axios.get('/goods/findGoodsBySid/' + sid)
                    .then(resp => {
                        this.$store.commit('getSearchGoods',resp.data.data)
                        this.$router.replace('/searchGoods')
                    })
            },
            // 点击图片或者商品名称，跳转到商品详情组件
            goodsDetail(goodsDetail){
                // 将商品数据存到全局
                this.$store.commit("goodsDetail",goodsDetail)
                this.$router.replace('/goodsDetail')
            }
        },
        mounted() {
            this.findGoodsLimit()
        }
    }
</script>

<style scoped>
    .box {
        width: 1230px;
        /*border: 1px solid red;*/
        background-color: #f4eee3;
        padding: 10px;
    }

    .love p {
        display: inline-block;
        font-size: 25px;
        margin: 10px 0;
        /*border: 1px solid gray;*/
        /*font-weight: bold;*/
    }

    .love p, .love span {
        vertical-align: middle;
    }

    .love span {
        display: inline-block;
        height: 20px;
        width: 75px;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: white;
        margin-left: 10px;
        border-radius: 5px;
        background-color: orangered;
    }

    .box-card {
        width: 370px;
        /*height: 200px;*/
        float: left;
        margin-right: 30px;
        /*border: 1px solid orangered;*/
        position: relative;
        /*display: flex;*/
        justify-content: center;
        margin-top: 10px;
        cursor: pointer;
    }

    .box-card:hover {
        box-shadow: 0 0 25px gray;
        border: 1px solid orangered;
    }

    .goods-img > img {
        width: 150px;
        height: 150px;
        display: inline-block;
        /*border: 1px solid red;*/
    }

    .goods-title {
        position: absolute;
        left: 180px;
        top: 20px;
        cursor: pointer;
    }

    .shop-name {
        position: absolute;
        left: 180px;
        top: 80px;
        cursor: pointer;
    }

    .shop-name:hover, .goods-title:hover {
        color: orangered;
    }

    .price {
        position: absolute;
        left: 180px;
        top: 140px;
        color: orangered;
    }

    .price strong {
        font-size: 20px;

    }
</style>