import SignIn from "../Pages/Login/SignIn";
import SignUp from "../Pages/Login/SignUp";
import PageNotFound from "../Pages/PageNotFound";
import Activity from "../Pages/Reader/Activity/Activity";
import ActivityDetail from "../Pages/Reader/Activity/ActivityDetail";
import RegisteredAct from "../Pages/Reader/Activity/RegisteredAct";
import { isLogined, isadmin } from "../Utils/auth";
import UserSetting from "../Pages/User/UserSetting";
import User from "../Pages/User/User";
import Notions from "../Pages/Reader/Activity/Notions";
import AdminHome from "../Pages/Admin/AdminHome";
import CreateAct from "../Pages/Admin/CreateAct";
import EditAct from "../Pages/Admin/EditAct";
import ListAct from "../Pages/Admin/ListAct";
//主页路由
export const mainRoutes = [{
    path:'/login',
    component:SignIn
},{
    path:'/Signup',
    component:SignUp
},{
    path:'/404',
    component:PageNotFound
}]
//活动页路由
export const activityRoutes = [{
    path:'/home/activity',
    title:'活动页',
    component:Activity,
    exact:true,
    isShow:true
},{
    path:'/home/activitydetail/:id',
    title:'活动详情',
    component:ActivityDetail,
    exact:true,
    isShow:false
},{
    path:'/home/listact',
    title:'活动列表',
    isShow:!isadmin,
    exact:false
},
{
    path:'/home/RegisteredAct',
    title:'已报名活动',
    component:RegisteredAct,
    exact:true,
    isShow:(isLogined() && !isadmin)//不是管理员才显示，管理员不能报名，只能浏览活动
},{
    path:'/home/admin',
    title:'活动管理',
    component:AdminHome,
    isShow:isadmin,//管理员才显示
    exact:false
},{
    path:'/home/usersetting',
    component:UserSetting,
    isShow:false
},{
    path:'/home/user',
    component:User,
    isShow:false
},{
    path:'/home/notions',
    component:Notions,
    isShow:false
}]
//管理员路由
export const adminRoutes = [{
    path:'/home/admin/createact',
    exact:true,
    component:CreateAct
},{
    path:'/home/admin/editact',
    exact:true,
    component:EditAct
},{
    path:'/home/admin/listact',
    exact:true,
    component:ListAct
}]