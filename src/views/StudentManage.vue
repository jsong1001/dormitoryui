<template>
    <div style="margin-top: 60px;margin-left: 80px;border: 0px solid red" class="search-div">
        <el-form style="margin-left: -40px" :model="ruleForm" :rules="rules" :ref="ruleForm" label-width="100px">
            <el-form-item label="字段" prop="key">
                <el-select v-model="ruleForm.key" style="width: 160px;float: left">
                    <el-option label="姓名" value="name"></el-option>
                    <el-option label="性别" value="gender"></el-option>
                    <el-option label="学号" value="number"></el-option>
                </el-select>
            </el-form-item>
            <div style="border: 0px solid red;width: 400px;height: 40px;position: relative; top: -64px;left: 270px">
                <el-form-item label="值">
                    <el-input v-model="ruleForm.value" style="width: 160px;float: left"></el-input>
                    <el-button type="primary" @click="submitForm('ruleForm' )">查询</el-button>
                </el-form-item>
            </div>
        </el-form>
        <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%;position: relative;margin-top: -30px">
            <el-table-column
                fixed
                label="ID"
                prop="id"
                width="100px"></el-table-column>
            <el-table-column
                fixed
                label="姓名"
                prop="name"
                width="100px"></el-table-column>
            <el-table-column
                fixed
                label="学号"
                prop="number"
                width="160px"></el-table-column>
            <el-table-column
                fixed
                label="性别"
                prop="gender"
                width="100px"></el-table-column>
            <el-table-column
                fixed
                label="宿舍"
                prop="dormitoryName"
                width="160px"></el-table-column>
            <el-table-column
                fixed
                label="状态"
                prop="state"
                width="160px"></el-table-column>
            <el-table-column
                fixed
                label="创建时间"
                prop="createDate"
                width="160px"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
                    <el-button size="mini" @click="edit(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            style="margin-top: 20px;float: right"
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="total"
            :current-page.sync="currentPage"
            @current-change="page"></el-pagination>
    </div>

</template>

<script>
export default {
    data(){
        return {
            tableData: null,
            pageSize:'5',
            currentPage:'',
            total:'',
            ruleForm:{
                key:'',
                value:'',
                page: 1,
                size: 5
            },
            rules:{
                key:[
                    {required:true, message:'请选择字段', trigger:'change'}
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            const _this = this
            if (_this.ruleForm.value == '') {
                axios.get('http://localhost:8181/student/list/1/'+_this.ruleForm.pageSize).then(function (resp){
                    _this.total = resp.data.data.total
                    _this.tableData = resp.data.data.data
                })
            } else {
                axios.get('http://localhost:8181/student/search',{params:_this.ruleForm}).then(function (resp){
                    _this.total = resp.data.data.total
                    _this.tableData = resp.data.data.data
                })
            }
        },
        edit(row){
            this.$router.push('/studentUpdate?id='+row.id)
        },
        del(row){
            const _this = this
            _this.$confirm('确定要删除'+row.name+'吗？','提示',{
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type:"warning"
            }).then(() => {
                axios.delete('http://localhost:8181/student/deleteById/'+row.id).then(function (resp){
                    if(resp.data.code == 0){
                        _this.$alert('成功删除'+row.name,'',{
                            confirmButtonText:'确定',
                            callback:action => {
                                location.reload()
                            }
                        })
                    }
                })
            })
        },
        page(currentPage){
            const _this = this
            if(_this.ruleForm.value == ''){
                axios.get('http://localhost:8181/student/list/'+currentPage+'/'+_this.pageSize).then(function (resp){
                    _this.tableData = resp.data.data.data
                    _this.total = resp.data.data.total
                })
            }else {
                _this.ruleForm.page = currentPage
                axios.get('http://localhost:8181/student/search',{params:_this.ruleForm}).then(function (resp){
                    _this.total = resp.data.data.total
                    _this.tableData = resp.data.data.data
                })
            }
        }
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/student/list/1/'+_this.pageSize).then(function (resp){
            _this.tableData = resp.data.data.data
            _this.total = resp.data.data.total
        })
    }
}
</script>

<style scoped>

</style>