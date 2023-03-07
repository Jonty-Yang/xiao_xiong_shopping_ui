<template>
    <div>
        <div class="block">
            <el-carousel trigger="click"

                         height="398px">
                <el-carousel-item v-for="(img,index) in bannerImg" :key="index">
                    <img v-bind:src="img.url"
                         alt="轮播图"
                         @click=""
                         height="100%"
                         width="100%"/>
                </el-carousel-item>
            </el-carousel>
        <!--    遍历点击方法，跳转到不同的路由视图-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "Banner",
        data(){
            return {
                // 静态引用图片，需要用到 url:{require('路径')}
                bannerImg: [{
                    url:'https://gw.alicdn.com/imgextra/i4/1714128138/O1CN011nf8Xv29zFz3LZ3DC_!!0-https://gw.alicdn.com/imgextra/i4/890482188/O1CN01OyBkik1S29MbeXVWs_!!https://img.alicdn.com/imgextra/i2/2529461925/O1CN01z8JXQG1Q5h68FSfyD_!!2529461925.jpg_400x400.jpg'
                }, {
                    url: 'https://img.alicdn.com/imgextra/i4/2206861685791/O1CN01CIhoy31seKD6aePy2_!!2206861685791.jpg_430x430q90.jpg'
                }, {
                    url: 'https://gw.alicdn.com/imgextra/i2/797517839/O1CN010YbCUO27mJM0NgHAF_!!797517839-0-lubanu-s.jpg_Q75.jpg_.webp'
                }, {
                    url: 'https://gw.alicdn.com/imgextra/i4/1714128138/O1CN011nf8Xv29zFz3LZ3DC_!!0-item_pic.jpg_Q75.jpg_.webp'
                }]
            }
        }
    }
</script>

<style scoped>
    .block{
        /*color: wheat;*/
        background-color: gray;
    }
</style>