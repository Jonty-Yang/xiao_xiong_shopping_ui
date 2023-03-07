<template>

    <div>
        <el-input class="search" v-model="name"
                  prefix-icon="el-icon-search"
                  placeholder="输入商品名搜索"></el-input>
        <el-button type="primary"
                   @click="search"
                   class="search-btn">搜 索
        </el-button>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data() {
            return {
                name: '',
                goodsList: []
            }
        },

        created() {
          this.name = this.$store.state.searchGoodsLike
        },
        methods: {
            search() {
                // 将搜索的条件放到全局
                this.$store.commit('searchGoodsCondition',this.name)
                if(this.name.length <= 0){
                    this.$message.error("请输入搜索条件！")
                    return
                }
                this.$axios.get('/goods/findGoodsByName/' + this.name)
                    .then(resp => {
                        let data = resp.data.data
                        if (data.length === 0) {
                            this.$message.error("没有该条件的宝贝！")
                        } else {
                            if (resp.data.code == 200) {

                                // 将查询到的商品数据存到全局
                                this.$store.commit('getSearchGoods',data)
                                console.log("goodList[Search]",data)
                                this.$router.replace("/searchGoods")
                            }
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .search {
        display: inline-block;
        width: 550px;
        /*margin-top: 10px;*/
        /*height: 80px;*/
        /*border: 1px solid red;*/
    }

    .search-btn {
        margin-left: 30px;
    }
</style>