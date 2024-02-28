<template>
    <div style="margin-top: 60px;margin-left:330px;width: 300px;height: 500px;border: 0px solid red;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <div style="width: 170px;height: 30px;">
                    <template>
                        <el-radio v-model="ruleForm.gender" label="男">男</el-radio>
                        <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
                    </template>
                </div>
            </el-form-item>
            <el-form-item label="联系电话" prop="telephone">
                <el-input v-model.number="ruleForm.telephone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            ruleForm: {
                username: '',
                password: '',
                name: '',
                gender: '',
                telephone: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                telephone: [
                    { required: true, message: '请输入联系电话', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm(formName){
            const _this = this
            axios.put('http://localhost:8181/dormitoryAdmin/update',_this.ruleForm).then(function (resp){
                console.log(resp)
                if(resp.data.code == 0){
                    _this.$alert('修改成功','',{
                        confirmButtonText:'确定',
                        callback:action => {
                            _this.$router.push('/dormitoryAdminManage')
                        }
                    })
                }
            })
        }
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/dormitoryAdmin/findById/'+_this.$route.query.id).then(function (resp){
            _this.ruleForm = resp.data.data
        })
    }
}
</script>

<style scoped>

</style>