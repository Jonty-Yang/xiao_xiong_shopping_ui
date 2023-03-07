<template>

    <div>
        <el-menu :default-active="active"
                 class="el-menu-demo"
                 mode="horizontal"
                 background-color="#fff"
                 text-color="#000"
                 active-text-color="red"
                 router>
            <el-menu-item class="el-menu-item" index="/homeBody">首页</el-menu-item>
            <el-menu-item class="el-menu-item" index="/userLogin" >登录</el-menu-item>
            <el-menu-item class="el-menu-item" index="/userReg">注册</el-menu-item>
            <el-submenu index="22" class="el-submenu">
                <template slot="title" class="el-submenu">个人中心</template>
                <el-menu-item class="el-menu-item">已买的宝贝</el-menu-item>
                <el-menu-item class="el-menu-item">我的足迹</el-menu-item>
            </el-submenu>
            <el-menu-item class="el-menu-item" index="/shopCart">
                <i class="el-icon-shopping-cart-2"></i>购物车
            </el-menu-item>

            <el-submenu index="12" class="el-submenu">
                <template slot="title" class="el-submenu">
                    <i class="el-icon-star-on"></i>收藏夹
                </template>
                <el-menu-item class="el-menu-item" index="/collectionGoods">收藏的宝贝</el-menu-item>
                <el-menu-item class="el-menu-item">收藏的店铺</el-menu-item>
            </el-submenu>
            <el-submenu index="11" class="el-submenu">
                <template slot="title" class="el-submenu">小熊卖家中心</template>
                <el-menu-item class="el-menu-item">我要开店</el-menu-item>
                <el-menu-item class="el-menu-item">已卖出的宝贝</el-menu-item>
                <el-menu-item class="el-menu-item">出售中的宝贝</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "HomeNavBar",
        data(){
           return{
               active:'',
           }
        },
        created() {
            this.active = '/homeBody'
        }
    }
</script>

<style scoped>
    /*.el-menu-item {*/
    /*    color: #000000;*/
    /*    !*text-align: center;*!*/
    /*}*/
    * {
        margin: 0;
        padding: 0;
    }

    .el-menu-item:hover, i, .el-submenu:hover {
        color: #ff4500 !important;
    }

    .el-menu-demo {
        justify-content: center;
    }

</style>