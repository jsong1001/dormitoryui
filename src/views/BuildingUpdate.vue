<template>
    <div style="margin-top: 60px;margin-left:330px;width: 350px;height: 500px;border: 0px solid red;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
            <el-form-item label="楼宇编号" prop="id">
                <el-input v-model="ruleForm.id" readonly="readonly"></el-input>
            </el-form-item>
            <el-form-item label="楼宇名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="introduction">
                <el-input v-model="ruleForm.introduction"></el-input>
            </el-form-item>
            <el-form-item label="管理员" prop="adminId">
                <el-select v-model="ruleForm.adminId">
                    <el-option v-for="item in adminList" :label="item.name":value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
export default {
    data() {
        return {
            category:null,
            ruleForm: {
                id:'',
                name: '',
                introduction: '',
                adminId: ''
            },
            adminList:'',
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                introduction: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                adminId: [
                    { required: true, message: '请输入联系电话', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            const _this = this
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios.put('http://localhost:8181/building/update',_this.ruleForm).then(function (resp) {
                        if(resp.data.code == 0){
                            _this.$alert(_this.ruleForm.name+'修改成功', '', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push('/buildingManage')
                                }
                            });
                        }
                    })
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/dormitoryAdmin/dormitoryAdminList').then(function (resp){
            _this.adminList = resp.data.data
        })
        axios.get('http://localhost:8181/building/searchById/'+_this.$route.query.id).then(function (resp){
            _this.ruleForm = resp.data.data
        })
    }
}
</script>