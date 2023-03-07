<template>

    <div class="box">
        <el-container class="el-container">
            <el-header>


            </el-header>
            <el-main class="el-main">
                <div class="left">
                    <img :src="goodsDetail.img" alt="">
                </div>
                <div class="right">
                    <div class="goods-title">
                        <h3>{{goodsDetail.name}}</h3>
                        <span>月销 {{goodsDetail.sales}}+</span>
                    </div>
                    <!--收藏-->
                    <div class="collection" @click="collectionGoods">
                        <i class="el-icon-star-off"></i><span>收藏</span>
                    </div>
                    <div class="price">
                        <span>原价：<del>￥{{goodsDetail.or_price}}</del></span>
                        <p>促销价：<span>￥{{goodsDetail.dis_price}}</span></p>
                    </div>
                    <div class="color">
                        <span>颜色：{{goodsDetail.color}}</span>
                    </div>
                    <div class="detail">
                        <span>商品描述：{{goodsDetail.remark}}</span>
                    </div>
                    <div class="number">
                        <span>数量：</span>
                        <el-button type="primary"
                                   class="sub-num"
                                   @click="subNum"
                                   :disabled="isUseSub"
                                   size="mini">-
                        </el-button>
                        <input
                                class="num"
                                v-model.number="num"
                        />
                        <el-button type="primary"
                                   class="add-num"
                                   @click="addNum"
                                   :disabled="isUseAdd"
                                   size="mini">+
                        </el-button>
                    </div>
                    <div>
                        <button type="button" class="buy" @click="buy">立即购买</button>
                        <button type="button" class="addCart" @click="addCart">加入购物车</button>
                    </div>
                </div>
            </el-main>
            <el-footer>
                宝贝评论
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import HomeNavBar from "@/components/home/HomeNavBar";
    import Search from "@/components/home/Search";

    export default {
        name: "GoodsDetail",
        components: {Search, HomeNavBar},
        data() {
            return {
                goodsDetail: {},
                num: 1,
                isUseSub: true,
                isUseAdd: false,
                order: {
                    gid: 1,
                    goods_name: '',
                    uid: 1,
                    price: 0,
                    total: 0,
                    number: 1,
                    status: 0
                },
                collection:{
                    gid:1,
                    uid:1
                },
                cart:{
                    gid:1,
                    uid:1,
                    num:1,
                }
            }
        },
        created() {
            this.goodsDetail = this.$store.state.goodsDetail
        },
        methods: {
            addNum() {
                if (this.num < this.goodsDetail.stock) {
                    this.num++
                    this.isUseSub = false
                } else {
                    this.num = this.goodsDetail.stock
                    this.isUseAdd = true
                    this.isUseSub = false
                }
            },
            subNum() {
                if (this.num > 1) {
                    this.num--
                    this.isUseAdd = false
                } else {
                    this.num = 1
                    this.isUseSub = true
                }
            },
            // 点击下单
            buy() {
                this.$confirm('确定下单该商品吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.order.uid = this.$store.state.userLogin.uid
                    this.order.gid = this.goodsDetail.gid
                    this.order.goods_name = this.goodsDetail.name
                    this.order.price = this.goodsDetail.dis_price
                    this.order.number = this.num
                    this.order.total = this.goodsDetail.dis_price * this.num
                    this.$axios.post('/orders/buy', this.order)
                        .then(resp => {
                            if (resp.data.code == 200) {
                                this.$message.success(resp.data.data)
                            } else {
                                this.$message.error(resp.data.data)
                            }
                            console.log("resp;", resp.data)
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
                })

            },
            // 添加购物车
            addCart(){
                this.cart.gid = this.goodsDetail.gid
                this.cart.uid = this.$store.state.userLogin.uid
                this.cart.num = this.num
                this.$axios.post('/cart/add',this.cart)
                .then( resp => {
                    if(resp.data.code == 200){
                        this.$message.success(resp.data.data)
                    } else {
                        this.$message.error(resp.data.data)
                    }
                })
            },
            // 收藏商品
            collectionGoods(){
                this.collection.gid = this.goodsDetail.gid
                this.collection.uid = this.$store.state.userLogin.uid
                this.$axios.post('/collection/add',this.collection)
                .then( resp => {
                    if(resp.data.code == 200){
                        this.$message.success(resp.data.data)
                    } else {
                        this.$message.error(resp.data.data)
                    }
                })
            }
        }
    }
</script>

<style scoped>

    .box {
        width: 100%;
        height: 100%;
        /*background-color: #E8E2E0;*/
    }

    .el-container {
        margin: 0 auto;
        width: 800px;
    }

    .left > img {
        width: 300px;
        height: 350px;
    }

    .left, .right {
        float: left;
        position: relative;
        margin-right: 20px;
    }

    .right > div {
        margin-bottom: 20px;
    }

    /*收藏*/
    .el-icon-star-off{
        font-size: 16px!important;
    }
    .collection{
        font-size: 14px;
        color: gray;
        position: absolute;
        left: 200px;
        top: 80px;
    }
    .collection:hover{
        color: orangered;
        cursor: pointer;
    }
    /*月销字体样式*/
    .goods-title > span {
        font-size: 13px;
        color: grey;
    }
    .price>span>del{
        color: orangered;
        font-size: 18px;
    }
    .price>p>span{
        color: orangered;
        font-size: 22px;
        font-weight: bold;
    }
    /*数量区域样式*/
    .number > span {
        display: inline-block;
        height: 34px;
        line-height: 34px;
    }

    .number {
        display: flex;
        justify-content: left;
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
    .buy,.addCart{
        width: 130px;
        height: 50px;
        font-size: 17px;
        font-weight: bold;
        line-height: 50px;
        border: none;
        color: white;
    }
    .buy{
        background: linear-gradient(90deg,#FF7400,#FF6400,#FF5700,#FF4E00);
        border-radius: 25px 0 0 25px;
    }
    .addCart{
        background: linear-gradient(90deg,#FFC901,#FFBB01,#FFA601,#FF9602);
        border-radius: 0 25px 25px 0;
    }
</style>