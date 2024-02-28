import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/Login";
import DormitoryAdmin from "@/views/DormitoryAdmin";
import SystemAdmin from "@/views/SystemAdmin";
import DormitoryAdminAdd from "@/views/DormitoryAdminAdd";
import DormitoryAdminManage from "@/views/DormitoryAdminManage";
import DormitoryAdminUpdate from "@/views/DormitoryAdminUpdate";
import StuduentAdd from "@/views/StuduentAdd";
import StudentManage from "@/views/StudentManage";
import StudentUpdate from "@/views/StudentUpdate";
import BuildingAdd from "@/views/BuildingAdd";
import BuildingManage from "@/views/BuildingManage";
import BuildingUpdate from "@/views/BuildingUpdate";
import DormitoryAdd from "@/views/DormitoryAdd";
import DormitoryManage from "@/views/DormitoryManage";
import DormitoryUpdate from "@/views/DormitoryUpdate";

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/systemAdmin',
    name: '系统管理员',
    component:SystemAdmin,
    children:[
      {
        path: '/dormitoryAdminAdd',
        name: '添加宿管',
        component: DormitoryAdminAdd
      },
      {
        path: '/dormitoryAdminManage',
        name: '宿管管理',
        component: DormitoryAdminManage
      },
      {
        path: '/dormitoryAdminUpdate',
        name: '修改宿管',
        component: DormitoryAdminUpdate
      },
      {
        path: '/studentAdd',
        name: '添加学生',
        component: StuduentAdd
      },
      {
        path: '/studentManage',
        name: '学生管理',
        component:StudentManage
      },
      {
        path: '/studentUpdate',
        name: '修改学生',
        component:StudentUpdate
      },
      {
        path: '/buildingAdd',
        name: '添加楼宇',
        component:BuildingAdd
      },
      {
        path: '/buildingManage',
        name: '楼宇管理',
        component:BuildingManage
      },
      {
        path: '/buildingUpdate',
        name: '修改楼宇',
        component:BuildingUpdate
      },
      {
        path: '/dormitoryAdd',
        name: '添加宿舍',
        component:DormitoryAdd
      },
      {
        path: '/dormitoryManage',
        name: '宿舍管理',
        component:DormitoryManage
      },
      {
        path: '/dormitoryUpdate',
        name: '修改宿舍',
        component:DormitoryUpdate
      },

    ]
  },
  {
    path: '/dormitoryAdmin',
    name: '宿舍管理员',
    component: DormitoryAdmin
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
