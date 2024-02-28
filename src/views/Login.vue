<template>
    <div class="login-container">
        <el-form :model="ruleForm" :rules="rules"
                 status-icon
                 ref="ruleForm"
                 label-position="left"
                 label-width="0px"
                 class="demo-ruleForm login-page">
            <h3 class="title">登录系统</h3>
            <el-form-item prop="name">
                <el-input type ="text"
                          v-model="ruleForm.username"
                          placeholder="用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password"
                          v-model ="ruleForm.password"
                          placeholder="密码"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-radio v-model="type" label="systemAdmin">系统管理员</el-radio>
                <el-radio style="position: relative;left: 40px" v-model="type" label="dormitoryAdmin">宿舍管理员</el-radio>
            </el-form-item>
            <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%;" @click="handleSubmit" :loading="loading">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data(){
        return{
            loading:false,
            ruleForm:{
                username:'admin1',
                password:'123123',
            },
            type:'systemAdmin',
            rules:{
                username: [{required:true,message:"请输入用户名",trigger:'blur'}],
                password: [{required:true,message:"请输入密码",trigger:'blur'}],

            }
        };
    },
    methods:{
        handleSubmit(){
            this.$refs.ruleForm.validate((valid) => {
                if (valid){
                    this.loading = true
                    let _this = this
                    if (_this.type == 'dormitoryAdmin'){
                        axios.get('http://localhost:8181/dormitoryAdmin/login',{params:_this.ruleForm}).then(function (resp){
                            if (resp.data.code == -1){
                                _this.$alert('用户不存在','提示',{
                                    confirmButtonText:'确定'
                                })
                            }else {
                                if (resp.data.code == -2){
                                    _this.$alert('密码错误','提示',{
                                        confirmButtonText:'确定'
                                    })
                                }else if (resp.data.code == 0){
                                    localStorage.setItem('dormitoryAdmin',JSON.stringify(resp.data.data))
                                    _this.$router.replace('/dormitoryAdmin')
                                }
                            }
                        })
                    }
                    if (_this.type == 'systemAdmin'){
                        axios.get('http://localhost:8181/systemAdmin/login',{params:_this.ruleForm}).then(function (resp){
                            if (resp.data.code == -1){
                                _this.$alert('用户不存在','提示',{
                                    confirmButtonText:'确定'
                                })
                            }else {
                                if (resp.data.code == -2){
                                    _this.$alert('密码错误','提示',{
                                        confirmButtonText:'确定'
                                    })
                                }else if (resp.data.code == 0){
                                    localStorage.setItem('systemAdmin',JSON.stringify(resp.data.data))
                                    _this.$router.replace('/systemAdmin')
                                }
                            }
                        })
                    }
                }
            })
        }
    }
}
</script>

<style scoped>
.login-container{
    width: 100%;
    height: 100%;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
    margin: 0px 0px 15px;
    text-align: left;
}

</style>