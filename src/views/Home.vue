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
                <router-view></router-view>
            </el-main>
        </el-container>

    </div>
</template>

<script>
    import HomeNavBar from "@/components/home/HomeNavBar";
    export default {
        name: "Home",
        components: { HomeNavBar},
        created() {
            this.$store.state.searchGoodsLike = ''
        }
    }

</script>

<style scoped>
    *{
        margin: 0 auto;
        padding: 0;
    }
    .box{
        width: 100%;
        height: 100%;
        /*background-color: #E8E2E0;*/
    }
    .navBar{
        width: 750px;
        justify-content: center;
        /*border: 1px solid red;*/
    }

</style>