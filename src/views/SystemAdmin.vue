<template>
    <el-container class="home_container">
        <el-header class="home_header">
            <div class="home_title">DORMS宿舍管理系统-系统管理员</div>
            <div class="home_userinfoContainer">
                <el-dropdown>
                    <span class="el-dropdown-link home_userinfo">
                        {{admin.name}}<i class="el-icon-setting home_userinfo"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item @click.native = 'logout'>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-header>
        <el-container>
            <el-aside class="home_aside" width="200px">
                <el-menu router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-s-platform"></i>宿管模块</template>
                        <el-menu-item-group>
                            <el-menu-item index="/dormitoryAdminAdd":class="$route == '/dormitoryAdminAdd'?'is-active':''"><i class="el-icon-folder-add"></i>添加宿管</el-menu-item>
                            <el-menu-item index="/dormitoryAdminManage":class="$route == '/dormitoryAdminManage'?'is-active':''"><i class="el-icon-setting"></i>宿管管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-s-platform"></i>学生模块</template>
                        <el-menu-item-group>
                            <el-menu-item index="/studentAdd":class="$route == '/studentAdd'?'is-active':''"><i class="el-icon-folder-add"></i>添加学生</el-menu-item>
                            <el-menu-item index="/studentManage":class="$route == '/studentManage'?'is-active':''"><i class="el-icon-setting"></i>学生管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-s-platform"></i>楼宇模块</template>
                        <el-menu-item-group>
                            <el-menu-item index="/buildingAdd":class="$route == '/buildingAdd'?'is-active':''"><i class="el-icon-folder-add"></i>添加楼宇</el-menu-item>
                            <el-menu-item index="/buildingManage":class="$route == '/buildingManage'?'is-active':''"><i class="el-icon-setting"></i>楼宇管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-s-platform"></i>宿舍模块</template>
                        <el-menu-item-group>
                            <el-menu-item index="/dormitoryAdd":class="$route == '/dormitoryAdd'?'is-active':''"><i class="el-icon-folder-add"></i>添加宿舍</el-menu-item>
                            <el-menu-item index="/dormitoryManage":class="$route == '/dormitoryManage'?'is-active':''"><i class="el-icon-setting"></i>宿舍管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/dormitoryAdminAdd">
                        <i></i>
                        <span slot="title">学生迁出登记</span>
                    </el-menu-item>
                    <el-menu-item index="/dormitoryAdminAdd">
                        <i></i>
                        <span slot="title">学生迁出入登记</span>
                    </el-menu-item>
                    <el-menu-item index="/dormitoryAdminAdd">
                        <i></i>
                        <span slot="title">学生缺寝记录</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main class="home_main">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{path :'/'}">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-footer>
            <div class="home_footer">2024@DORMS</div>
        </el-footer>
    </el-container>
</template>

<script>
export default {
    methods:{
        logout(){
            let _this = this
            _this.$confirm('确定要退出登录吗？','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消'
            }).then(function (){
                localStorage.removeItem('systemAdmin')
                _this.$router.replace('/login')
            })
        }
    },
    data(){
        return{
            admin:''
        }
    },
    created() {
        let admin = JSON.parse(window.localStorage.getItem("systemAdmin"))
        this.admin = admin
    },
    name: "SystemAdmin"
}
</script>

<style>
    .home_container{
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
    }
    .home_header{
        background-color: #2B2B2B;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .home_aside{
        background-color: #ffffff;
    }
    .home_title{
        color: #C2C2C2;
        font-size: 22px;
        display: inline;
    }
    .home_userinfoContainer{
        display: inline;
        margin-right: 20px;
    }
    .home_footer{
        background-color: #ffffff;
        color: #000000;
        font-size: 18px;
        line-height: 60px;
        text-align: center;
    }

</style>