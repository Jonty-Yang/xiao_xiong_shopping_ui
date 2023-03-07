<template>

    <div class="box">
        <el-container>
            <el-header>
                <!--首页导航区-->
                <div class="navBar">
                    <home-nav-bar></home-nav-bar>
                </div>
            </el-header>
            <el-main class="el-main">
                <div class="search">
                    <search></search>
                </div>
                <div class="cart-title">
                    <h3>购物车</h3>
                    <span>（全部 <span class="cart-total">{{cartList.length}}</span>）</span>

                </div>
                <div class="cart">
                    <el-card class="box-card"
                             v-for="(cart,index) in cartList"
                             :body-style="{ padding: '20px' }">
                        <div class="goodsImg">
                            <img :src="cart.goods.img" alt="商品图片">
                        </div>
                        <div class="goodsName">
                            {{ cart.goods.name }}
                        </div>
                        <div class="price">
                            <del>￥{{cart.goods.or_price}}</del>
                            <span>￥{{cart.goods.dis_price}}</span>
                        </div>
                        <!--{{num = cart.num}}-->
                        <div class="number">
                            <el-button type="primary"
                                       class="sub-num"
                                       @click="subNum(cart)"
                                       size="mini">-
                            </el-button>

                            <input v-model.number="cart.num"
                                   class="num"
                            />
                            <el-button type="primary"
                                       class="add-num"
                                       @click="addNum(cart)"
                                       size="mini">+
                            </el-button>
                        </div>
                        <div class="total-price">
                            <span>￥{{parseFloat(cart.goods.dis_price * cart.num).toFixed(2)}}</span>
                        </div>
                        <!--操作-->
                        <div class="operation">
                            <p>移入收藏夹</p>
                            <span>删除</span>
                        </div>
                    </el-card>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import HomeNavBar from "@/components/home/HomeNavBar";
    import Search from "@/components/home/Search";

    export default {
        name: "ShopCart",
        components: {Search, HomeNavBar},
        data() {
            return {
                cartList: [{
                    goods: {
                        or_price: 0,
                        dis_price: 0
                    },
                }],

            }
        },
        computed: {
            /*num(){
                return num
            }*/
        },
        created() {
            this.cartList = this.$store.state.cartList
        },
        methods: {
            subNum(cart) {
                console.log(cart)
                let subNum = cart.num
                if (cart.num <= 1) {
                    subNum = 1
                } else {
                    subNum--
                }
                this.cartList.forEach((c, i) => {
                    if (c.scid == cart.scid) {
                        c.num = subNum
                    }
                })
            },
            addNum(cart) {
                console.log(cart)
                let addNum = cart.num
                addNum++
                this.cartList.forEach((c, i) => {
                    if (c.scid == cart.scid) {
                        c.num = addNum
                    }
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

    .navBar, .search {
        margin: 0 auto;
        width: 800px;
        text-align: center;
        /*border: 1px solid red;*/
    }

    .search > div {
        margin: 0 auto;
    }

    .el-main {
        width: 1230px;
        margin: 0 auto;
    }

    .box {
        width: 100%;
        height: 100%;
        /*background-color: #E8E2E0;*/
    }

    .cart {
        width: 100%;
    }

    .cart-title h3 {
        display: inline-block;
    }

    .cart-title {
        font-weight: bold;
    }

    .box-card {
        width: 100%;
        margin: 10px 0;
        height: 190px;
    }

    .box-card div {
        width: 150px;
        float: left;
        margin-right: 20px;
        border: 1px solid orangered;
    }

    .box-card:hover {
        box-shadow: 0 0 25px gray;
        border: 1px solid orangered;
    }

    .goodsImg > img {
        width: 150px;
        height: 150px;
        border: 1px solid red;
    }

    .goodsName {
        width: 200px !important;
    }

    .price > del {
        font-size: 12px;
        color: gray;
        display: block;
    }

    .price > span {
        font-size: 14px;
        font-weight: bold;
    }

    .number {
        display: flex;
        justify-content: center;
    }

    .num {
        margin: 0 !important;
        width: 60px !important;
        text-align: center;
    }

    .add-num, .sub-num {
        font-size: 20px;
        border-radius: 0;
    }

    .total-price > span {
        font-size: 14px;
        font-weight: bold;
        color: orangered;
    }

    .operation {
        font-size: 13px;
    }

    .operation p {
        margin-bottom: 10px;
    }

</style>