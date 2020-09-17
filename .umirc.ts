import { defineConfig } from 'umi';
import { isLogined, isadmin } from './src/Utils/auth';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  //hash:true,
  history: { type: 'hash' },
  routes: [
    { exact: true, path: '/', redirect: '/home' },
    {
      path: '/home',
      component: '@/pages/index',
      routes: [
        //子路由页面通过props.children传递
        {
          path: '/home/',
          redirect: '/home/activity',
        },
        {
          path: '/home/activity',
          title: '活动页',
          component: '@/pages/Reader/Activity/Activity',
          exact: true,
          isShow: true,
        },
        {
          path: '/home/activitydetail/:id',
          title: '活动详情',
          component: '@/pages/Reader/Activity/ActivityDetail',
          exact: true,
          isShow: false,
        },
        {
          path: '/home/listact',
          title: '活动列表',
          component: '@/pages/Reader/Activity/Activitylist',
          isShow: !isadmin,
          exact: false,
        },
        {
          path: '/home/RegisteredAct',
          title: '已报名活动',
          component: '@/pages/Reader/Activity/RegisteredAct',
          exact: true,
          isShow: isLogined() && !isadmin, //不是管理员才显示，管理员不能报名，只能浏览活动
        },
        {
          path: '/home/adminAct',
          title: '活动管理',
          component: '@/pages/Admin/AdminAct',
          isShow: isadmin, //管理员才显示
          exact: false,
          routes: [
            {
              path: '/home/adminAct/createact',
              exact: false,
              isShow: isadmin,
              title: '创建活动',
              component: '@/pages/Admin/CreateAct',
            },
            {
              path: '/home/adminAct/editact',
              exact: false,
              isShow: isadmin,
              title: '活动编辑',
              component: '@/pages/Admin/EditAct',
            },
            {
              path: '/home/adminAct/listact',
              exact: false,
              isShow: isadmin,
              title: '活动列表',
              component: '@/pages/Admin/ListAct',
            },
          ],
        },
        {
          path: '/home/adminUser',
          title: '用户管理',
          component: '@/pages/Admin/AdminUser',
          isShow: isadmin, //管理员才显示
          exact: false,
          routes: [
            {
              path: '/home/adminUser/user',
              exact: false,
              isShow: isadmin,
              title: '用户管理',
              component: '@/pages/Admin/User',
            },
            {
              path: '/home/adminUser/volunteer',
              exact: false,
              isShow: isadmin,
              title: '志愿者管理',
              component: '@/pages/Admin/Volunteer',
            },
          ],
        },
        {
          path: '/home/usersetting',
          title: '用户设置',
          component: '@/pages/User/UserSetting',
          isShow: false,
        },
        {
          path: '/home/user',
          title: '用户中心',
          component: '@/pages/User/User',
          isShow: false,
        },
        {
          path: '/home/notions',
          title: '通知中心',
          component: '@/pages/Reader/Activity/Notions',
          isShow: false,
        },
      ],
    },
    {
      path: '/login',
      component: '@/pages/Login/SignIn',
    },
    {
      path: '/Signup',
      component: '@/pages/Login/SignUp',
    },
    {
      component: '@/pages/PageNotFound',
    },
  ],
});
