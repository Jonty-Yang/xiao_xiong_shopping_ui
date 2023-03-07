<template>

    <div>
        <!--<home-nav-bar></home-nav-bar>-->
        <el-form class="login-form"
                 :rules="rules"
                 ref="myForm"
                 :model="loginUser"
                 label-position="left"
                 label-width="80px">
            <h2 class="login-title">用户登录</h2>
            <el-form-item class="el-form-item" label="手机号" prop="phone">
                <el-input v-model="loginUser.phone" placeholder="输入手机号"></el-input>
            </el-form-item>
            <el-form-item class="el-form-item" label="密码" prop="password">
                <el-input v-model="loginUser.password" type="password" placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item class="el-form-item">
                <el-button class="loginBtn" type="primary" @click="login('myForm')">登 录</el-button>
                <el-button class="regBtn" @click="register" type="warning" >注 册</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    import HomeNavBar from "@/components/home/HomeNavBar";
    export default {
        name: "UserLogin",
        components: {HomeNavBar},
        data() {
            return {
                loginUser: {
                    phone: '',
                    password: ''
                },
                rules: {
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },

                    ],
                    password: [
                        { required: true , message: '请输入密码',trigger: 'blur'},
                        { min:3,max:16,message: "请输入3 到 16 长度的字符",trigger: 'blur'}
                    ]
                }
            }
        },

        methods: {
            login() {
                this.$refs.myForm.validate( data => {
                    if(data){
                        this.$axios.post("/user/login", this.loginUser)
                            .then(resp => {
                                console.log(resp)
                                if (resp.data.code === 200) {
                                    this.$message.success("登录成功！")
                                    // console.log('dataUserLogin',resp.data.data)
                                    this.$store.commit('userLoginToken',resp.data.data.token)
                                    this.$store.commit('userLogin',resp.data.data.userLogin)
                                    this.$router.replace("/homeBody")
                                } else {
                                    this.$message.error(resp.data.data)
                                    this.loginUser = {}
                                }
                            })
                    } else {
                        console.log('数据提交有误，校验未通过!');
                        this.$message.error("数据提交有误，校验未通过")
                        return false;
                    }
                })

            },
            register(){
                this.$router.replace('/userReg')
            }
        }
    }
</script>

<style scoped>
    .login-title{
        text-align: center;
        margin-bottom: 20px;
        color: #505458;
    }
    .login-form{
        width: 350px;
        margin: 90px auto;
        box-shadow: 0 0 25px #cac6c6;
        padding: 35px 35px 15px 35px;
    }
    .el-form-item{
        width: 100%;
        /*text-align: center;*/
        /*border: 1px solid red;*/
    }
    .loginBtn{
        /*background-color: #505458;*/
        color: white;
        /*width: 100%;*/
        text-align: left !important;
    }
    .loginBtn:hover{
        /*opacity: 0.7!important;*/
    }
</style>