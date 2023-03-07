<template>

    <div>
        <h3>商品分类</h3>
        <!--<p v-for="(type,index) in goodsType">{{type.name}} /</p>-->
        <el-menu class="el-menu-demo"
                 router
                 @select="selectHandle"
                 mode="horizontal">
            <el-menu-item :index="type.tid + ''" v-for="(type,index) in goodsType">
                {{type.tname}}
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "GoodsType",
        data() {
            return {
                goodsType: [{
                    tid:0,
                    tname:''
                }]
            }
        },
        methods: {
            getAllGoodsType(){
                this.$axios.get('/goodsType/getAllGoodsType').then( resp => {
                    this.goodsType = resp.data.data
                    // this.$emit('onSendTypeName',this.goodsType)
                })
            },
            // @select 事件默认携带 :index 的值作为参数
            selectHandle(tid){
                // 触发父组件预定义的接收事件
                this.$emit('onSendTid',tid)
            }
        },
        mounted() {
            this.getAllGoodsType()
        }
    }
</script>

<style scoped>

</style>