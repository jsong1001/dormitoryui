<template>
    <div style="margin-top: 60px;margin-left:330px;width: 350px;height: 500px;border: 0px solid red;">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
            <el-form-item label="楼宇名称" prop="name">
                <el-select v-model="ruleForm.buildingId">
                    <el-option v-for="item in buildingList" :value = item.id :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="宿舍名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="宿舍类型" prop="type">
                <el-select v-model="ruleForm.type">
                    <el-option v-for="item in typeList" :label="item.key":value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="可用床位" prop="available">
                <el-input v-model="ruleForm.available"></el-input>
            </el-form-item>
            <el-form-item label="宿舍电话" prop="telephone">
                <el-input v-model="ruleForm.telephone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
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
                buildingId:'',
                name: '',
                type: '',
                available: '',
                telephone:''
            },
            buildingList:'',
            typeList:[{key:'四人间',value :4},{key :'六人间',value:6},{key:'八人间',value:8}],
            rules: {
                buildingId: [
                    {required:true, message:'请选择楼宇', trigger:'blur'}
                ],
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择宿舍类型', trigger: 'blur' }
                ],
                available: [
                    { required:true, message: '请输入可用床位数', trigger: 'blur' }
                ],
                telephone: [
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
                    axios.post('http://localhost:8181/building/save',_this.ruleForm).then(function (resp) {
                        if(resp.data.code == 0){
                            _this.$alert(_this.ruleForm.name+'添加成功', '', {
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
    }

}
</script>