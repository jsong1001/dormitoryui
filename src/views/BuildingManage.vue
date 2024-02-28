<template>
    <div style="margin-top: 80px;margin-left: 60px;border: 0px solid red">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="margin-left: 30px;float: left" class="search-form" label-width="100px">
            <el-form-item label="字段" prop="key">
                <el-select v-model="ruleForm.key" style="width: 160px;float: left">
                    <el-option label="楼宇名称" value="name"></el-option>
                    <el-option label="楼宇介绍" value="introduction"></el-option>
                </el-select>
            </el-form-item>
            <div style="border: 0px solid red;width: 400px;position: relative;height: 40px;left: 270px;top: -64px">
                <el-form-item label="值" prop="value">
                    <el-input v-model="ruleForm.value" style="width: 160px"></el-input>
                    <el-button type="primary" icon="el-icon-search" style="position: relative;left: 10px" @click="submitForm('ruleForm')">查询</el-button>
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
                label="编号"
                prop="id"
                width="160px"></el-table-column>
            <el-table-column
                fixed
                label="楼宇名称"
                prop="name"
                width="160px"></el-table-column>
            <el-table-column
                fixed
                label="楼宇介绍"
                prop="introduction"
                width="160px"></el-table-column>
            <el-table-column
                fixed
                label="管理员"
                prop="adminName"
                width="160px"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
                    <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
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
            tableData:'',
            currentPage:'',
            pageSize: 5,
            total:'',
            ruleForm:{
                key:'',
                value:'',
                page:'1',
                size:'5'
            },
            rules:{
                key:[
                    {required:true,message:'请选择字段',tirgger:'change'}
                ]
            }
        }
    },
    methods:{
        submitForm(formName){
            const _this = this
            if(_this.ruleForm.value != ''){
                axios.get('http://localhost:8181/building/search',{params:_this.ruleForm}).then(function (resp){
                    _this.tableData = resp.data.data.data
                    _this.total = resp.data.data.total
                })
            }else {
                axios.get('http://localhost:8181/building/list/1/'+_this.pageSize).then(function (resp){
                    _this.tableData = resp.data.data.data
                    _this.total = resp.data.data.total
                })
            }

        },
        del(row){
            const _this = this
            _this.$confirm('是否要删除'+row.name+'吗?','提示',{
                cancelButtonText:'取消',
                confirmButtonText:'确定',
                type:"warning"
            }).then(() => {
                axios.delete('http://localhost:8181/building/deleteById/'+row.id).then(function (resp){
                    if(resp.data.code == 0){
                        _this.$alert(row.name+'删除成功','',{
                            confirmButtonText:'确定',
                            callback:action => {
                                location.reload()
                            }
                        })
                    }
                })
                }

            )

        },
        edit(row){
            this.$router.push('/buildingUpdate?id='+row.id)
        },
        page(currentPage){
            const _this = this
            if (_this.ruleForm.value == '') {
                axios.get('http://localhost:8181/building/list/'+currentPage+'/'+_this.pageSize).then(function (resp){
                    _this.tableData = resp.data.data.data
                    _this.total = resp.data.data.total
                })
            }else {
                _this.ruleForm.page = currentPage
                axios.get('http://localhost:8181/building/search',{params:_this.ruleForm}).then(function (resp){
                    _this.tableData = resp.data.data.data
                    _this.total = resp.data.data.total
                })
            }
        }
    },
    created() {
        const _this = this
        axios.get('http://localhost:8181/building/list/1/'+_this.pageSize).then(function (resp){
            _this.tableData = resp.data.data.data
            _this.total = resp.data.data.total
        })
    }
}
</script>

<style scoped>

</style>