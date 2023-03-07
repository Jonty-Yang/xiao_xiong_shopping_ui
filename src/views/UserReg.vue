<template>

    <div>
        <el-form class="login-form"
                 :rules="rules"
                 ref="myForm"
                 :model="regUser"
                 label-position="left">
            <h2 class="login-title">用户注册</h2>
            <el-form-item class="el-form-item" label="手机号" prop="phone">
                <el-input v-model="regUser.phone" placeholder="输入手机号"></el-input>
            </el-form-item>
            <el-form-item class="el-form-item" label="密码" prop="password">
                <el-input v-model="regUser.password" type="password" placeholder="输入密码"></el-input>
            </el-form-item>
            <el-form-item class="el-form-item">
                <el-button class="loginBtn" type="primary" @click="reg('myForm')">注 册</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
        name: "UserLogin",
        data() {
            return {
                regUser: {
                    phone: '',
                    password: ''
                },
                rules: {
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'},

                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 16, message: "请输入3 到 16 长度的字符", trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            reg() {
                this.$refs.myForm.validate(data => {
                    if (data) {
                        this.$axios.post("/user/register", this.regUser)
                            .then(resp => {
                                if (resp.data.code === 200) {
                                    this.$message.success("注册成功！")
                                    this.$router.replace('/userLogin')
                                } else {
                                    this.$message.error(resp.data.data)
                                }
                            })
                    } else {
                        console.log('数据提交有误，校验未通过!');
                        this.$message.error("数据提交有误，校验未通过")
                        return false;
                    }
                })

            }
        }
    }
</script>

<style scoped>
    .login-title{
        text-align: center;
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
        width: 100%;
        text-align: center;
    }
</style>