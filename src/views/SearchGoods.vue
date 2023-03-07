<template>
    <div class="box">
        <el-container>
            <el-header class="el-header">
                <!--首页导航区-->
                <div class="navBar">
                    <home-nav-bar></home-nav-bar>
                </div>
            </el-header>
            <el-main class="el-main">
                <div class="search">
                    <search></search>
                </div>
                <div>
                    <search-goods-by-name></search-goods-by-name>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import HomeNavBar from "@/components/home/HomeNavBar";
    import Search from "@/components/home/Search";
    import SearchGoodsByName from "@/components/search/SearchGoodsByName";

    export default {
        name: "SearchGoods",
        components: {SearchGoodsByName, Search, HomeNavBar},
        data() {
            return {
                display_row: '',
                active: 'none'
            }
        },
        // 计算属性
        computed: {
            searchGoodsLike(){
                return this.$store.state.searchGoodsLike
            }

        },
        methods: {

        }
    }
</script>

<style scoped>

    .box {
        width: 100%;
        height: 100%;
        /*background-color: #E8E2E0;*/
    }

    .navBar, .search {
        margin: 0 auto;
        width: 800px;
    }

    .search {
        margin: 20px auto;
    }

    .el-main {
        width: 1230px;
        margin: 0 auto;
        border: 1px solid green;
    }

</style>