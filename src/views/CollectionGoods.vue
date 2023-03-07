<template>

    <div class="box">
        <el-container class="el-container">
            <el-header>

            </el-header>
            <el-main class="el-main">
                <div>
                    <h3>收藏宝贝</h3>
                </div>
                <div>
                    <h2 v-if="collectionGoods.length == 0 ? true:false">没有收藏的商品</h2>
                    <el-card class="box-card"
                             v-for="(c,index) in collectionGoods"
                             :body-style="{ padding: '20px' }">
                        <div class="goods-img">
                            <img :src="c.img" alt="">
                        </div>
                        <div class="goods-title">
                            {{ c.name }}
                        </div>
                        <div class="price">
                            <strong>￥{{ c.dis_price }}</strong>
                            <del>￥{{c.or_price}}</del>
                        </div>
                        <div class="delete" @click="deleteCollGoods(c.uid,c.gid)">
                            <i class="el-icon-delete"></i>
                        </div>
                    </el-card>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "CollectionGoods",
        data() {
            return {
                collectionGoods: [],
            }
        },
        created() {
            this.collectionGoods = this.$store.state.collectionGoods
        },
        methods: {
            deleteCollGoods(uid, gid) {
                this.$confirm('确定删除该收藏的商品吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    this.$axios.delete('/collection/deleteByUidGid/' + uid + '/' + gid)
                        .then( resp => {
                            if(resp.data.code == 200){
                                // 删除之后再次查询一边
                                this.$axios.get('/collection/findAllByUid/' + this.$store.state.userLogin.uid)
                                    .then( resp => {
                                        console.log("collectionGoods:",resp.data.data)
                                        this.$store.commit('collectionGoods',resp.data.data)
                                        setTimeout('',2000)
                                        location.reload()

                                    })
                                this.$message.success(resp.data.data)
                            } else {
                                this.$message.error(resp.data.data)
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    })
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

    .box-card {
        width: 190px;
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
        /*border: 1px solid red;*/
    }

    .goods-title {
        margin: 10px 0;
        cursor: pointer;
        font-size: 14px;
        font-weight: bold;
        overflow: hidden;
    }

    .price > strong {
        color: orangered;
    }

    .price > del {
        margin-left: 10px;
        color: gray !important;
    }

    .delete {
        position: absolute;
        right: 20px;
        bottom: 20px;
    }

    .delete:hover {
        cursor: pointer;
        color: orangered;
    }
</style>