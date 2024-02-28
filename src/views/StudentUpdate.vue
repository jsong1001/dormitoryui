<template>
    <div style="margin-top: 50px;width: 300px;margin-left: 330px;height: 500px;border: 0px solid red">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-student-form">
            <el-form-item label="学号" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <div style="width: 170px;height: 50px">
                    <template>
                        <el-radio v-model="ruleForm.gender" label="男">男</el-radio>
                        <el-radio v-model="ruleForm.gender" label="女">女</el-radio>
                    </template>
                </div>
            </el-form-item>
            <el-form-item label="宿舍" prop="dormitoryId">
                <el-select v-model="ruleForm.dormitoryId" placeholder="请选择宿舍">
                    <el-option v-for="item in dormitoryList" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">修改学生信息</el-button>
                <el-button @click="reset('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            ruleForm: {
                number: '',
                name: '',
                gender: '',
                dormitoryId: '',
            },
            dormitoryList: '',
            rules: {
                number: [
                    {required:true, message:'请输入学号', trigger:'blur'}
                ],
                name:[
                    {required:true, message:'请输入姓名', trigger:'blur'}
                ],
                dormitoryId:[
                    {required:true, message:'请选择宿舍', trigger:'blur'}
                ]
            }
        }
    },
    methods: {
        submitForm(formName){
            const _this = this
            _this.$refs[formName].validate((valid) => {
                if(valid){
                    axios.put('http://localhost:8181/student/update',_this.ruleForm).then(function (resp){
                        console.log(resp)
                        if(resp.data.code == 0){
                            _this.$alert(_this.ruleForm.name+'修改成功！','',{
                                confirmButtonText:'确定',
                                callback: action => {
                                    _this.$router.push('/studentManage')
                                }
                            })
                        }
                    })
                }
            })

        },
        reset(formName){
            this.$refs[formName].resetField();
        }
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/dormitory/availableList').then(function (resp){
            _this.dormitoryList = resp.data.data
        })
        axios.get('http://localhost:8181/student/searchById/'+_this.$route.query.id).then(function (resp){
            _this.ruleForm = resp.data.data
        })
    }
}
</script>

<style scoped>

</style>