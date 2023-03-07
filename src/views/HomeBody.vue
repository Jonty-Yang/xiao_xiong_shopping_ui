<template>

    <div class="homeBody">
        <!--搜索区-->
        <div class="search">
            <!--logo-->
            <img src="" alt="">
            <search></search>
        </div>
        <!--中间主体区域-->
        <div class="content">
            <!--左侧商品分类区域-->
            <div class="goodsType">
                <goods-type @onSendTid="getTid"></goods-type>
            </div>
            <!--中间轮播图区-->
            <div class="banner">
                <banner></banner>
            </div>
            <!--右侧个人中心区-->
            <div class="myself">
                <myself></myself>
            </div>
        </div>
        <!--猜你喜欢区-->
        <div class="loves">
            <!--<h2>猜你喜欢</h2>-->
            <loves></loves>
        </div>
        <!--页脚区-->
        <div class="footer">
            <!--<h2>页脚部分</h2>-->
        </div>
    </div>
</template>

<script>
    import HomeNavBar from "@/components/home/HomeNavBar";
    import Search from "@/components/home/Search";
    import GoodsType from "@/components/home/GoodsType";
    import Banner from "@/components/home/Banner";
    import Myself from "@/components/home/Myself";
    import Loves from "@/components/home/Loves";

    export default {
        name: "Home",
        components: {Loves, Myself, Banner, GoodsType, Search, HomeNavBar},
        data() {
            return {
                goodsList: [],
                tid: 0
            }
        },
        methods: {
            getTid(tid) {
                this.$axios.get('/goods/findGoodsByTid/' + tid)
                    .then(resp => {
                        let data = resp.data.data;
                        if (data.length <= 0) {
                            this.$message.error('没有该类别商品，请联系商家更新！')
                        } else {
                            this.$store.state.searchGoodsList = data
                            // 点击商品类型，跳转后回显类型名称
                            this.$store.commit('searchGoodsCondition',data[0].tname)
                            this.$router.replace("searchGoods")
                        }
                    })
            },

        }
    }
</script>

<style scoped>
    .homeBody {
        border: 1px solid gray;
        padding: 10px;
    }

    .search {
        width: 100%;
        height: 60px;
        margin: 0 auto;
        /*border: 1px solid red;*/
        text-align: center;
    }

    .content > div {
        display: inline-block;
    }

    .content {
        margin-top: 30px;
        width: 100%;
        height: 400px;
        border: 1px solid red;
    }

    .goodsType {
        /*margin-left: 150px;*/
        width: 300px;
        /*border: 1px solid red;*/
    }

    .banner {
        width: 600px;
        /*border: 1px solid gray;*/
        margin: 0 15px;
    }

    .myself {
        width: 300px;
        /*border: 1px solid rebeccapurple;*/
    }

    .goodsType, .banner, .myself {
        height: 100%;
        vertical-align: top;
    }
</style>