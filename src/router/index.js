import Vue from 'vue'
import VueRouter from 'vue-router'
import UserLogin from "@/views/UserLogin";
import UserReg from "@/views/UserReg";
import Home from "@/views/Home";
import HomeBody from "@/views/HomeBody";
import SearchGoods from "@/views/SearchGoods";
import ShopCart from "@/views/ShopCart";
import GoodsDetail from "@/components/goods/GoodsDetail";
import CollectionGoods from "@/views/CollectionGoods";


Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        redirect:"/homeBody"
    },
    {
        path: "/home",
        redirect:"/homeBody"
    },
    {
        path: '/home',
        component: Home,
        children: [
            {
                path: '/userLogin',
                component: UserLogin,
            },
            {
                path: '/userReg',
                component: UserReg,
            },
            {
                path: '/homeBody',
                component: HomeBody,
            },
        ]
    },
    {
        path: '/searchGoods',
        component: SearchGoods
    },
    {
        path: '/shopCart',
        component: ShopCart
    },
    {
        path: '/goodsDetail',
        component: GoodsDetail
    },
    {
        path: '/collectionGoods',
        component: CollectionGoods
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router
