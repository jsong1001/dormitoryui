<template>
    <div class="search-part" style="margin-top: 60px;margin-left: 80px;border: 0px solid red;">
        <el-form style="margin-left: -40px;" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="字段:" prop="key">
                <el-select v-model="ruleForm.key" style="width: 160px;float: left">
                    <el-option label="宿管账号" value="username"></el-option>
                    <el-option label="宿管姓名" value="name"></el-option>
                    <el-option label="宿管性别" value="gender"></el-option>
                </el-select>
            </el-form-item>
            <div style="border: 0px solid red; width: 400px;height: 40px;position: relative; top: -64px;left: 270px">
                <el-form-item label="值:">
                    <el-input v-model="ruleForm.value" style="width: 170px"></el-input>
                    <el-button type="primary" icon="el-icon-search" style="position: relative;left: 10px;" @click="submitForm('ruleForm')">查询</el-button>
                </el-form-item>
            </div>
        </el-form>
        <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%; position: relative; margin-top: -30px">
            <el-table-column
                fixed
                label="ID"
                prop="id"
                width="160"></el-table-column>
            <el-table-column
                label="用户名"
                prop="username"
                width="160"></el-table-column>
            <el-table-column
                label="密码"
                prop="password"
                width="160"></el-table-column>
            <el-table-column
                label="姓名"
                prop="name"
                width="160"></el-table-column>
            <el-table-column
                label="性别"
                prop="gender"
                width="160"></el-table-column>
            <el-table-column
                label="电话"
                prop="telephone"
                width="160"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="edit(scope.row)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="del(scope.row)">删除</el-button>
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
            @current-change="page">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                tableData: null,
                pageSize: '5',
                currentPage: 1,
                total:'',
                key: '',
                value: '',
                ruleForm: {
                    key: '',
                    value:  '',
                    page: 1,
                    size: 5
                },
                rules: {
                    key:[
                        {required: true, message: '请选择字段', trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName){
                const _this = this
                if(_this.ruleForm.value == ''){
                    axios.get('http://localhost:8181/dormitoryAdmin/list/1/'+_this.ruleForm.size).then(function (resp){
                        _this.total = resp.data.data.total
                        _this.tableData = resp.data.data.data
                    })
                } else {
                    axios.get('http://localhost:8181/dormitoryAdmin/search',{params:_this.ruleForm}).then(function (resp){
                        console.log(resp)
                        // _this.total = resp.data.data.total
                        // _this.tableData = resp.data.data.data
                    })
                }
            },
            page(currentPage){
                const _this = this
                if(_this.ruleForm.value == ''){
                    axios.get('http://localhost:8181/dormitoryAdmin/list/'+currentPage+'/'+_this.pageSize).then(function (resp){
                        _this.tableData = resp.data.data.data
                        _this.total = resp.data.data.total
                    })
                }else{
                    _this.ruleForm.page = currentPage
                    axios.get('http://localhost:8181/dormitoryAdmin/search',{params:_this.ruleForm}).then(function (resp){
                        _this.tableData = resp.data.data.data
                        _this.total = resp.data.data.total
                    })
                }
            },
            edit(row){
                this.$router.push('/dormitoryAdminUpdate?id='+row.id)
            },
            del(row){
                const _this = this
                axios.delete('http://localhost:8181/dormitoryAdmin/deleteById/'+row.id).then(function (resp){
                    _this.$confirm('删除'+row.username+'吗？','提示',{
                        confirmButtonText:'确定',
                        cancelButtonText:'取消',
                        type:"warning"
                    }).then(() => {
                        if(resp.data.code == 0){
                            _this.$alert('【'+row.username+'】删除成功','提示', {
                                confirmButtonText:'确定',
                                callback: action => {
                                    location.reload()
                                }
                            })
                        }
                    })
                })
            }
        },
        created() {
            const _this = this
            axios.get('http://localhost:8181/dormitoryAdmin/list/1/'+_this.pageSize).then(function (resp){
                _this.tableData = resp.data.data.data
                _this.total = resp.data.data.total
            })
        }
    }
</script>

<style scoped>

</style>