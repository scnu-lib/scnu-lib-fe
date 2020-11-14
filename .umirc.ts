import { defineConfig } from 'umi';
import { isLogined, isadmin } from './src/Utils/auth';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // hash:true,
  history: { type: 'hash' },
  routes: [
    { exact: true, path: '/', redirect: '/home' },
    {
      path: '/home',
      component: '@/pages/index',
      routes: [
        // 子路由页面通过props.children传递
        {
          path: '/home/',
          redirect: '/home/activity',
        },
        {
          path: '/home/activity',
          title: '活动页',
          component: '@/pages/Reader/Activity/Activity',
          exact: true,
        },
        {
          path: '/home/activitydetail/:id',
          title: '活动详情',
          component: '@/pages/Reader/Activity/ActivityDetail',
          exact: true,
        },
        {
          path: '/home/listact',
          title: '活动列表',
          component: '@/pages/Reader/Activity/Activitylist',
          exact: false,
        },
        {
          path: '/home/RegisteredAct',
          title: '已报名活动',
          component: '@/pages/Reader/Activity/RegisteredAct',
          exact: true,
        },
        {
          path: '/home/adminAct',
          title: '活动管理',
          component: '@/pages/Admin/AdminAct',
          exact: false,
          routes: [
            {
              path: '/home/adminAct/createact',
              exact: false,
              title: '创建活动',
              component: '@/pages/Admin/CreateAct',
            },
            {
              path: '/home/adminAct/editact',
              exact: false,
              title: '活动编辑',
              component: '@/pages/Admin/EditAct',
            },
            {
              path: '/home/adminAct/listact',
              exact: false,
              title: '活动列表',
              component: '@/pages/Admin/ListAct',
            },
            {
              path: '/home/adminAct/actParticipants/:id',
              exact:true,
              title:'参与用户列表',
              component:'@/pages/Admin/Actmanage/ActParticipants'
            }
          ],
        },
        {
          path: '/home/adminUser',
          title: '用户管理',
          component: '@/pages/Admin/AdminUser',
          exact: false,
          routes: [
            {
              path: '/home/adminUser/user',
              exact: false,
              title: '用户管理',
              component: '@/pages/Admin/User',
            },
            {
              path:'/home/adminUser/usernotices/:id',
              exact:true,
              title: '用户联系方式',
              component:'@/pages/Admin/AdminNotice',
            },
            {
              path:'/home/adminUser/userdetails/:id',
              exact: true,
              title: '用户详情',
              component:'@/pages/Admin/AUserSetting',
            }
          ],
        },
        {
          path: '/home/user',
          title: '用户中心',
          component: '@/pages/User/User',
        }
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
